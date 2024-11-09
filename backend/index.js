const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Stripe = require("stripe");
const app = express({ limit: "100mb" });
const dotenv = require("dotenv").config();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server is running");
});

// MongoDB connection 
mongoose.connect("mongodb+srv://harshapolshetty333:mUON1L0wWTxyqJx7@medcluster.k4ton.mongodb.net/")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// User schema with cartItems
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      },
      quantity: String
    }
  ]
});

const userModel = mongoose.model("user", userSchema);

// User signup
app.post("/signup", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const newUser = new userModel(req.body);
      await newUser.save();
      res.send({ message: "Successfully signed up", alert: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await userModel.findOne({ email: email }).populate('cartItems.productId');
    console.log("results :");
    
    if (result) {
      // Step 1: Filter cartItems to exclude those with null productId
      const filteredCartItems = result.cartItems.filter(item => item.productId !== null);

      // Optional Step 2: Update user document to remove items with null productId from the database
      if (filteredCartItems.length < result.cartItems.length) {
        await userModel.updateOne(
          { _id: result._id },
          { $pull: { cartItems: { productId: null } } } // Remove items with null productId
        );
      }

      // Prepare data to send back
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
        cartItems: filteredCartItems // Only include valid cart items
      };
      
      console.log(dataSend);
      res.send({
        message: "Login is successful",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


// Product model 
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const productModel = mongoose.model("product", schemaProduct);

// Save product in data
app.post("/uploadProduct", async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  console.log(req.body);
  const data = await productModel(req.body);
  await data.save();
  res.send({ message: "Upload successfully" });
  console.log(res.body);
});

// Get all products
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
  
});

// Cart item model 
const schemaCartProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  quantity: String,
});

const cartItemModel = mongoose.model("cartItem", schemaCartProduct);

// Add item to user's cart
// Add multiple items to user's cart
app.post("/add-to-cart", async (req, res) => {
  const { userId, items } = req.body;  // Expecting `items` to be an array of objects with `productId` and `quantity`
   console.log("items is in index.js:")
   console.log(items)
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
   
    items.forEach(({ productId, quantity }) => {
      
      
      const existingItemIndex = user.cartItems.findIndex(
        item => item.productId._id.toString() === productId
      );

      if (existingItemIndex > -1) {
        // Update the quantity if the item already exists
        console.log("user exists with product id")
        console.log(productId)
        user.cartItems[existingItemIndex].quantity = (parseInt(user.cartItems[existingItemIndex].quantity) + parseInt(quantity)).toString();

      } else {
        // Add new item to the cart
        
        user.cartItems.push({ productId, quantity });
      }
    });

    await user.save();
    res.send({ message: "Items added to cart successfully before logging out ", cartItems: user.cartItems });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


// Get user's cart items
app.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId).populate('cartItems.productId');
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user.cartItems);
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Payment gateway setup
const stripe = new Stripe("sk_test_51NiwGvSGKkkdOcLhWuwmyRRTjbdnMvAtgIS36OyB9zaP7Rh6sUnUbkVXTEVUaTaoY8sT1JARc3Sk7fmcl1oSr0gN00lomGvMaq");

app.post("/create-checkout-session", async (req, res) => {
  try {
    const params = {
      submit_type: 'pay',
      mode: "payment",
      payment_method_types: ['card'],
      billing_address_collection: "required", // Force the user to provide billing address
      shipping_options: [{ shipping_rate: "shr_1QGba0SGKkkdOcLh0U7CzJM7" }],
      customer: {
        name: req.body.name, // Customer's name
      },
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name
            },
            unit_amount: item.price * 100
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          },
          quantity: 1
        };
      }),
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`
    };

    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json({ id: session.id });
  } catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

// Server is running
app.listen(PORT, () => console.log("Server is running at port: " + PORT));

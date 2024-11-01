const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express({limit : "10mb"})
const dotenv = require("dotenv").config()
app.use(express.json())
const PORT =process.env.PORT || 8080
app.use(cors())

app.get("/",(req,res) =>
{
    res.send("Server is running")
})


//mongodb connection 
console.log("mongodb+srv://harshapolshetty333:mUON1L0wWTxyqJx7@medcluster.k4ton.mongodb.net/");
mongoose.connect("mongodb+srv://harshapolshetty333:mUON1L0wWTxyqJx7@medcluster.k4ton.mongodb.net/")
.then(() => console.log("Connected to database"))
.catch((err) =>console.log(err))


//iusershcema for mongodb database
const userSchema = mongoose.Schema({
    firstName : String ,
    lastName :String ,
    email :
    {
        type :String ,
        unique :true,
    } ,
    password : String ,
    confirmPassword :String ,
    image :String ,




});


const userModel = mongoose.model("user",userSchema)





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

  app.post("/login", async (req, res) => {
    const { email } = req.body;
    try {
      const result = await userModel.findOne({ email: email });
      
      if (result) {
        const dataSend = {
          _id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          image: result.image,
        };
        console.log(dataSend);
        res.send({
          message: "Login is successfully",
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
  


app.listen(PORT , ()=> console.log("server is running at PORT " + PORT))


//product model 

const schemaProduct = mongoose.Schema({
    name: String,
    category:String,
    image: String,
    price: String,
    description: String,
  });
  const productModel = mongoose.model("product",schemaProduct)
  
  
  
  //save product in data 
  //api
  app.post("/uploadProduct",async(req,res)=>{
      // console.log(req.body)
      const data = await productModel(req.body)
      const datasave = await data.save()
      res.send({message : "Upload successfully"})
  })
  
  //
  app.get("/product",async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
  })
//mongodb+srv://harshapolshetty333:mUON1L0wWTxyqJx7@medcluster.k4ton.mongodb.net/
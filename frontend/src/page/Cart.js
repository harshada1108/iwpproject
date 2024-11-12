import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/cartProduct";
import emptyCartImage from "../assest/empty.gif"
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  
  
  const handlePayment = async () => {
    if (user.email) {
      try {

        const orderItems = productCartItem.map(item => ({
          productId: item.productId,
          quantity: item.qty,
        }));
  
        // Create order payload
        const orderPayload = {
          userId: user._id, // Assuming `user._id` holds the user's ID
          items: orderItems,
        };
  
        // Call the create-order API
        const orderResponse = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        });
  
        if (orderResponse.status !== 201) {
          console.error("Error creating order:", orderResponse.status);
          toast.error("Failed to create order. Please try again.");
          return;
        }
  
        const orderData = await orderResponse.json();
        console.log("Order created successfully:", orderData);
  
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  
        const lineItems = productCartItem.map(item => ({
          productId: item.productId,
          quantity: item.qty,
          name: item.name,
          price: item.price,
          image: item.image,
        }));
  
        const payload = {
          items: lineItems,
          customer: {
            name: user.name,
            email: user.email,
          },
        };
  
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (res.status !== 200) {
          console.error("Error creating checkout session:", res.status);
          return;
        }
  
        const data = await res.json();
        toast("Redirecting to payment gateway...");
  
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({ sessionId: data.id });
  
        if (result.error) {
          console.error("Stripe Checkout error:", result.error);
          toast.error(result.error.message);
        } else {
          // Log cart items after successful redirection
          console.log("Cart items after successful payment:", productCartItem);
        }
      } catch (error) {
        console.error("Payment error:", error);
        toast.error("An error occurred during payment.");
      }
    } else {
      toast("You have not logged in!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };
  
  return (
    <>
    
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {productCartItem[0] ?
        <div className="my-4 flex gap-3">
          {/* display cart items  */}
          <div className="w-full max-w-3xl ">
            {productCartItem.map((el) => {
              console.log("cart itemss .... in cart.js")

              console.log(el);
              return (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* total cart item  */}
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Payment
            </button>
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm"/>
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      }
      </div>
    
    </>
  );
};

export default Cart;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/newlogowbg.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import {ResetCartItems} from "../redux/productSlide";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.product)
 
  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = async () => {
    const userId = userData._id; // Assuming userData contains the user ID
    const cartItems = cartData.cartItem; // Get the cart items from Redux state
   // console.log(cartItems)
    // Create an array of items to send to the API
    const itemsToSend = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.qty
    }));
  
    console.log("items to send")
    console.log(itemsToSend);
    try {
      // Send the add-to-cart request to the server
      const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/add-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
        body: JSON.stringify({ userId, items: itemsToSend }), // Send userId and items
      });
      
      if (!response.ok) {
        throw new Error('Failed to add items to cart during logout');
      }
   
      const data = await response.json();
      console.log(data.message); // Optionally log the response message
   
      // Dispatch the logout action
      dispatch(ResetCartItems());
      dispatch(logoutRedux());
      
      toast("Logout successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      toast("Error during logout, please try again.");
    }
  };
  
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-20">
            <img src={logo} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={"home2"}>Home</Link>
           
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center " style={{ backgroundColor: "#28A699" }}>
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {/* {userData.email === process.env.REACT_APP_ADMIN_EMAIL && ( */}
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}
                {/* )} */}
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"admindashboard"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Dash Board
                  </Link>
                )}
                {userData.firstName ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={"home2"} className="px-2 py-1">
                    Home
                  </Link>
                  
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;

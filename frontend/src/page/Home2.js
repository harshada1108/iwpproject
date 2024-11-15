import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import CardFeature from "../components/CardFeature";
import HomeCard from "../components/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../components/FilterProduct";
import AllProduct from "../components/AllProduct";
import { setSearchResults } from '../redux/productSlide';

const Home2 = () => {
  
  const searchResults = useSelector((state) => state.product.searchResults);
  const dispatch = useDispatch();

 

  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "beauty"
  );
  const homeProductCartListIcecream = productData.filter(
    (el) => el.category === "skincare"
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  const navigate = useNavigate(); 

  return (
    <div className="relative">
      {/* Landing Page Container */}
     

      {/* Main Page Content */}
      <div className="p-2 md:p-4">
        {/* Existing content like featured products and sections */}
        <div className="md:flex gap-4 py-2">
          {/* Left Section */}
          <div className="md:w-1/2">
          <div
  className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full cursor-pointer"
  onClick={() => window.location.href = "https://www.google.com/maps?q=VNIT+Nagpur"}
>
  <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
  <img
    src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
    className="h-7"
    alt="Bike Delivery"
  />
</div>

            <h2 className="text-4xl md:text-6xl font-bold py-2">
              The Best Online MedFacility{" "}
              <span className=" text-[#28A699] text-6xl">in Amravati</span>
            </h2>
            <p className="py-3 text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries.
            </p>
            <button
              className="font-bold bg-[#28A699] text-slate-200 px-4 py-2 rounded-md"
              onClick={() => navigate("/cart")}
            >
              Order Now
            </button>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
            {homeProductCartList[0]
              ? homeProductCartList.map((el) => (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                ))
              : loadingArray.map((_, index) => (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                ))}
          </div>
        </div>

        {/* More sections for products */}
        <div>
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Beauty Essentials
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
          <div
            className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
            ref={slideProductRef}
          >
            {homeProductCartListVegetables[0]
              ? homeProductCartListVegetables.map((el) => (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                ))
              : loadingArrayFeature.map((_, index) => (
                  <CardFeature loading="Loading..." key={index + "cartLoading"} />
                ))}
          </div>
        </div>
      </div>

      <AllProduct heading={"Your Product"} />
    </div>
  );
};

export default Home2;

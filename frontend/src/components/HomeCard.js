import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({ name, image, category, price, loading, id }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg min-w-[150px] p-3 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
      {name ? (
        <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
            <div className="w-40 min-h-[150px] flex justify-center items-center mb-3 rounded-md overflow-hidden bg-gray-100">
              <img src={image} alt={name} className="h-full w-full object-cover" />
            </div>
            <h3 className="font-semibold text-[#28A699] text-center capitalize text-lg">
              {name}
            </h3>
            <p className="text-center text-gray-500 font-medium mb-1">{category}</p>
            <p className="text-center font-bold text-[#28A699]">
              <span className="text-yellow-400">₹</span>
              <span>{price}</span>
            </p>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-400">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
};

export default HomeCard;

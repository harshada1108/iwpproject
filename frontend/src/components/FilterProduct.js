import React from "react";
import { AiFillMedicineBox } from "react-icons/ai";

const FilterProduct = ({ category, onClick, isActive }) => {
  return (
    <div 
      onClick={onClick} 
      className="transform transition-transform duration-300 hover:scale-105"
    >
      <div
        className={`text-3xl p-5 rounded-full cursor-pointer shadow-md hover:shadow-lg ${
          isActive ? "bg-[#28A699] text-white" : "bg-yellow-200 text-gray-800"
        }`}
      >
        <AiFillMedicineBox />
      </div>
      <p className="text-center font-medium my-2 capitalize text-sm">
        {category}
      </p>
    </div>
  );
};

export default FilterProduct;

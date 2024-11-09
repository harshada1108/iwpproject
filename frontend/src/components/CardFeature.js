import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlide";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = () => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div className="w-full min-w-[250px] max-w-[250px] bg-[#28A699] hover:shadow-2xl drop-shadow-lg py-6 px-5 cursor-pointer flex flex-col rounded-lg transition-transform transform hover:scale-105">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-36 flex justify-center items-center mb-3">
              <img src={image} className="h-full rounded-lg shadow-lg" />
            </div>
            <h3 className="font-semibold text-white capitalize text-lg mt-2 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className="text-gray-200 font-medium">{category}</p>
            <p className="text-white font-bold">
              <span className="text-yellow-300">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-white text-[#28A699] py-2 mt-3 rounded-lg hover:bg-yellow-300 w-full transition-colors"
            onClick={handleAddCartProduct}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p className="text-white">{loading}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;

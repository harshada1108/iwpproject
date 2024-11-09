import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setSearchResults, filterByCategory } from '../redux/productSlide';
import logo from "../assest/newlogowbg.png";
const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const searchResults = useSelector((state) => state.product.searchResults);
  const dispatch = useDispatch();

  // Handles input change for search
const handleSearchChange = (event) => {
  const value = event.target.value;
  setSearchInput(value);
  dispatch(
    setSearchResults({
      searchText: value,
      category: selectedCategory !== 'All' ? selectedCategory : null, // Only filter by category if it's not 'All'
    })
  );
};

// Handles category change
const handleCategoryChange = (event) => {
  const category = event.target.value;
  setSelectedCategory(category);
  dispatch(
    setSearchResults({
      searchText: searchInput,
      category: category !== 'All' ? category : null, // Only filter by category if it's not 'All'
    })
  );
};


  return (
    <div className="min-h-screen flex flex-col justify-center items-center" style={{ background: 'linear-gradient(to bottom, #28A699, #D9F1EF)' }}>
      <img src={logo} alt="Logo" className="h-30 mb-6" />
      <div className="flex border rounded-full overflow-hidden shadow-md w-full max-w-xl mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search medicines, health products..."
          className="flex-grow px-4 py-2 focus:outline-none"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border-l px-4 py-2 focus:outline-none"
        >
          <option value={"All"}>All</option>
          <option value={"ayurvedicmedicines"}>Ayurvedic Medicines</option>
          <option value={"genericmedicines"}>Generic Medicines</option>
          <option value={"personalcare"}>Personal Care</option>
          <option value={"healthfood"}>Health food</option>
          <option value={"beauty"}>Beauty Products</option>
          <option value={"skincare"}>SkinCare</option>
          <option value={"homecare"}>Home Care</option>
          <option value={"multivitamins"}>Multivitamins</option>
        </select>
      </div>

      {/* Display search results as a list only if there is input */}
      {searchInput && searchResults.length > 0 && (
        <div className="w-full max-w-xl bg-white border rounded shadow-md p-4">
          <ul className="list-none pl-0">
            {searchResults.map((product) => (
              <li key={product._id} className="mb-2">
                <Link
                  to={`/menu/${product._id}`}
                 
                  className="flex items-center p-2 rounded hover:bg-gray-100 transition"
                >
                  <img src={product.image} alt={product.name} className="h-16 w-16 object-cover mr-4 rounded" />
                  <div>
                    <h3 className="text-lg font-bold text-blue-700">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-md font-semibold text-green-600">${product.price}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;

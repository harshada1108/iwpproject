// AddressInput.js
import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const AddressInput = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const navigate = useNavigate();

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setAddress(place.formatted_address);
      }
    }
  };

  const handleSubmit = (e) => {
   
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Enter Your Address</h2>
      <div className="mb-4">
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label>Address</label>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </Autocomplete>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Continue to Payment
      </button>
    </form>
  );
};

export default AddressInput;

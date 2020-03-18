import React, { useState, useContext } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import { postContext } from "../contexts/postContext";

const SearchBar = props => {
  const [searchBy, setSearchBy] = useState({ value: "city" });
  const [searchCity, setSearchCity] = useState({ city: "" });
  const [searchZip, setSearchZip] = useState({ zip_code: "" });
  const { setPosts } = useContext(postContext);

  const handleSearchBy = e => {
    setSearchBy({ ...searchBy, value: e.target.value });
  };

  const handleChange = e => {
    if (searchBy.value === "city") {
      setSearchCity({ city: e.target.value });
    } else {
      setSearchZip({ zip_code: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchBy.value === "city") {
      axiosWithAuth()
        .post("/posts/city", searchCity)
        .then(res => {
          setPosts(res.data);
        })
        .catch(err => {
          props.setSearchErr(err.response.data.message);
          console.log("error searching: ", err.response.data.message);
        });
    } else {
      axiosWithAuth()
        .post("/posts/zipcode", searchZip)
        .then(res => {
          setPosts(res.data);
        })
        .catch(err => {
          props.setSearchErr(err.response.data.message);
          console.log("error searching: ", err.response.data.message);
        });
    }
  };
  return (
    <div className="searchBarContainer">
      <label htmlFor="searchBy">Search Posts By</label>
      <select
        type="select"
        id="searchBy"
        name="searchBy"
        onChange={handleSearchBy}
        value={searchBy.value}
        placeholder="search post by"
      >
        <option value="city">City</option>
        <option value="zip_code">Zip Code</option>
      </select>

      <form onSubmit={handleSubmit}>
        <input type="text" name="city" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchBar;

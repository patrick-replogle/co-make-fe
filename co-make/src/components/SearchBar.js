import React, { useState, useContext } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import { postContext } from "../contexts/postContext";

const SearchBar = (props) => {
  const [searchBy, setSearchBy] = useState({ value: "city" });
  const [searchCity, setSearchCity] = useState({ city: "" });
  const [searchZip, setSearchZip] = useState({ zip_code: "" });
  const { setPosts } = useContext(postContext);

  const handleSearchBy = (e) => {
    setSearchBy({ ...searchBy, value: e.target.value });
  };

  const handleChange = (e) => {
    if (searchBy.value === "city") {
      setSearchCity({ city: e.target.value });
    } else {
      setSearchZip({ zip_code: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchBy.value === "city") {
      axiosWithAuth()
        .post("/posts/city", searchCity)
        .then((res) => {
          setPosts(res.data);
          props.setSearchErr("");
        })
        .catch((err) => {
          props.setSearchErr(err.response.data.message);
          setPosts([]);

          console.log("error searching: ", err.response.data.message);
        });
    } else {
      axiosWithAuth()
        .post("/posts/zipcode", searchZip)
        .then((res) => {
          setPosts(res.data);
          props.setSearchErr("");
        })
        .catch((err) => {
          props.setSearchErr(err.response.data.message);
          setPosts([]);
          console.log("error searching: ", err.response.data.message);
        });
    }
  };
  return (
    <div className="searchBarContainer">
      <form onSubmit={handleSubmit}>
        <Select
          type="select"
          name="searchBy"
          onChange={handleSearchBy}
          value={searchBy.value}
          className="searchSelect"
          disableUnderline={true}
        >
          <MenuItem value="city">City</MenuItem>
          <MenuItem value="zip_code">Zip Code</MenuItem>
        </Select>

        <div className="searchInputDiv">
          <input
            type="text"
            name="city"
            onChange={handleChange}
            placeholder={
              searchBy.value === "city"
                ? "search by city"
                : "search by zip code"
            }
          />
          <SearchIcon color="disabled" style={{ fontSize: "22px" }} />
        </div>

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default SearchBar;

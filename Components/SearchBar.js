import { fetchWeather } from "../Redux/Slices/forecastSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  let data;

  useEffect(() => {
    const defaultSearchText = "Islamabad";
    dispatch(fetchWeather(defaultSearchText));
  }, []);

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const onSubmitSearchText = (event) => {
    event.preventDefault();

    if (searchText === "") {
      alert("please enter valid city name /zip code");
    } else {
      dispatch(fetchWeather(searchText));
      setSearchText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitSearchText}>
        <input
          type="text"
          name="searchText"
          placeholder="Enter a location to search for weather"
          value={searchText}
          onChange={onChangeSearchText}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
    </div>
  );
};

export default SearchBar;

import { fetchWeather } from "../Redux/Slices/forecastSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import forecastSlice from "../Redux/Slices/forecastSlice";
import { getHistory } from "../Redux/Slices/forecastSlice";

const R = require("ramda");

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const historylist = useSelector((state) => state.forecast.historyLog);
  const distinct = [...new Set(historylist)];
  const top3 = R.slice(0, 4, distinct);

  const dispatch = useDispatch();

  useEffect(() => {
    const defaultSearchText = "Islamabad";
    dispatch(getHistory("Islamabad"));
    dispatch(fetchWeather(defaultSearchText));
  }, []);

  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const onSubmitSearchText = (event) => {
    event.preventDefault();

    if (R.equals(searchText,"")) {
      alert("please enter valid city name /zip code");
    } else {
      dispatch(getHistory(searchText));
      dispatch(fetchWeather(searchText));
      setSearchText("");
    }
  };

  const cityClicked = (event) => {
    dispatch(fetchWeather(event.target.value));
  };

  return (
    <div className="search-form">
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
      <div className="history-box">
        {R.map((item, index) => {
          return (
            <button
              className="history"
              onClick={cityClicked}
              key={index}
              value={item}
            >
              {item}
            </button>
          );
        }, top3)}
      </div>
    </div>
  );
};

export default SearchBar;

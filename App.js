import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import store from "./Redux/Store/store";
import SearchBar from "./Components/SearchBar";
import { Provider } from "react-redux";
import FiveDayForecast from "./Components/FiveDayForecast";
import CurrentDayForecast from "./Components/CurrentDayForecast";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchBar />
        <FiveDayForecast />
        <CurrentDayForecast />
      </div>
    </Provider>
  );
}

export default App;

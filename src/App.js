import React from "react";
import "./App.css";
import store from "./Redux/Store/store";
import SearchBar from "./Components/SearchBar";
import { Provider } from "react-redux";
import FiveDayForecast from "./Components/FiveDayForecast";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchBar />
        <FiveDayForecast />
      </div>
    </Provider>
  );
}

export default App;

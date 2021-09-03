import { configureStore } from "@reduxjs/toolkit";
import forecastReducer from "../Slices/forecastSlice";

const store = configureStore({
  reducer: {
    forecast: forecastReducer,
  },
});

export default store;

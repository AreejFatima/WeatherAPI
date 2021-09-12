import { createSlice } from "@reduxjs/toolkit";
import { getApiReturnedValue } from "../../API/openWeather";
const R = require("ramda");

const initialState = {
  historyLog: [],
  rawData: [],
};

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    getHistory(state, action) {
      state.historyLog.unshift(action.payload);
    },
    getRawData(state, action) {
      state.rawData = action.payload;
    },
  },
});

const process_forecast_data = (list) => {
  let fc_data_by_date = {};
  R.map((item) => {
    let date_arr = item.dt_txt.split(" ");
    let date = date_arr[0];
    if (R.not(fc_data_by_date[date])) {
      fc_data_by_date[date] = [];
    }
    fc_data_by_date[date].push(item);
  }, list);
  return fc_data_by_date;
};

export const fetchWeather = (searchText) => async (dispatch) => {
  try {
    let weatherFromApi = getApiReturnedValue(searchText);
    const res = await fetch(weatherFromApi);
    const data = await res.json();
    dispatch(getRawData(process_forecast_data(data.list)));
  } catch (error) {
    console.log(error);
  }
};

export const { getForecast, getHistory, getRawData } = forecastSlice.actions;
export default forecastSlice.reducer;

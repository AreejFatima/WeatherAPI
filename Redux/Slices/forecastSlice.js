import { createSlice } from "@reduxjs/toolkit";
import { getApiReturnedValue } from "../../API/openWeather";

const initialState = {
  forecastArray: [],
  forecastObject: null,
};

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    getForecast(state, action) {
      state.forecastArray = action.payload;
    },
  },
});

//five day forecast fetching

export const fetchWeather = (searchText) => async (dispatch) => {
  let weatherFromApi = getApiReturnedValue(searchText);
  const res = await fetch(weatherFromApi);
  const data = await res.json();
  //console.log(data);
  let tempForecast = [];
  data.list.forEach((weatherObject, index) => {
    if (index % 8 === 0) {
      tempForecast.push(weatherObject);
    }
  });
  // console.log("temppppppppppp")
  //console.log(tempForecast)
  dispatch(getForecast(tempForecast));
};

export const { getForecast } = forecastSlice.actions;
export default forecastSlice.reducer;

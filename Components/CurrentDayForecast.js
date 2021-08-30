import ForecastItem from "./ForecastItem";
import { useSelector } from "react-redux";
import forecastSlice from "../Redux/Slices/forecastSlice";

const CurrentDayForecast = () => {
  const forecastlist = useSelector((state) => state.forecast.forecastArray);
  if (forecastlist == null) {
    return null;
  } else {
    return <ForecastItem singledayForecast={forecastlist[0]} />;
  }
};

export default CurrentDayForecast;

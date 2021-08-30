import ForecastItem from "./ForecastItem";
import { useSelector } from "react-redux";
import forecastSlice from "../Redux/Slices/forecastSlice";

const FiveDayForecast = () => {
  const forecastlist = useSelector((state) => state.forecast.forecastArray);
  if (forecastlist == null) {
    return null;
  } else {
    return (
      <div className="displayFiveDayForecast">
        {forecastlist.map((singledayForecast, index) => (
          <ForecastItem singledayForecast={singledayForecast} key={index} />
        ))}
      </div>
    );
  }
};

export default FiveDayForecast;

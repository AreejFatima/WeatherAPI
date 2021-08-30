import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";

const ForecastItem = (singledayForecast) => {
  return (
    <div>
      <div className="dayOfTheWeek text-light">
        <Moment unix format="ddd">
          {singledayForecast["singledayForecast"]["dt"]}
        </Moment>
      </div>

      <div className="weatherDetails text-light">
        <div className="weatherDetails__weatherDescription">
          {singledayForecast["singledayForecast"]["clouds"].all}
        </div>

        <div className="weatherDetails__weatherTemp">
          {Math.round(singledayForecast["singledayForecast"]["main"]["temp"])}{" "}
          °F
        </div>
      </div>
    </div>
  );
};

export default ForecastItem;

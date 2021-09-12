import { useSelector } from "react-redux";
import forecastSlice from "../Redux/Slices/forecastSlice";
import WeatherChart from "./WeatherChart";
import { useState, useEffect } from "react";
import CurrentDayForecast from "./CurrentDayForecast";
import Moment from "react-moment";

const R = require("ramda");

const FiveDayForecast = () => {
  const forecastlist = useSelector((state) => state.forecast.rawData);
  const [fc_flag, setfcFlag] = useState(false);
  const [ind, setInd] = useState(0);
  const [color, setcolor] = useState();
  const [active, setactiveId] = useState(null);

  const dataForChart = (list) => {
    const fc_data_by_date = {};
    const fc_dates = [];
    R.map(function (key, index) {
      const labels = [];
      const data = [];
      R.map((item) => {
        const time_arr = R.split(" ", R.path(["dt_txt"], item));
        const time = R.path([1], time_arr);
        labels.push(time);
        data.push(R.path(["main", "temp"], item));
      }, list[key]);
      const obj = {
        labels,
        datasets: [
          {
            label: "Forecast",
            colors: "rgba(245, 194, 66, 0.75)",
            backgroundColor: "rgba(245, 194, 66, 0.75)",
            data,
          },
        ],
      };
      fc_data_by_date[key] = obj;
    }, R.keys(list));

    return fc_data_by_date;
  };

  const dayClicked = (index, id) => {
    setInd(index);
    setcolor("red");
    setactiveId(id);
    console.log(id);
  };

  const processedData = dataForChart(forecastlist);

  return (
    <div>
      <div className="displayFiveDayForecast">
        {R.values(forecastlist).map((singledayForecast, index) => {
          const iconId = R.pathOr(
            "N/A",
            [0, "weather", 0, "icon"],
            singledayForecast
          );
          const url = `http://openweathermap.org/img/w/${iconId}.png`;
          if (R.equals(index, 0)) {
            return null;
          }

          return (
            <div
              className="weather-box card"
              onClick={() =>
                dayClicked(index, R.path([0, "dt"], singledayForecast))
              }
              style={
                R.equals(R.path([0, "dt"], singledayForecast), active)
                  ? {
                      borderColor: "yellow",
                      backgroundColor: "rgba(6, 6, 43, 0.63)",
                      color: "white",
                    }
                  : { borderColor: "black" }
              }
            >
              <div className="dayOfTheWeek">
                <Moment unix format="ddd">
                  {R.path([0, "dt"], singledayForecast)}
                </Moment>
              </div>

              <div className="weatherImage">
                <img src={url}></img>
              </div>
              <span className="weatherDetails ">
                <b>
                  {Math.round(
                    R.path([0, "main", "temp_min"], singledayForecast)
                  )}
                  °
                </b>
                {Math.round(R.path([0, "main", "temp_max"], singledayForecast))}
                °
              </span>
            </div>
          );
        })}
      </div>
      <CurrentDayForecast current={R.values(forecastlist)[ind]} />
      <WeatherChart current_data={R.values(processedData)[ind]} />
    </div>
  );
};

export default FiveDayForecast;

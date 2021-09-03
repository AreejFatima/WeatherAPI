import { useSelector } from "react-redux";
import forecastSlice from "../Redux/Slices/forecastSlice";
import WeatherChart from "./WeatherChart";
import { useState, useEffect } from "react";
import CurrentDayForecast from "./CurrentDayForecast";
import Moment from "react-moment";

const FiveDayForecast = () => {
  const forecastlist = useSelector((state) => state.forecast.rawData);
  const [fc_flag, setfcFlag] = useState(false);
  const [ind, setInd] = useState(0);
  const [color, setcolor] = useState();
  const [active, setactiveId] = useState(null);

  const dataForChart = (list) => {
    const fc_data_by_date = {};
    const fc_dates = [];
    Object.keys(list).map(function (key, index) {
      const labels = [];
      const data = [];
      list[key].map((item) => {
        const time_arr = item["dt_txt"].split(" ");
        const time = time_arr[1];
        labels.push(time);
        data.push(item.main.temp);
      });
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
    });

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
        {Object.values(forecastlist).map((singledayForecast, index) => {
          const iconId = singledayForecast[0]["weather"][0]["icon"];

          const url = `http://openweathermap.org/img/w/${iconId}.png`;
          if (index === 0) {
            return null;
          }
          return (
            <div
              className="weather-box card"
              onClick={() => dayClicked(index, singledayForecast[0]["dt"])}
              style={
                singledayForecast[0]["dt"] === active
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
                  {singledayForecast[0]["dt"]}
                </Moment>
              </div>

              <div className="weatherImage">
                <img src={url}></img>
              </div>
              <span className="weatherDetails ">
                <b>{Math.round(singledayForecast[0]["main"]["temp_min"])}°</b>
                {Math.round(singledayForecast[0]["main"]["temp_max"])}°
              </span>
            </div>
          );
        })}
      </div>
      <CurrentDayForecast current={Object.values(forecastlist)[ind]} />
      <WeatherChart current_data={Object.values(processedData)[ind]} />
    </div>
  );
};

export default FiveDayForecast;

import { useSelector } from "react-redux";
import forecastSlice from "../Redux/Slices/forecastSlice";
import { useState } from "react";
import Moment from "react-moment";

const R = require("ramda");

const CurrentDayForecast = (props) => {
  const Fahrenheit = (temp) => {
    return ((temp * 9) / 5 + 32).toFixed(2);
  };

  if (R.not(props.current)) {
    return null;
  } else {
    const currentDay = props.current[0];
    const temperature = Math.round(R.path(["main", "temp"], currentDay));
    const description = R.pathOr(
      "N/A",
      ["weather", 0, "description"],
      currentDay
    );
    const {
      main: { pressure, humidity },
    } = currentDay;
    const iconId = R.pathOr("N/A", ["weather", 0, "icon"], currentDay);
    const url = `http://openweathermap.org/img/w/${iconId}.png`;

    return (
      <div>
        <div className="card2">
          <h1 className="currentday ">
            <Moment unix format="ddd">
              {R.path(['dt'],currentDay)}
            </Moment>
          </h1>
          <div className="weatherImage">
            <img src={url}></img>
          </div>
          <div className="moreWeatherDetails">
            <p>{R.toUpper(description.charAt(0)) + description.slice(1)}</p>
            <b className="large-font">{temperature} °C </b>
            <b className="large-font">{Fahrenheit(temperature)} °F </b>
            <p>Pressure {pressure} hPa</p>
            <p>Humidity {humidity}%</p>
          </div>
        </div>
      </div>
    );
  }
};

export default CurrentDayForecast;

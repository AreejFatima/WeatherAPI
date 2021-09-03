import { useSelector } from "react-redux";
import forecastSlice from "../Redux/Slices/forecastSlice";
import { useState } from "react";
import Moment from "react-moment";

const CurrentDayForecast = (props) => {
  const Fahrenheit = (temp) => {
    return ((temp * 9) / 5 + 32).toFixed(2);
  };

  if (!props.current) {
    return null;
  } else {
    const currentDay = props.current[0];
    const temperature = Math.round(currentDay["main"]["temp"]);
    const description = currentDay["weather"][0]["description"];
    const {
      main: { pressure, humidity },
    } = currentDay;
    const iconId = currentDay["weather"][0]["icon"];
    const url = `http://openweathermap.org/img/w/${iconId}.png`;

    return (
      <div>
        <div className="card2">
          <h1 className="currentday ">
            <Moment unix format="ddd">
              {currentDay["dt"]}
            </Moment>
          </h1>
          <div className="weatherImage">
            <img src={url}></img>
          </div>
          <div className="moreWeatherDetails">
            <p>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
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

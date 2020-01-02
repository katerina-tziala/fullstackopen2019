import React from 'react';
import Image from './Image';

const WeatherDetails = ({weather}) => {

  const renderWeatherIcons = () => weather.weather_icons.map(icon => {
    const imageStyle = {width:"auto", height: "50px"};
    return <Image key={icon} source={icon} alt="weather icon" style={imageStyle} />
  }
  );

  if (weather) {
    return (
      <>
        <p>
          <b>temperature: </b>
          <span>{weather.temperature} </span>
          Celcius
        </p>
      <p>
        {renderWeatherIcons()}
      </p>
        <p>
          <b>wind: </b>
          <span>{weather.wind_speed} kph direction {weather.wind_dir}</span>
        </p>
      </>
    )
  }
  return (
    <>
      <p>fetching current weather information...</p>
    </>
  )
};

export default WeatherDetails;
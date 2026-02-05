const WeatherDetails = ({ feelsLike, humidity, windSpeed }) => {
  return (
    <div className="weather-details">
      <p>Feels like: {feelsLike}°F</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} mph</p>
    </div>
  );
};

export default WeatherDetails;
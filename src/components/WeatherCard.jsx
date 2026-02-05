const WeatherCard = ({ city, temp, description, icon }) => {
  return (
    <div className="weather-card">
      <h1>{city} Weather</h1>
      <p className="temperature">{temp} degrees fahrenheit</p>
      <p className="description">Weather: {description}</p>
    </div>
  );
};

export default WeatherCard;
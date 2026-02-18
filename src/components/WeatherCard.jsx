/**
 * WeatherCard Component
 * Displays main weather info with realistic OpenWeather icons
 */

const WeatherCard = ({ city, temp, description, icon }) => {
  
  // Create and format current date
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className="weather-card">
      {/* City name */}
      <h1>{city} Weather</h1>
      
      {/* Current date */}
      <p className="current-date">{formattedDate}</p>
      
      {/* 
        Weather icon - using @4x.png for highest quality/detail
        OpenWeather has specific icons for each weather condition
      */}
      {icon && (
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="weather-icon-image"
        />
      )}
      
      {/* Current temperature */}
      <p className="temperature">{temp}°F</p>
      
      {/* Weather description */}
      <p className="description">Weather: {description}</p>
    </div>
  );
};

export default WeatherCard;
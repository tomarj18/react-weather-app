/**
 * WeatherCard Component
 * Displays the main weather information including city name, icon, temperature, and description
 * Props: city, temp, description, icon (from OpenWeather API)
 */

const WeatherCard = ({ city, temp, description, icon }) => {
  // Get current date and format it nicely
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className="weather-card">
      {/* City name header */}
      <h1>{city} Weather</h1>
      
      {/* Current date display */}
      <p className="current-date">{formattedDate}</p>
      
      {/* 
        Weather Icon from OpenWeather API
        - Dynamically builds the icon URL using the icon code from API
        - Only renders if icon code exists
        - Example: icon "10d" becomes https://openweathermap.org/img/wn/10d@2x.png
      */}
      {icon && (
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="weather-icon"
        />
      )}
      
      {/* Current temperature in Fahrenheit */}
      <p className="temperature">{temp}°F</p>
      
      {/* Weather condition description (e.g., "clear sky", "light rain") */}
      <p className="description">Weather: {description}</p>
    </div>
  );
};

export default WeatherCard;
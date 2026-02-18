/**
 * WeatherCard Component
 * Displays main weather info with city, date, icon, temperature, and description
 */

import { getWeatherIconClass } from '../utils/weatherIcons';

const WeatherCard = ({ city, temp, description, icon }) => {
  // Format current date
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className="weather-card">
      <h1>{city} Weather</h1>
      <p className="current-date">{formattedDate}</p>
      
      {/* Weather icon using font-based icons instead of image */}
      {icon && (
        <i className={`${getWeatherIconClass(icon)} weather-icon-large`}></i>
      )}
      
      <p className="temperature">{temp}°F</p>
      <p className="description">Weather: {description}</p>
    </div>
  );
};

export default WeatherCard;
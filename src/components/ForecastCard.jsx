/**
 * ForecastCard Component
 * Displays 7-day forecast with realistic OpenWeather icons
 * Layout matches phone weather app style
 */

const ForecastCard = ({ forecastData }) => {
  
  // Safety check - don't render if no data
  if (!forecastData || forecastData.length === 0) return null;

  // Get 7 unique days from forecast data
  // API gives weather every 3 hours, we need to group by day
  const getDailyForecasts = () => {
    const dailyMap = new Map();
    
    // Loop through all forecast items
    forecastData.forEach(item => {
      // Get just the date part (YYYY-MM-DD)
      const date = item.dt_txt.split(' ')[0];
      
      // If we don't have this date yet, add it
      if (!dailyMap.has(date) && dailyMap.size < 7) {
        dailyMap.set(date, item);
      }
    });
    
    // Convert map to array
    return Array.from(dailyMap.values());
  };

  const dailyForecasts = getDailyForecasts();

  // Convert date string to short day name (Mon, Tue, Wed)
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  return (
    <div className="forecast-container">
      {/* Forecast title */}
      <h2 className="forecast-title">7-Day Forecast</h2>
      
      {/* Forecast list - vertical layout like phone */}
      <div className="forecast-list">
        
        {/* Map through each day */}
        {dailyForecasts.map((day, index) => (
          <div key={index} className="forecast-row">
            
            {/* Day name */}
            <div className="forecast-day-label">{getDayName(day.dt_txt)}</div>
            
            {/* Weather icon */}
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="forecast-row-icon"
            />
            
            {/* Weather description */}
            <div className="forecast-condition">{day.weather[0].description}</div>
            
            {/* Temperature */}
            <div className="forecast-temperature">{Math.round(day.main.temp)}°F</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
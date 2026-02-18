/**
 * Main App Component
 * Manages weather data and determines theme (day/sunset/night) based on time
 */

import { useState, useEffect } from 'react';
import { getWeather, getFiveDayForecast } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import ForecastCard from './components/ForecastCard';
import './App.css';

const App = () => {
  // STATE: Store all dynamic data
  const [weatherData, setWeatherData] = useState({}); // Current weather data
  const [forecastData, setForecastData] = useState([]); // 7-day forecast data
  const [city, setCity] = useState("Atlanta"); // Current city being searched
  const [searchInput, setSearchInput] = useState(""); // User's search input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  /**
   * THEME DETECTION FUNCTION
   * Determines if it should show day, sunset, or night theme
   * Uses sunrise, sunset, and current time from API
   */
  const getTheme = () => {
    // If no weather data loaded yet, default to day theme
    if (!weatherData?.sys) return 'day';
    
    // Get timestamps from API (in seconds since 1970)
    const currentTime = weatherData.dt; // Current time
    const sunsetTime = weatherData.sys.sunset; // When sun sets
    const sunriseTime = weatherData.sys.sunrise; // When sun rises
    
    // One hour = 3600 seconds
    const oneHour = 3600;
    
    // Calculate sunset window (1 hour before sunset to 1 hour after)
    // This gives us that beautiful dusk/sunset period
    const sunsetStart = sunsetTime - oneHour;
    const sunsetEnd = sunsetTime + oneHour;
    
    // SUNSET THEME: Within the 2-hour sunset window
    if (currentTime >= sunsetStart && currentTime <= sunsetEnd) {
      return 'sunset';
    } 
    // NIGHT THEME: After sunset window ends OR before sunrise
    else if (currentTime > sunsetEnd || currentTime < sunriseTime) {
      return 'night';
    } 
    // DAY THEME: After sunrise and before sunset window
    else {
      return 'day';
    }
  };

  // Get the current theme (day/sunset/night)
  const theme = getTheme();

  /**
   * FETCH WEATHER DATA
   * Runs whenever the city changes
   * Gets both current weather and 7-day forecast
   */
  useEffect(() => {
    // Show loading state
    setLoading(true);
    setError("");
    
    // Fetch both APIs at the same time (more efficient)
    Promise.all([
      getWeather(city), // Current weather
      getFiveDayForecast(city) // 7-day forecast
    ])
      .then(([currentWeather, forecast]) => {
        // Save both data sets
        setWeatherData(currentWeather);
        setForecastData(forecast.list); // .list contains the forecast array
        
        // Log data for debugging
        console.log("Icon code:", currentWeather?.weather?.[0]?.icon);
        console.log("Current time:", new Date(currentWeather.dt * 1000));
        console.log("Sunset time:", new Date(currentWeather.sys.sunset * 1000));
        console.log("Theme:", getTheme());
        
        // Hide loading state
        setLoading(false);
      })
      .catch((err) => {
        // If API call fails
        console.log(err);
        setError("City not found. Please try again.");
        setLoading(false);
      });
  }, [city]); // Re-run when city changes

  /**
   * HANDLE SEARCH SUBMISSION
   * Called when user submits the search form
   */
  const handleSearch = (e) => {
    // Prevent page reload
    e.preventDefault();
    
    // Only search if user typed something
    if (searchInput.trim()) {
      setCity(searchInput); // Update city (triggers useEffect)
      setSearchInput(""); // Clear search box
    }
  };

  return (
    // Main container - applies theme class (day/sunset/night)
    <div className={`app-container ${theme}`}>
      <div className="weather-wrapper">
        
        {/* SEARCH BAR */}
        <SearchBar 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
        />

        {/* LOADING STATE */}
        {loading && <p className="status-message">Loading weather data...</p>}
        
        {/* ERROR STATE */}
        {error && <p className="error-message">{error}</p>}

        {/* SUCCESS STATE - Show weather data */}
        {!loading && !error && weatherData?.main && (
          <>
            {/* Current weather card */}
            <WeatherCard 
              city={city}
              temp={weatherData?.main?.temp}
              description={weatherData?.weather?.[0]?.description}
              icon={weatherData?.weather?.[0]?.icon}
            />
            
            {/* Weather details (feels like, humidity, wind) */}
            <WeatherDetails 
              feelsLike={weatherData?.main?.feels_like}
              humidity={weatherData?.main?.humidity}
              windSpeed={weatherData?.wind?.speed}
            />

            {/* 7-day forecast */}
            <ForecastCard forecastData={forecastData} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
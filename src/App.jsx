import { useState, useEffect } from 'react';
import { getWeather } from './services/weatherService';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Atlanta");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Detect if it's daytime or nighttime
  const isDaytime = weatherData?.weather?.[0]?.icon?.includes('d');

  useEffect(() => {
    setLoading(true);
    setError("");
    
    getWeather(city)
      .then((data) => {
        setWeatherData(data);
        console.log("Icon code:", data?.weather?.[0]?.icon);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("City not found. Please try again.");
        setLoading(false);
      });
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchInput.trim()) {
      setCity(searchInput);
      setSearchInput("");
    }
  };

  return (
    <div className={isDaytime ? 'app-container day' : 'app-container night'}>
      <div className="weather-wrapper">
        <SearchBar 
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
        />

        {loading && <p className="status-message">Loading weather data...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && weatherData?.main && (
          <>
            <WeatherCard 
              city={city}
              temp={weatherData?.main?.temp}
              description={weatherData?.weather?.[0]?.description}
              icon={weatherData?.weather?.[0]?.icon}
            />
            
            <WeatherDetails 
              feelsLike={weatherData?.main?.feels_like}
              humidity={weatherData?.main?.humidity}
              windSpeed={weatherData?.wind?.speed}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
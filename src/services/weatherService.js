// API key from environment variable
const API_KEY = import.meta.env.VITE_WEATHER_API;

// Get current weather for a city
export async function getWeather(city) {
  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?q=${encodeURIComponent(city)}` +
    `&appid=${API_KEY}` +
    `&units=imperial`;

  const response = await fetch(url);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.log("OpenWeather error:", response.status, err);
    throw new Error(err?.message || "Failed to fetch weather");
  }

  return await response.json();
}

// Get 5-day forecast for a city
export async function getFiveDayForecast(city) {
  const url =
    `https://api.openweathermap.org/data/2.5/forecast` +
    `?q=${encodeURIComponent(city)}` +
    `&appid=${API_KEY}` +
    `&units=imperial`;

  const response = await fetch(url);

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.log("OpenWeather error:", response.status, err);
    throw new Error(err?.message || "Failed to fetch forecast");
  }

  return await response.json();
}
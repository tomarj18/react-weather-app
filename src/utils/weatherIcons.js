/**
 * Weather Icon Mapping
 * Maps OpenWeather API icon codes to Weather Icons font classes
 * Converts codes like "01d", "10n" to icon classes like "wi-day-sunny", "wi-rain"
 */

export const getWeatherIconClass = (iconCode) => {
  // Return default icon if no code provided
  if (!iconCode) return 'wi wi-na';

  // Extract icon type (first 2 chars) and time period (last char)
  // Example: "01d" → type = "01", time = "d" (day)
  const iconType = iconCode.slice(0, 2);
  const iconTime = iconCode.slice(2);

  // Map OpenWeather codes to Weather Icons classes
  const iconMap = {
    '01': iconTime === 'd' ? 'wi wi-day-sunny' : 'wi wi-night-clear',
    '02': iconTime === 'd' ? 'wi wi-day-cloudy' : 'wi wi-night-alt-cloudy',
    '03': 'wi wi-cloud',
    '04': 'wi wi-cloudy',
    '09': 'wi wi-showers',
    '10': iconTime === 'd' ? 'wi wi-day-rain' : 'wi wi-night-alt-rain',
    '11': 'wi wi-thunderstorm',
    '13': 'wi wi-snow',
    '50': 'wi wi-fog'
  };

  return iconMap[iconType] || 'wi wi-na';
};
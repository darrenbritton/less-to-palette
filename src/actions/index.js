import axios from 'axios';

const API_KEY = '287abb69cc8fc0f96fd6baeebfffcede';
const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH-WEATHER';

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city}`;
  const request = axios.get(url);
  return {
    type: FETCH_WEATHER,
    payload: request
  };
}

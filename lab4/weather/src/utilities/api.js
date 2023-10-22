import axios from 'axios';
import parseForecast from './weatherParsing';

const apiKey = "appid=e366707bc2ea3e949fb1c0a16ce76d59";

const getLocation = async (zipcode) => {
    const geoUrl = "http://api.openweathermap.org/geo/1.0/zip?";
    const response = await axios.get(`${geoUrl}zip=${zipcode},US&${apiKey}`);
    return {
        name: response.data.name, 
        lat: response.data.lat, 
        lng: response.data.lon, 
    }
  };

const getWeather = async (lat, lng) => {
    const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&";
    const response = await axios.get(`${weatherUrl}lat=${lat}&lon=${lng}&${apiKey}`);
    return (parseForecast(response.data.list));
  };
  

  
  export {getLocation, getWeather};

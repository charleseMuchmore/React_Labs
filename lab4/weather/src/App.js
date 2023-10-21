import { useState } from 'react';
import ZipForm from './components/ZipForm';
import CurrentDay from './components/CurrentDay';
import WeatherList from './components/WeatherList';
import {getLocation, getWeather} from './utilities/api';

function App() { 
    const [city, setCity] = useState();
    const [forecast, setForecast] = useState([]);
    const [selectedDay, setSelectedDay] = useState();

    const handleSubmit = async (zipcode) => {
        try {
            const city = await getLocation(zipcode);
            const forecast = await getWeather(city.lat, city.lng);
            setCity(city);
            setForecast(forecast);
            setSelectedDay(null);
        }
        catch (error) {
            if (error.response) {
                // 5xx or 4xx error
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                // request never left
                console.log(error.request);
            }
            else {
                // anything else
                console.log(error.message);
                }   
        }
    }

    const handleDayClick = (index) => {
        setSelectedDay(forecast[index]);
    }

    if (forecast.length !== 0)
    {
        if (selectedDay !== null)
        {
            return (
                <div>
                    <ZipForm onSubmit={handleSubmit} />
                    <WeatherList onDayClick={handleDayClick} forecast={forecast} />
                    <CurrentDay city={city.name} forecastDay={forecast[0]}/>
                </div>
                )
        }
        else
        {
            return (
                <div>
                    <ZipForm onSubmit={handleSubmit} />
                    <WeatherList onDayClick={handleDayClick} forecast={forecast} />
                </div>
                )
        }
    }
    else
    {
        return (
            <div>
                <ZipForm onSubmit={handleSubmit} />
            </div>
        )
    }
}

export default App
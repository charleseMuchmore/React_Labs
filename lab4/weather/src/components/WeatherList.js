import WeatherListItem from "./WeatherListItem";
import './WeatherList.css';

function WeatherList({ forecast, onDayClick }) {
    let theWeather = forecast.map((forecastDay, index) => {
       return <WeatherListItem key={forecastDay.dt} forecastDay={forecastDay} index={index} onDayClick={onDayClick} />
    })
    return (
        <div className="weather-list">
            {theWeather}
        </div>
    )

}

export default WeatherList;
import WeatherListItem from "./WeatherListItem";

function WeatherList({ forecast, onDayClick }) {
    forecast.map((forecastDay, index) => {
       return <WeatherListItem key={forecastDay.dt} forecastDay={forecastDay} index={index} onDayClick={onDayClick} />
    })
}

export default WeatherList;
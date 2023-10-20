
function WeatherListItem({ onDayClick, index, forecastDay }) {
    const handleClick = () => {
        onDayClick(index);
    };

    return ( 
    <div className="weather-list-item" data-index={index} onClick={handleClick}>
        <h2>{forecastDay.dt.getMonth() + 1} / {forecastDay.dt}</h2>
        <h3>{forecastDay.dt.getDay()}</h3>
        <h3>{forecastDay.minTemp.toFixed(1)}&deg;F &#124; {forecastDay.maxTemp.toFixed(1)}&deg;F</h3>
    </div>
    );
}

export default WeatherListItem;

function CurrentDay({ city, forecastDay }) {
    if (city == undefined)
    {
        console.log("UNDEF in CurrentDay");
    }
    else
    {
        return (
            <div className="current-day">
                <h1 className="day-header">{forecastDay.dt.getDay()} in {city.name}</h1>
        
                {/* <div className="weather">
                <p>
                    <img src={'http://openweathermap.org/img/w/{forecastDay.icon}.png'} alt={forecastDay.description}/>
                    {forecastDay.description}
                </p>
                </div> */}
        
                <div className="details flex-parent">
                    <div className="temperature-breakdown">
                    <p>Morning Temperature: {forecastDay.morningTemp}&deg;F</p>
                    <p>Day Temperature: {forecastDay.dayTemp}&deg;F</p>
                    <p>Evening Temperature: {forecastDay.eveningTemp}&deg;F</p>
                    <p>Night Temperature: {forecastDay.nightTemp}&deg;F</p>
                    </div>
                    <div className="misc-details">
                    <p>Atmospheric Pressure: {forecastDay.pressure} hPa</p>
                    <p>Humidity: {forecastDay.humidity}%</p>
                    <p>Wind Speed: {forecastDay.wind} mph</p>
                    </div>
                </div>
        
            </div>
            );
    }
}

export default CurrentDay;
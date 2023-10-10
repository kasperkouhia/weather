const apikey = localStorage.getItem("apikey");
const loc = localStorage.getItem("loc");
if (apikey) document.getElementById("apikey").value = apikey;
if (loc) document.getElementById("loc").value = loc;
document.getElementById("search").addEventListener("submit", async function(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${data.get("apikey")}&q=${data.get("loc")}&aqi=no`, {method: "GET"});
    const display = document.getElementById("main");
    if (response.status != 200) {
        display.innerHTML = `<h1 id="error-heading">Error!</h1>`;
        return;
    }
    const weather = await response.json();
    localStorage.apikey = data.get("apikey");
    localStorage.loc = weather.location.name;
    display.innerHTML = `<h1 id="place-name">${weather.location.name}</h1>
                        <p id="date">${weather.current.last_updated}</p>
                        <h2 id="temperature">${Math.round(weather.current.temp_c)}&deg;C</h2>
                        <div id="condition">
                            <img src="https:${weather.current.condition.icon}"/>
                            <div id="additional-information">
                                <p>${weather.current.condition.text}</p>
                                <p>Humidity: ${Math.round(weather.current.humidity)}%</p>
                                <p>Wind: ${Math.round(weather.current.wind_kph)} km/h</p>
                            </div>
                        </div>`;
});
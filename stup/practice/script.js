const apiKey = "84cccb24054be9a1e47e4fe1300f11d4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

document.getElementById("search-btn").addEventListener("click", () => {
    checkWeather(document.getElementById("input").value);
})

async function checkWeather(city){
    const response = await fetch(apiUrl + "q=" + city + "&appid=" + apiKey + "&units=metric");
    var data = await response.json();
    console.log(data);

    // Reset animations by removing and re-adding elements
    const details = document.querySelector(".details");
    const weather = document.querySelector(".weather");
    const detailsClone = details.cloneNode(true);
    const weatherClone = weather.cloneNode(true);
    details.parentNode.replaceChild(detailsClone, details);
    weather.parentNode.replaceChild(weatherClone, weather);

    // Update values with delay for bottom-up animation
    setTimeout(() => {
        document.querySelector("#humidity-value").innerHTML = data.main.humidity + "%";
        document.querySelector("#wind-value").innerHTML = data.wind.speed + " km/h";
    }, 0);

    setTimeout(() => {
        document.querySelector(".city").innerHTML = data.name;
    }, 100);

    setTimeout(() => {
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    }, 200);

    setTimeout(() => {
        const weatherStatus = "images/" + data.weather[0].main + ".png";
        document.querySelector(".weather-icon").src = weatherStatus;
    }, 300);
}

checkWeather();

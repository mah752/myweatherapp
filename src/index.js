//getting the current date
let now = new Date();

console.log(now);

let date = now.getDate();
console.log(date);

//milliseconds
let milliseconds = now.getMilliseconds();
console.log(milliseconds);
//days
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
console.log(day);

//year
let year = now.getFullYear();
console.log(year);

//months
let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
let month = months[now.getMonth()];
console.log(month);

//hours and minutes
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}

//minutes
let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
//displaying todays date and time
let time = `${hours}:${minutes}`;
console.log(time);
let todayDate = `${day}, ${month} ${date}, ${year}`;

function formattedDate() {
    return `${todayDate} ${time}`;
}
console.log(formattedDate(new Date()));

let current = new Date();
let dateTime = document.querySelector("#day-input");
dateTime.innerHTML = formattedDate(current);

//searching for your current location
function CurrentLocation(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    let currentCity = document.querySelector(".city");
    currentCity.innerHTML = searchInput.value;
}
let changeCity = document.querySelector("#search-form");
changeCity.addEventListener("submit", CurrentLocation);

//using API
function searchCity(city) {
    let apiKey = "97d92d345b5dee4adf0c3f606a085e3e";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
    console.log(apiUrl);
}
//search form
function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-input").value;
    searchCity(cityInput);
}


//current temperature
function displayWeather(response) {
    let weatherDiv = document.querySelector("#temp-input");
    let temperature = Math.round(response.data.main.temp);
    weatherDiv.innerHTML = `${temperature}°C`;
    //fahrenheit temperature
    function displayFarenheitTemperature(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#temp-input");
        let fahrenheittemp = (temperature * 9) / 5 + 32;
        temperatureElement.innerHTML = Math.round(
            fahrenheittemp
        );
    }
    let fahrenheitLink = document.querySelector(".faranheit");
    fahrenheitLink.addEventListener("click", displayFarenheitTemperature);

    function displayCelciustemp(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#temp-input");
        temperatureElement.innerHTML = displayWeather;
    }
    let celcuistemp = null;
    //submitting the form
    let inputForm = document.querySelector("#search-form");
    inputForm.addEventListener("submit", handleSubmit);
    //This city will show by default
    searchCity("London");
    let celciusLink = document.querySelector(".celcius");
    celciusLink.addEventListener("click", displayCelciustemp);
    //current city
    let currentCity = response.data.name;
    let displaycurrentCity = document.querySelector("#city-input");
    displaycurrentCity.innerHTML = `${currentCity}`;
    //humidity
    let humidity = response.data.main.humidity;
    let humidityInput = document.querySelector("#humidity-input");
    humidityInput.innerHTML = `${humidity}%`;

    let windSpeed = Math.round(response.data.wind.speed);
    let windSpeedInfo = document.querySelector("#wind-input");
    windSpeedInfo.innerHTML = `${windSpeed} km/h`;
    //Temperature for feels like input 
    let feelsLike = Math.round(response.data.main.feels_like);
    let feelsInput = document.querySelector("#feels-input");
    feelsInput.innerHTML = `${feelsLike}°C`;
    //forecast description
    let currentForecastNow = response.data.weather[0].description;
    let forecastDescriptionnow = document.querySelector("#forecast-input");
    forecastDescriptionnow.innerHTML = `${currentForecastNow} `;

    //getting the icon element to change
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

}
//pulls up exact coordinates or position
function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "97d92d345b5dee4adf0c3f606a085e3e";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
}
navigator.geolocation.getCurrentPosition(showPosition);
// making the use my location button to pull up current location
function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}
let CurrentWeatherbyLocation = document.querySelector("#current-location");
CurrentWeatherbyLocation.addEventListener("click", getCurrentLocation);
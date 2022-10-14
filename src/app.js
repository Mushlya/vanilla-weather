function formatDayTime(timestamp)
{
let date=new Date(timestamp);
let hour=date.getHours();
if (hour < 10)
{
    hour = "0" + hour;
}
let minute=date.getMinutes();
if (minute < 10)
{
    minute = "0" + minute;
}
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day=days[date.getDay()];
return "Last updated: " + day + " " + hour + ":" + minute;
}

function getForecast(coordinates)
{
    let apiKey = "96771e971243152d6b8948878c26adde";
    let apiUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+coordinates.lat+"&lon="+coordinates.lon+"&units=metric&appid="+apiKey;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastHTML = `<div class="row">`;
    let days=["Thu","Fri","Sat", "Sun", "Mon"];
        days.forEach(function(day)
    {
        forecastHTML = forecastHTML + `
        <div class="col-2">
        <div class="weather-forecast-day">
        ${day}
        </div>
        <img src="http://openweathermap.org/img/wn/03d@2x.png" alt="" class="src" width="48">
        <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-high">18</span> 
            <span class="weather-forecast-temp-low">12</span>
        </div>
        </div>
            `;
    });
    
    let forecastElement=document.querySelector("#forecast");        
    forecastElement.innerHTML=forecastHTML;
}

function displayTemperature(response)
{
let tempElement=document.querySelector("#apiTemp");
let cityElement=document.querySelector("#apiCity");
let conditionsElement=document.querySelector("#apiConditions");
let humidityElement=document.querySelector("#apiHumidity");
let windElement=document.querySelector("#apiWind");
let dayTimeElement=document.querySelector("#apiDayTime");
let iconElement=document.querySelector("#apiIcon");

celsiusTemp=Math.round(response.data.main.temp);
tempElement.innerHTML=celsiusTemp;

cityElement.innerHTML=response.data.name;
conditionsElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=Math.round(response.data.wind.speed);
dayTimeElement.innerHTML=formatDayTime(response.data.dt * 1000);
iconElement.setAttribute("src","http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png");
iconElement.setAttribute("alt",response.data.weather[0].description);

getForecast(response.data.coord);
}

function search(city){

let apiKey = "0cf6b60d58b0c697532c33384fe20a26";
let apiUrl="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;
axios.get(apiUrl).then(displayTemperature); 

}

function handleSubmit(event){
    event.preventDefault();
    let inputCityElement=document.querySelector("#inputCity");
    search(inputCityElement.value);
}

function showCelsius(event) {
    event.preventDefault();
    tempElement.innerHTML=celsiusTemp;
    cLink.classList.remove("nonActiveLink");
    cLink.classList.add("activeLink");
    fLink.classList.remove("activeLink");
    fLink.classList.add("nonActiveLink");
}

function showFahrenheit(event) {
    event.preventDefault();
    tempElement.innerHTML=Math.round((celsiusTemp * 9) / 5 + 32);
    fLink.classList.remove("nonActiveLink");
    fLink.classList.add("activeLink");
    cLink.classList.remove("activeLink");
    cLink.classList.add("nonActiveLink");   
}

let formElement= document.querySelector("#searchForm");
formElement.addEventListener("submit",handleSubmit);

let fLink=document.querySelector("#fLink");
fLink.addEventListener("click",showFahrenheit);

let cLink=document.querySelector("#cLink");
cLink.addEventListener("click",showCelsius);

let tempElement=document.querySelector("#apiTemp");
let celsiusTemp = null;

search("Callantsoog");
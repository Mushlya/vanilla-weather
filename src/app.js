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

function displayTemperature(response)
{
console.log(response.data.main.temp);
let tempElement=document.querySelector("#apiTemp");
let cityElement=document.querySelector("#apiCity");
let conditionsElement=document.querySelector("#apiConditions");
let humidityElement=document.querySelector("#apiHumidity");
let windElement=document.querySelector("#apiWind");
let dayTimeElement=document.querySelector("#apiDayTime");
tempElement.innerHTML=Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
conditionsElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=Math.round(response.data.wind.speed);
dayTimeElement.innerHTML=formatDayTime(response.data.dt * 1000);






}

let apiKey = "0cf6b60d58b0c697532c33384fe20a26";
let apiUrl="https://api.openweathermap.org/data/2.5/weather?q=Callantsoog&units=metric&appid="+apiKey;

axios.get(apiUrl).then(displayTemperature); 
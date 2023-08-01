"use strict"

const defaultCity = 'Berlin';

// https://api.openweathermap.org/data/2.5/weather?units=metric&appid={apiKey}&q=city

const apiKey = 'APIKeyOpenWeather'; //Get in your API Key from opeWeather
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector(".select-city input");
const searchBtn = document.querySelector(".select-city button");
const weatherPic = document.querySelector(".selected-pic");
const bgImage = document.querySelector(".container");
const weatherIcon = document.querySelector("#weather-icon");
const weatherLink = document.querySelector(".weather-link");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();
    
    document.querySelector(".temp").innerText = Math.round(data.main.temp);
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".hum").innerText = data.main.humidity + " %";
    document.querySelector(".wind-speed").innerText = data.wind.speed + " km/h";

    fetch("/js/condition.json").then((imageResponse) => {
        return imageResponse.json();
    }).then((imageData) => {
        const conditions = imageData.weather;

        for(let condition of conditions)
    {
        if(data.weather[0].icon === condition.icon)
        {
            bgImage.style.backgroundImage = `url(${condition.background})`;
            weatherPic.src = condition.image;
        }
    }
    });

}

async function defaultCityWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let data = await response.json();

    document.querySelector(".weather-data").innerText = Math.round(data.main.temp) + " °C " + data.name;

    fetch("/js/condition.json").then((imageResponse) => {
        return imageResponse.json();
    }).then((imageData) => {
        const conditions = imageData.weather;

        for(let condition of conditions)
    {
        if(data.weather[0].icon === condition.icon)
        {
            weatherIcon.src = condition.svg;
        }
    }
    });
} 

searchBtn.addEventListener('click', () =>{
    checkWeather(searchInput.value);
});

weatherLink = defaultCityWeather(defaultCity);
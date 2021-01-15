import React from "react";
import { useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";

const api = {
    key: "a16966a3c44261ccd0ddc5da1be8b926",
    base: "http://api.openweathermap.org/data/2.5/",
};

const dateBuilder = (d) => {
    let months = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year} `;
};

function App() {
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = (evt) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&lang=ru&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                    setWeather(result);
                    setQuery("");
                    console.log(result);
                });
        }
    };

    return (
        <div className={typeof weather.main != "undefined" ? (weather.main.temp > 8 ? "app warm" : "app") : "app"}>
            <main>
                <Header />

                <div className="search-box">
                    <input
                        type="search"
                        className="search-bar"
                        placeholder="Введите город..."
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>

                <div className="date">{dateBuilder(new Date())}</div>

                {typeof weather.main != "undefined" ? (
                    <div>
                        <div className="location-box">
                            <div className="location">
                                {weather.name}, {weather.sys.country}
                            </div>
                        </div>

                        <div className="weather-box">
                            <div className="temp">{Math.round(weather.main.temp)}℃</div>

                            <div className="descr">
                                <div className="weather">{weather.weather[0].description} </div>
                                <div className="weather-icon">
                                    <img
                                        className="icon-temp"
                                        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                                        alt="icon-weather"
                                    />
                                </div>
                            </div>

                            <div className="wind">Скорость ветра: {weather.wind.speed} м/с</div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </main>
        </div>
    );
}

export default App;

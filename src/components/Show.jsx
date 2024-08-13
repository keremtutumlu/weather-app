import React, { useEffect, useState } from 'react';
import './Show.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Select } from './Select';

export const Show = () => {
    const lat = localStorage.getItem('lat');
    const lon = localStorage.getItem('lon');
    const key = '3dd0c4f8feb9eccc627dd7cd6f9a6d59';
    const [weather, setWeather] = useState(null);
    const [imgLink, setImg] = useState(null);

    const getWeather = async () => {
        try {
            let query = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=TR&appid=${key}`;
            const response = await fetch(query);
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error('Hata yakalandı : ', error);
        }
    };

    useEffect(() => {
        getWeather();
        console.log(weather);
    }, []);

    if (!weather) {
        return <div>Yükleniyor...</div>;
    }

    return (

        <div className="card">
            <div className="card-header">
                <Link to={'/'} className='back-arrow'><IoIosArrowBack /></Link>
                <b>{weather.name} , TR</b>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><img src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'} className='weather-img'></img>{weather.weather[0].description}</li>
                <li className="list-group-item">Sıcaklık : {weather.main.temp} °C &nbsp;&nbsp;&nbsp;&nbsp;Hissedilen Sıcaklık : {weather.main.feels_like} °C</li>
                <li className="list-group-item">Rüzgar Hızı: {weather.wind.speed} m/s</li>
            </ul>
        </div>

    );
};

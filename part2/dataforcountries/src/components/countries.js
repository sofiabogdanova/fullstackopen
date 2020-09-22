import React, { useState, useEffect } from 'react';
import axios from 'axios'

import '../countries.css'

const Countries = ({ countries }) => {
    return (
        <>
            {countries.map(c => <BriefCountryInfo key={c.name} country={c} />)}
        </>);
}

const BriefCountryInfo = ({ country }) => {
    const [showFullInfo, setShowFullInfo] = useState(false);
    const onShow = (country) => {
        const newShowFullInfo = !showFullInfo;
        setShowFullInfo(newShowFullInfo);
    };

    return (
        <>
            <div className="row">
                <div>{country.name}</div>
                <button onClick={() => onShow(country)}>show</button>
            </div>
            {
                showFullInfo && <FullCountryInfo country={country} />
            }
        </>);
}

const FullCountryInfo = ({ country }) => {
    const languages = country.languages.map((l) =>
        <li key={l.name}>{l.name}</li>
    );

    return (
        <>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Spoken languages</h2>
            <ul>
                {languages}
            </ul>
            <img src={country.flag} alt="Flag" width="100px" height="100px" />
            <Weather capital={country.capital} />
        </>);
}


const Weather = ({ capital }) => {
    const [weather, setWeather] = useState('');

    useEffect(() => {
        const http = constructWeatherHttp(capital);
        axios
            .get(http)
            .then(response => {
                setWeather(response.data.current);
            });
    }, []);

    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>temperature: {weather.temperature}</p>
            {
                weather.weather_icons && <img src={weather.weather_icons[0]} alt="Flag" width="50px" height="50px" />
            }
            <p>wind: {weather.wind_degree} mph direction {weather.wind_dir}</p>
        </>
    );
}

const constructWeatherHttp = (capital) => {
    const access_key = process.env.REACT_APP_API_KEY;
    return 'http://api.weatherstack.com/current?access_key='.concat(access_key, '&query=', capital);
}

export {
    Countries,
    FullCountryInfo
}
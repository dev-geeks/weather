import React, { useEffect, useState } from "react";
import "./Temp.css";
import WeatherCard from "./WeatherCard";

const Temp = () =>{

    const [search, setSearch] = useState("mohali");
    const [tempInfo, setTempinfo] = useState({});
    const getWeatherInfo = async () =>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=40c3345589e63b8a91dce2a934daf9c5`;

            const res = await fetch(url);
            const data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const {main: weatherMood } = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const { country, sunset } = data.sys;

            const NewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weatherMood,
                name,
                speed,
                country,
                sunset,
            };
            setTempinfo(NewWeatherInfo);
            console.log(temp);
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getWeatherInfo();
    },[])
    return(
        <div>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="Search..." autoFocus id="search" className="searchTerm" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                    <button className="searchButton" onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
            <WeatherCard tempInfo = {tempInfo}/> 
        </div>
    )
}

export default Temp;
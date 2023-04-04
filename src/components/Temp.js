import React, { useEffect, useState } from "react";
import "./Temp.css";

const Temp = () =>{

    const [search, setSearch] = useState("mohali");
    cosnt [tempInfo, setTempinfo] = useState({});
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
            <article className="widget">
                <div className="weatherIcon">
                    <i className={"wi wi-day-sunny"}></i>
                </div>
                <div className="weatherInfo">
                    <div className="temperature">
                        <span>25&deg;</span>
                    </div>    
                    <div className="description">
                        <div className="weatherCondition">SUnney</div>
                        <div className="place">Pune, India</div>
                    </div>  
                </div>
                <div className="date" >{ new Date().toLocaleString()}</div>
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p><i className={"wi wi-sunset"}></i></p>
                            <p className="extra-info-leftside"> 19.19 <br/> Sunset</p>
                        </div>
                        <div className="two-sided-section">
                            <p><i className={"wi wi-humidity"}></i></p>
                            <p className="extra-info-leftside"> 19.19 <br/> Humidity</p>
                        </div>
                    </div>
                    <div className="weather-extra-info">
                    <div className="two-sided-section">
                            <p><i className={"wi wi-rain"}></i></p>
                            <p className="extra-info-leftside"> 19.19 <br/> Pressure</p>
                        </div>
                        <div className="two-sided-section">
                            <p><i className={"wi wi-strong-wind"}></i></p>
                            <p className="extra-info-leftside"> 19.19 <br/> Speed</p>
                        </div>
                    </div>
                </div>
            
            </article>
        </div>
    )
}

export default Temp;
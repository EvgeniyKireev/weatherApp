import React, {useEffect, useState} from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import s from "../../styles/Tomorrow.module.css";
import {Loader} from "../../common/Loader";

const apikey = '5f83d3ea0a35d73b3f47106ed013675f';
export const Tomorrow = () => {
    const mapData = {
        center: [55.751574, 37.573856],
        zoom: 10,
    };
    let [infoTomorrow, setInfo] = useState({temp: ''});
    let [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState({latitude: '', longitude: '', name: ''});
    useEffect(async () => {
        navigator.geolocation.getCurrentPosition(showPosition); // Запрашиваем местоположение, и в случае успеха вызываем функцию showPosition
        function showPosition(position) {
            setCoords({latitude: position.coords.latitude, longitude: position.coords.longitude})
        }

        if (coords.latitude) {
            setLoading(true)
            try {
                const responseName = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apikey}&units=metric`)
                const dataName = await responseName.json()
                const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=hourly&appid=${apikey}&units=metric`)
                const data = await response.json()
                setInfo({
                    temp: data.daily[1].temp.day,
                    min: data.daily[1].temp.min,
                    max: data.daily[1].temp.max,
                    night: data.daily[1].temp.night,
                    feels_like: data.daily[1].feels_like.day,
                    name: dataName.name,
                    desc: dataName.weather[0].description,
                    icon: dataName.weather[0].icon
                })
                console.log(infoTomorrow)
            } catch (e) {
                console.log(e)
            }

            setLoading(false)
        }
    }, [coords.longitude, infoTomorrow.temp]);
    if (loading) {
        return <div className={'loader'}><Loader/></div>
    }
    return (<div className={s.tomorrow}>
        <div>
            <img src={`http://openweathermap.org/img/wn/${infoTomorrow.icon}@2x.png`}/>
            <h2>{infoTomorrow.name}</h2>
            <h3>{infoTomorrow.desc}</h3>
            <div className={s.allTemp}>Temperature tomorrow afternoon: <span>&nbsp;{infoTomorrow.temp} °C</span></div>
            <div className={s.allTemp}>Minimum temperature tomorrow: <span>&nbsp;{infoTomorrow.min} °C</span></div>
            <div className={s.allTemp}>Maximum temperature tomorrow: <span>&nbsp;{infoTomorrow.max} °C</span></div>
            <div className={s.allTemp}>Temperature at night tomorrow: <span>&nbsp;{infoTomorrow.night} °C</span></div>
            <div className={s.allTemp}>Feels like tomorrow: <span>&nbsp;{infoTomorrow.feels_like} °C</span></div>
        </div>
        <div id="map"><YMaps>
            <Map className={s.map} defaultState={mapData}><Placemark geometry={[coords.latitude, coords.longitude]}/>
            </Map>
        </YMaps></div>
    </div>);
}
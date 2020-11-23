import {useParams} from 'react-router-dom';
import React, {useEffect, useState} from "react"
import {Loader} from "../../common/Loader";
import s from "../../styles/Detail.module.css";
import {Map, YMaps} from "react-yandex-maps";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
const apikey = 'e60827ffd1072fb3817125f07e132e5c';
export const Detail = () => {
    const mapData = {
        center: [55.751574, 37.573856],
        zoom: 2,
    };
    const city = useParams().city;
    let [infoCity, setInfo] = useState({temp: ''});
    let [loading, setLoading] = useState(false);
    useEffect(async () => {
        if (city) {
            setLoading(true)
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
                const data = await response.json()
                setInfo({
                    name: data.name,
                    temp: data.main.temp,
                    min: data.main.temp_min,
                    max: data.main.temp_max,
                    desc: data.weather[0].description,
                    wind: data.wind.speed
                })
            } catch (e) {
                console.log(e)
            }

            setLoading(false)
        }
    }, [city, infoCity.name, infoCity.temp]);
    if (loading) {
        return <div className={'loader'}><Loader /></div>
    }

    return <div>
        {!infoCity.name && <h1 className={s.notFound}><div><NotInterestedIcon style={{fontSize: '100px'}} /></div>
            404 NOT FOUND</h1>}
        {infoCity.temp && <div className={s.detail}>
            <div> <h1>{infoCity.name}</h1>
                <div><div className={s.allTemp}>Temperature:<span>&nbsp;{infoCity.temp} °C</span></div>
                    <div className={s.allTemp}>Minimum temperature tomorrow:<span>&nbsp;{infoCity.min} °C</span></div>
                    <div className={s.allTemp}>Maximum temperature tomorrow:<span>&nbsp;{infoCity.max} °C</span></div>
                    <div className={s.allTemp}>Wind speed:<span>&nbsp;{infoCity.wind}</span></div>
                    <div className={s.allTemp}><span>{infoCity.desc}</span></div></div></div>
            <div id="map"><YMaps>
                <Map className={s.map} defaultState={mapData}>
                </Map>
            </YMaps></div>
        </div>}
    </div>
}
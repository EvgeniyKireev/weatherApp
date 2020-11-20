import React, {useEffect, useState} from "react";
import {WeekEl} from "./WeekEl";
import s from '../../styles/Week.module.css'
import {Loader} from "../../common/Loader";
const apikey = '5f83d3ea0a35d73b3f47106ed013675f';
export const Week = () => {
    let [infoWeek, setInfo] = useState({name: '', daily: []});
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
                const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=alerts&appid=${apikey}&units=metric`);
                const data = await response.json()

                setInfo({
                    name: dataName.name,
                    temp: dataName.main.temp,
                    daily: data.daily
                })

            } catch (e) {
                console.log(e)
            }

            setLoading(false)
        }
    }, [coords.longitude, infoWeek.temp]);
    if (loading) {
        return <div className={'loader'}><Loader /></div>
    }
    // делаем страницу недели
    return <div className={s.week}>
        <div className={s.main}><h1 className={s.name}>{infoWeek.name}</h1>
            <h3>{infoWeek.temp} °C</h3></div>
       <div className={s.daily}>{infoWeek.daily.map((k, index) => <WeekEl daily={infoWeek.daily[index]}/>)}</div>
    </div>
}
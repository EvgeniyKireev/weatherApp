import React from "react";
import s from "../../styles/Week.module.css";
import CloudIcon from '@material-ui/icons/Cloud';
export const WeekEl = ({daily}) => {
    console.log(daily)
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (<div className={s.weekEl}>
        <img src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}/>
       <div> <h6>{new Date(daily.dt * 1000).getDate()} {month[new Date(daily.dt * 1000).getMonth()]}</h6>
           <div><h6>Temperature day: </h6> {daily.temp.day} °C</div>
           <h6>{daily.weather[0].description}</h6></div>
    </div>)
}
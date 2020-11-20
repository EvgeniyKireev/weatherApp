import s from "../../styles/Cities.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import LocationCityIcon from '@material-ui/icons/LocationCity';

export const SavedCity = ({city}) => {
    return ( <div className={s.els}>
       <div className={s.el}><div className={s.icon}><LocationCityIcon className={s.icon} style={{fontSize: '80px'}} /></div><div><NavLink to={`/d/${city}`}>{city}</NavLink></div></div>
    </div>);
}
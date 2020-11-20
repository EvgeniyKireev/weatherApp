import React from "react";
import s from '../../styles/Cities.module.css'
import {SavedCity} from "./SavedCity";

export const SavedCities = ({saveCity}) => {
    return (<div className={s.cities}>
        {saveCity.length === 0 && <h1 style={{marginTop: '50px'}}>
            you haven't saved anything</h1>}
        {saveCity.map(city => <SavedCity city={city}/>)}
    </div>);
}
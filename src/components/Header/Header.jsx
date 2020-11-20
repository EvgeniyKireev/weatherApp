import React from "react";
import {NavLink, useHistory} from "react-router-dom";
import s from '../../styles/Navbar.module.css'
import 'react-autocomplete-input/dist/bundle.css';
import SearchCity from "./SearchCity";


export const Header = ({}) => {
    const history = useHistory()
    return (<div>
        <nav className={s.nav}>
            <div className={s.el}><NavLink to={'/'}>Home</NavLink></div>
            <div className={s.el}><NavLink to={'/today'}>Today</NavLink></div>
            <div className={s.el}><NavLink to={'/tomorrow'}>Tomorrow</NavLink></div>
            <div className={s.el}> <NavLink to={"/week"}>Week</NavLink></div>
           <div className={s.el}><SearchCity history={history}/></div>
        </nav>
    </div>)
}
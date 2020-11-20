import './App.css';
import {Header} from "./components/Header/Header";
import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import {Info} from "./components/Detail/Info";
import {SavedCities} from "./components/SavedCity/SavedCities";
import {Today} from "./components/forecastForYou/Today";
import {Tomorrow} from "./components/forecastForYou/Tomorrow";
import {Week} from "./components/forecastForYou/Week";
import {Loader} from "./common/Loader";
import {Detail} from "./components/Detail/Detail";

const apikey = 'e60827ffd1072fb3817125f07e132e5c';

function App() {

    const [locationTemp, setLocation] = useState({temp: '', text: ''});
    const [coords, setCoords] = useState({latitude: '', longitude: '', name: ''});
    useEffect(async () => {
        navigator.geolocation.getCurrentPosition(showPosition); // Запрашиваем местоположение, и в случае успеха вызываем функцию showPosition
        function showPosition(position) {
            setCoords({latitude: position.coords.latitude, longitude: position.coords.longitude})
        }

        try {
            if (coords.latitude) {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apikey}&units=metric`)
                const data = await response.json()
                setLocation({temp: data.main.temp, text: data.weather[0].description, name: data.name, icon: data.weather[0].icon})
            }
        } catch (e) {
            console.log(e)
        }

    }, [coords.longitude, locationTemp.temp])
    const [saveCity, setCity] = useState([]);
    if (!locationTemp.name) {
        return <div className={'loader'}><Loader/></div>
    }

    return (
        <div className="App">
            <Header/>
            <Route path={'/today'} render={() => <Today/>}/>
            <Route path={'/tomorrow'} render={() => <Tomorrow/>}/>
            <Route path={'/week'} render={() => <Week/>}/>
            <Route path={'/d/:city'}><Detail/></Route>
            <Route path={'/'} exact
                   render={() => <div><Info locationTemp={locationTemp} saveCity={saveCity} setCity={setCity}/>
                       <SavedCities saveCity={saveCity}/></div>}/>
        </div>
    );
}

export default App;

import React, {useState} from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import s from '../../styles/Info.module.css'
import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Loader} from "../../common/Loader";
import SearchCityForSave from "./SearchCityForSave";

export const Info = ({locationTemp, saveCity, setCity}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    let [set, setSet] = useState(false);
    const handleClose = (textCity) => {
       if(textCity) {
           setCity([...saveCity,textCity])
       }
        setShow(false)
    };

    if (!locationTemp) {
        return <div className={'loader'}><Loader /></div>
    }


    return (<div className={s.information}>
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить город</Modal.Title>
                </Modal.Header>
                <Modal.Body className={s.modal_input}><SearchCityForSave setSet={setSet} handleClose={handleClose} /></Modal.Body>
            </Modal>
        </>
        <div className={s.add}>
            <AddCircleOutlineIcon onClick={handleShow}/>
        </div>
        <div className={s.info}>
            <img src={`http://openweathermap.org/img/wn/${locationTemp.icon}@2x.png`}/>
            <div className={s.temp}>{locationTemp.temp} °C</div>
            <div className={s.name}>{locationTemp.name}</div>
            <div className={s.text}>{locationTemp.text}</div>
        </div>
    </div>)
}
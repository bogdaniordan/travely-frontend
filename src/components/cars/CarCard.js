import React from 'react';
import {useStyles} from "../../styling/js-styling/NavbarBadgeStyling";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import "./CarStyling.css"

const CarCard = ({car, dates, setWarningMessage}) => {
    const classes = useStyles();

    const reserve = () => {
        if(!dates.endDate) {
            setWarningMessage(true)
        }
    }

    return (
        <Paper elevation={3} className={classes.paper}>
            <img className="car-img" src={`http://localhost:8080/cars/image/${car.id}/download`} alt="car"/>
            <div className="car-info-container">
                <div className="left-car-info">
                    <h4 className="car-model-header">{car.model}</h4>
                    <br/>
                    <p><LocationOnIcon />{car.location}</p>
                    <p><SettingsIcon /><strong>Gear box</strong> {car.carGear}</p>
                    <p><DirectionsCarIcon /><strong>Mileage</strong> {car.mileage} km per rental </p>
                    <p><LocalGasStationIcon /><strong>Fuel policy</strong> {car.fuelPolicy.toLowerCase().replaceAll("_", " ")}</p>
                </div>
                <div className="car-right-stats">
                    <div className="car-rating-container">
                        <h4 className="car-rating">{car.rating}</h4>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <p className="car-text-to-left"><strong>${car.pricePerDay}</strong>/day</p>
                    <p className="car-text-to-left">{dates.endDate ? "bla bla" : "No dates selected"}</p>
                    <p className="car-text-to-left">{car.fullInsurance ? <span><CheckCircleIcon color="success"/> Full insurance</span> : <span><ErrorIcon className={classes.errorIcon} /> Partial insurance</span>}</p>
                    <Button variant="contained" color="primary" className={classes.reserveBtn} onClick={reserve}>Reserve</Button>
                </div>
            </div>
        </Paper>
    );
};

export default CarCard;
import React, {useEffect, useState} from 'react';
import {useStyles} from "../../styling/js-styling/NavbarBadgeStyling";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import "../../styling/CarStyling.css"
import CarBookingService from "../../service/CarBookingService";

const CarCard = ({car, dates, setWarningMessage}) => {
    const classes = useStyles();
    // const [canBeBooked, setCanBeBooked] = useState(false);

    // const reserve = () => {
    //     if(!dates.endDate) {
    //         setWarningMessage(true)
    //     }
    // }

    // useEffect(() => {
    //     CarBookingService.canBeBooked(car.id).then(res => setCanBeBooked(res.data))
    // })

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
                    {dates.endDate && (
                        <p className="car-text-to-left">CALCULATE DAYS * PRICE PER DAY</p>
                    )}
                    <p className="car-text-to-left">{car.fullInsurance ? <span><CheckCircleIcon color="success"/> Full insurance</span> : <span><ErrorIcon className={classes.errorIcon} /> Partial insurance</span>}</p>
                    {/*{*/}
                    {/*    canBeBooked && (*/}
                            <Button variant="contained" color="primary" className={classes.reserveBtn}>Reserve</Button>
                        {/*)*/}
                    {/*}*/}
                </div>
            </div>
        </Paper>
    );
};

export default CarCard;
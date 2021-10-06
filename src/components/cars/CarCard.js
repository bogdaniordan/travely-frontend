import React from 'react';
import {useStyles} from "../../styling/NavbarBadgeStyling";
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SettingsIcon from '@mui/icons-material/Settings';
import "./CarStyling.css"

const CarCard = ({car}) => {
    const classes = useStyles();

    return (
        <Paper elevation={2} className={classes.paper}>
            <img className="car-img" src={`http://localhost:8080/cars/image/${car.id}/download`} alt="car"/>
            <div className="car-info-container">
                <div className="left-car-info">
                    <h4 className="car-model-header">{car.model}</h4>
                    <p><LocationOnIcon />{car.location}</p>
                    <p>Dates</p>
                    <p><SettingsIcon /><strong>Gear box</strong> {car.carGear}</p>
                    <p><DirectionsCarIcon /><strong>Mileage</strong> {car.mileage} per rental </p>
                    <p><LocalGasStationIcon /><strong>Fuel policy</strong> {car.fuelPolicy.toLowerCase().replaceAll("_", " ")}</p>
                </div>
                <div style={{display: "block", float: "right", width: "30%", height: "100%", textAlign: "right"}}>
                    <div style={{backgroundColor: "blue", width: "20%", height: "50px", float: "right", textAlign: "center", borderRadius: "10px", marginTop: "5px", marginRight: "5px"}}>
                        <h4 style={{color: "white", margin: "auto", marginTop: "10px"}}>{car.rating}</h4>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <p>Price per day</p>
                    <p>Total price</p>
                    <p>{car.fullInsurance ? "Full insurance" : "Partial insurance"}</p>
                    <Button variant="contained" color="primary">Reserve</Button>
                </div>
            </div>
        </Paper>
    );
};

export default CarCard;
import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import CarService from "../../service/CarService";
import CarCard from "./CarCard";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import {getCityCoordinates} from "../../utils/CityCoordinates";
import Map from "../../utils/Map";
import moment from "moment";
import Button from "@material-ui/core/Button";

const CarReservationPage = () => {
    const location = useLocation();
    const [childSeatNumber, setChildSeatNumber] = useState(0);
    const [babySeatNumber, setBabySeatNumber] = useState(0);
    const [gps, setGps] = useState(false);

    return (
        <div>
            <Navbar title="Reservation" subtitle="Manage your car rental" />

            <div className="container">
                <Link to={`/profile`} style={{float: "left"}}>Back to profile</Link>
                <br/>
                <h4>View car details</h4>
                <h6>Dates: {moment(location.state.dates.startDate).format("DD-MM-YYYY")} - {moment(location.state.dates.endDate).format("DD-MM-YYYY")}</h6>
                <CarCard car={location.state.car} dates={location.state.dates} hideButton="hide" />
                <br/>
                <div className="row">
                    <div className="card">
                        <div className="card-body">
                            <h5>Pick up & drop off - {location.state.car.location} </h5>
                            <p>Opening hours
                                Mon - Sun	7am - 9pm</p>
                            <Map
                                // api key = AIzaSyBtJ-at-3HxnIdCfaeplBDJJaNuZ18rFgg
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtJ-at-3HxnIdCfaeplBDJJaNuZ18rFgg"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `244px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                lat={getCityCoordinates(location.state.car.location)[0]}
                                lng={getCityCoordinates(location.state.car.location)[1]}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="card">
                        <div className="card-body">
                            <h5>Payment and extras</h5>
                            <p>Please note: Your own car insurance does not cover hire cars.</p>
                            <div className="card" id="car-extras-card">
                                <div className="card-body" id="car-extras-body">
                                    <div className="car-extras-value">
                                        <h5>Child seat</h5>
                                    </div>
                                    <div className="car-extras-button-container">
                                        <div style={{float: "right", display: "flex"}}>
                                            <h4 className="car-extras-value-number">{childSeatNumber}</h4>
                                            <Button color="secondary" variant="outlined" disabled={childSeatNumber === 0} onClick={() => setChildSeatNumber(childSeatNumber - 1)} style={{marginRight: "10px"}}>-</Button>
                                            <Button color="primary" variant="outlined" disabled={childSeatNumber === 2} onClick={() => setChildSeatNumber(childSeatNumber + 1)}>+</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card" id="car-extras-card">
                                <div className="card-body" id="car-extras-body">
                                    <div className="car-extras-value">
                                        <h5>Baby seat</h5>
                                    </div>
                                    <div className="car-extras-button-container">
                                        <div style={{float: "right", display: "flex"}}>
                                            <h4 className="car-extras-value-number">0</h4>
                                            <Button color="secondary" variant="outlined" style={{marginRight: "10px"}}>-</Button>
                                            <Button color="primary" variant="outlined" disabled={true}>+</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" id="car-extras-card">
                                <div className="card-body" id="car-extras-body">
                                    <div className="car-extras-value">
                                        <h5>GPS</h5>
                                    </div>
                                    <div className="car-extras-button-container">
                                        <div style={{float: "right", display: "flex"}}>
                                            <h4 className="car-extras-value-number">0</h4>
                                            <Button color="secondary" variant="outlined" style={{marginRight: "10px"}}>-</Button>
                                            <Button color="primary" variant="outlined" disabled={true}>+</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CarReservationPage;
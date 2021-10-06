import React, {useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import DateRange from "react-date-range/dist/components/DateRange";
import {Collapse, Paper} from "@material-ui/core";
import {useStyles} from "../../styling/NavbarBadgeStyling";

const SearchTaxi = () => {
    const classes = useStyles();
    const [showCalendar, setShowCalendar] = useState(false);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    return (
        <div>
            <Navbar title="Taxi"/>
            <div className="testimonials-clean">
            <div className="container">
                <br/>
                <h4>Car hire for any kind of trip</h4>
                Clean cars. Flexible bookings. Socially distant rental counters.

                <div className="row">
                    <div className="col-lg-12 card-margin">
                        <div className="card search-form">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row no-gutters">
                                            <div className="col-lg-8 col-md-6 col-sm-12 p-0"  style={{width: "70%"}}>
                                                <input type="text" placeholder="Pick up location" className="form-control"
                                                       id="search" name="search"/>
                                            </div>

                                            <div className="col-lg-8 col-md-6 col-sm-12 p-0"  style={{width: "20%"}}>
                                                <select className="form-control" onClick={() => setShowCalendar(!showCalendar)}>
                                                    <option value="" selected disabled hidden>Dates</option>
                                                </select>
                                            </div>
                                            {/*<div className="col-lg-3 col-md-3 col-sm-4 p-0" style={{width: "120px"}}>*/}
                                            {/*    <select className="form-control" id="exampleFormControlSelect1">*/}
                                            {/*        <option value="" selected disabled hidden>Date</option>*/}
                                            {/*        <option value="Shared">Shared</option>*/}
                                            {/*        <option value="Private">Private</option>*/}
                                            {/*        <option value="Hotels">Hotels</option>*/}
                                            {/*    </select>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-lg-3 col-md-3 col-sm-4 p-0" style={{width: "100px"}}>*/}
                                            {/*    <select className="form-control" id="exampleFormControlSelect1">*/}
                                            {/*        <option value="" selected disabled hidden>Time</option>*/}
                                            {/*        <option value="Shared">Shared</option>*/}
                                            {/*        <option value="Private">Private</option>*/}
                                            {/*        <option value="Hotels">Hotels</option>*/}
                                            {/*    </select>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-lg-3 col-md-3 col-sm-4 p-0" style={{width: "100px"}}>*/}
                                            {/*    <select className="form-control" id="exampleFormControlSelect1">*/}
                                            {/*        <option value="" selected disabled hidden>People</option>*/}
                                            {/*        <option value="Shared">Shared</option>*/}
                                            {/*        <option value="Private">Private</option>*/}
                                            {/*        <option value="Hotels">Hotels</option>*/}
                                            {/*    </select>*/}
                                            {/*</div>*/}
                                            <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                                                <button type="submit" className="btn btn-base">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         stroke-width="2" stroke-linecap="round"
                                                         stroke-linejoin="round" className="feather feather-search">
                                                        <circle cx="11" cy="11" r="8"></circle>
                                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Collapse in={showCalendar} className={classes.collapse}>
                            <DateRange
                                // editableDateInputs={true}
                                onChange={item => setState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                                minDate={new Date()}
                            />
                        </Collapse>
                    </div>
                </div>
            </div>
            </div>
            <div className="container">
                <br/>
                <Paper elevation={2} className={classes.paper}>
                    <img style={{height: "100%", width: "25%", float: "left"}} alt="car"/>
                    <div style={{display: "block", height: "100%"}}>
                        <div style={{display: "block", float: "left"}}>
                            <h4 style={{marginLeft: "30px", marginTop: "10px"}}>Car model</h4>
                            <small>Location</small>
                            <p>Dates</p>
                            <p>Facilties</p>
                            <p>Mileage</p>
                            <p>Fuel policy</p>
                        </div>
                        <div style={{display: "block", float: "right", width: "30%", height: "100%", textAlign: "right"}}>
                            <p>Rating</p>
                            <p>Price per day</p>
                            <p>Total price</p>
                            <p>Full insurance</p>
                            <Button variant="contained" color="primary">Reserve</Button>
                        </div>
                    </div>
                </Paper>
            </div>
            <Footer/>
        </div>
    );
};

export default SearchTaxi;
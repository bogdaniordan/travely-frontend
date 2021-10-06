import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import DateRange from "react-date-range/dist/components/DateRange";
import {Collapse, Paper} from "@material-ui/core";
import {useStyles} from "../../styling/js-styling/NavbarBadgeStyling";
import CarService from "../../service/CarService";
import CarCard from "./CarCard";
import moment from "moment";

const SearchTaxi = () => {
    const classes = useStyles();
    const [checkBox, setCheckBox] = useState(true);
    const [cars, setCars] = useState([])
    const [showCalendar, setShowCalendar] = useState(false);
    const [location, setLocation] = useState("");
    const [showWarningMessage, setShowWarningMessage] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    const handleCheckBoxChange = () => {
        setCheckBox(!checkBox);
        if (checkBox) {
            setCars(cars.filter(car => !car.fullInsurance));
        } else {
            search()
        }
    }

    useEffect(() => {
        CarService.getAll().then(res => setCars(res.data));
    }, [])

    const search = () => {
        if (location.length === 0 || location === "Any") {
           CarService.getAll().then(res => {
               if(!checkBox) {
                   setCars(res.data.filter(car => car.fullInsurance))
               } else {
                   setCars(res.data)
               }
           })
        } else {
            CarService.getAllByLocation(location).then(res => {
                if(!checkBox) {
                    setCars(res.data.filter(car => car.fullInsurance))
                } else {
                    setCars(res.data)
                }
            })
        }
    }

    return (
        <div>
            <Navbar title="Car rentals"/>
            <div className="testimonials-clean">
            <div className="container">
                <br/>
                <h4>Car hire for any kind of trip</h4>
                Clean cars. Flexible bookings. Socially distant rental counters.
                <br/>
                <br/>
                <div className="row">
                    <div className="col-lg-12 card-margin">
                        <div className="card search-form">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row no-gutters">
                                            <div className="col-lg-3 col-md-3 col-sm-12 p-0" style={{width: "70%"}}>
                                                <select className="form-control" id="exampleFormControlSelect1" onChange={(event) => setLocation(event.target.value)}>
                                                    <option value="" selected disabled hidden>City</option>
                                                    <option value="Any">Any city</option>
                                                    <option value="London">London</option>
                                                    <option value="Boston">Boston</option>
                                                    <option value="Mumbai">Mumbai</option>
                                                    <option value="Toronto">Toronto</option>
                                                    <option value="Paris">Paris</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-8 col-md-6 col-sm-12 p-0"  style={{width: "20%"}}>
                                                <select className="form-control" onClick={() => setShowCalendar(!showCalendar)}>
                                                    <option value="" selected disabled hidden>Dates</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                                                <button type="submit" className="btn btn-base" onClick={search}>
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
                        <div className={classes.ageContainer}>
                            <input type="checkbox" defaultChecked={checkBox} className={classes.ageInput} onClick={handleCheckBoxChange}/>
                            {" "}Driver's age is between 30 and 65.
                        </div>
                        <Collapse in={showCalendar} className={classes.collapse}>
                            <DateRange
                                onChange={item => {
                                    console.log(dates.endDate)
                                    setDates([item.selection])
                                    setShowWarningMessage(false);
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                minDate={new Date()}
                            />
                        </Collapse>
                    </div>
                    {
                        showWarningMessage && (
                            <h4 className="car-warning-message">No dates selected! Please enter your car booking dates.</h4>
                        )
                    }
                    {
                        dates.endDate && (
                            <div>
                                <h4>Selected dates: {moment(dates.startDate).format("DD-MM-YYYY")} - {moment(dates.endDate).format("DD-MM-YYYY")}</h4>
                                <br/>
                            </div>
                        )
                    }
                </div>
            </div>
            </div>
            <div className="container">
                {
                    cars.length > 0 ? (
                        cars.map(
                            car => <CarCard dates={dates} car={car} setWarningMessage={setShowWarningMessage}/>
                        )
                    ) : (<div>
                            <br/>
                            <h4>No results found for your search.</h4>
                        </div>)
                }
            </div>
            <Footer/>
        </div>
    );
};

export default SearchTaxi;
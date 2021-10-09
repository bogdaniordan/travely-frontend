import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import BookingService from "../../service/BookingService";
import AuthService from "../../service/AuthService";
import CustomerService from "../../service/CustomerService";
import NightShelterIcon from '@mui/icons-material/NightShelter';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';
import {useStyles} from "../../styling/js-styling/QuestionsTableStyling";

const StatsBar = () => {
    const classes = useStyles();
    const [numberOfBookedNights, setNumberOfBookedNights] = useState(0)
    const [amountSpent, setAmountSpent] = useState(0);
    const [trips, setTrips] = useState(0);
    const [friends, setFriends] = useState(0);

    useEffect(() => {
        BookingService.getNumberOfBookedNights().then(res => setNumberOfBookedNights(res.data))
        BookingService.getAllByCustomerId(AuthService.getCurrentUser().id).then(res => {
            setTrips(res.data.length)
            res.data.forEach(booking => setAmountSpent(amountSpent + booking.price))
        })
        CustomerService.getFriends().then(res => setFriends(res.data.length))
    }, [])

    return (
        <div>
            <div className="row container d-flex justify-content-center" id="stats-container">
                <div className="col-xl-6 col-md-12" id="stats-second-container">
                    <div className="card user-card-full">
                        <div className="row m-l-0 m-r-0">
                            <h5 className="stats-header">Statistics</h5>
                            <br/>
                            <br/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <FlightTakeoffIcon style={{height: "50px", width: "50px"}} color="primary"/>
                                    <p className="m-b-10 f-w-600">TRIPS</p>
                                    <h6 className="text-muted f-w-400">{trips}</h6>
                                </div>

                                <div className="col-sm-3">
                                    <NightShelterIcon style={{height: "50px", width: "50px"}} color="primary" />
                                    <p className="m-b-10 f-w-600">NIGHTS BOOKED</p>
                                    <h6 className="text-muted f-w-400">{numberOfBookedNights}</h6>
                                </div>
                                <div className="col-sm-3">
                                    <MonetizationOnIcon style={{height: "50px", width: "50px"}} color="primary" />
                                    <p className="m-b-10 f-w-600">AMOUNT SPENT</p>
                                    <h6 className="text-muted f-w-400">${amountSpent}</h6>
                                </div>
                                <div className="col-sm-3">
                                    <GroupIcon color="primary" style={{height: "50px", width: "50px"}} />
                                    <p className="m-b-10 f-w-600">FRIENDS</p>
                                    <h6 className="text-muted f-w-400">{friends}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsBar;
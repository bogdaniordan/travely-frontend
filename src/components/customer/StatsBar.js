import React, {useEffect, useState} from 'react';
import BookingService from "../../service/BookingService";
import CustomerService from "../../service/CustomerService";
import NightShelterIcon from '@mui/icons-material/NightShelter';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';
import Button from "@material-ui/core/Button";
import AuthService from "../../service/AuthService";
import "../../styling/UserStyling.css"
import {useStyles} from "../../styling/js-styling/AuthStyles";

const StatsBar = ({userId}) => {
    const classes = useStyles();
    const [numberOfBookedNights, setNumberOfBookedNights] = useState(0)
    const [amountSpent, setAmountSpent] = useState(0);
    const [trips, setTrips] = useState(0);
    const [friends, setFriends] = useState(0);
    const [compare, setCompare] = useState(false);

    const [myNumberOfBookedNights, setMyNumberOfBookedNights] = useState(0)
    const [myAmountSpent, setMyAmountSpent] = useState(0);
    const [myTrips, setMyTrips] = useState(0);
    const [myFriends, setMyFriends] = useState(0);

    useEffect(() => {
        getOtherUserStats()
        getMyStats()
    }, [])

    const getOtherUserStats = () => {
        BookingService.getNumberOfBookedNights(userId).then(res => setNumberOfBookedNights(res.data))
        BookingService.getAllByCustomerId(userId).then(res => {
            setTrips(res.data.length)
            res.data.forEach(booking => setAmountSpent(amountSpent + booking.price))
        })
        CustomerService.getFriends(userId).then(res => setFriends(res.data.length))
    }

    const getMyStats = () => {
        BookingService.getNumberOfBookedNights(AuthService.getCurrentUser().id).then(res => setMyNumberOfBookedNights(res.data))
        BookingService.getAllByCustomerId(AuthService.getCurrentUser().id).then(res => {
            setMyTrips(res.data.length)
            res.data.forEach(booking => setMyAmountSpent(amountSpent + booking.price))
        })
        CustomerService.getFriends(AuthService.getCurrentUser().id).then(res => setMyFriends(res.data.length))
    }

    return (
        <div>
            <div className="row container d-flex justify-content-center" id="stats-container">
                <div className="col-xl-6 col-md-12" id="stats-second-container">
                    <div className="card user-card-full">
                        <div className="row m-l-0 m-r-0">
                            {
                                userId !== AuthService.getCurrentUser().id && (
                                    <div className="absolute">
                                        <Button variant="contained" color="primary" className={classes.compareBtn} onClick={() => setCompare(!compare)}>{compare ? "Hide comparison" : "Compare"}</Button>
                                    </div>
                                )
                            }
                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600" id="statistics-header">STATISTICS</h6>
                            <br/>
                            <br/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <FlightTakeoffIcon className={classes.statsIcon} color="primary"/>
                                    <p className="m-b-10 f-w-600">TRIPS</p>
                                    <h6 className="text-muted f-w-400">{trips} {compare &&
                                    (myTrips - trips >= 0 ? <span className="green-text">(+ {myTrips - trips})</span> : <span className="red-text">( - {myTrips - trips})</span>)}</h6>
                                </div>

                                <div className="col-sm-3">
                                    <NightShelterIcon className={classes.statsIcon} color="primary" />
                                    <p className="m-b-10 f-w-600">NIGHTS BOOKED</p>
                                    <h6 className="text-muted f-w-400">{numberOfBookedNights} {compare &&
                                    (myNumberOfBookedNights - numberOfBookedNights >= 0 ? <span className="green-text">(+ {myNumberOfBookedNights - numberOfBookedNights})</span> : <span className="red-text">( - {myNumberOfBookedNights - numberOfBookedNights})</span>)}</h6>
                                </div>
                                <div className="col-sm-3">
                                    <MonetizationOnIcon className={classes.statsIcon} color="primary" />
                                    <p className="m-b-10 f-w-600">AMOUNT SPENT</p>
                                    <h6 className="text-muted f-w-400">${amountSpent} {compare &&
                                    (myAmountSpent - amountSpent >= 0 ? <span className="green-text">(+ {myAmountSpent - amountSpent})</span > : <span className="red-text">(- {myAmountSpent - amountSpent})</span>)}</h6>
                                </div>
                                <div className="col-sm-3">
                                    <GroupIcon className={classes.statsIcon} />
                                    <p className="m-b-10 f-w-600">FRIENDS</p>
                                    <h6 className="text-muted f-w-400">{friends} {compare &&
                                    (myFriends - friends >= 0 ? <span className="green-text">(+ {myFriends - friends})</span> : <span className="red-text">( - {myFriends - friends})</span>)}</h6>
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
import React from 'react';
import {Paper} from "@material-ui/core";
import {useStyles} from "../../styling/js-styling/NavbarBadgeStyling";
import CarCard from "../cars/CarCard";
import DateRangeIcon from '@mui/icons-material/DateRange';
import moment from "moment";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import CarBookingService from "../../service/CarBookingService";

const CarBookingCard = ({carBooking, carBookings, setCarBookings}) => {
    const classes = useStyles();
    const dates = {
        startDate: carBooking.startDate,
        endDate: carBooking.endDate
    }

    const cancelBooking = () => {
        CarBookingService.cancelBooking(carBooking.id).then(res => setCarBookings(carBookings.filter(booking => booking.id !== carBooking.id)));
    }

    return (
        <div style={{display: "flex"}}>
            <CarCard car={carBooking.car} dates={dates} hideButton="hide"/>
            <Paper elevation={2} className={classes.bookingCardDetailsPaper}>
                <div style={{display: "block"}}>
                    <div style={{display: "flex", marginLeft: "30px", marginTop: "10px"}}>
                        <div style={{width: "35px", height: "35px", marginRight: "5px"}}>
                            <DateRangeIcon style={{width: "35px", height: "35px"}}/>
                        </div>
                        <p>{moment(dates.startDate).format("DD-MMM-YYYY")} <br/> {moment(dates.endDate).format("DD-MMM-YYYY")}</p>
                    </div>
                    <h5>{carBooking.gps ? <CheckCircleIcon color="success" /> : <DoNotDisturbOnIcon color="error"/>} GPS</h5>
                    <h5>{carBooking.babySeat} baby seat(s)</h5>
                    <h5 style={{marginBottom: "15px"}}>{carBooking.childSeat} child seat(s)</h5>
                    {
                        new Date(moment(dates.startDate).format("DD-MM-YYYY")) > new Date() ? (
                            <Button variant="contained" color="secondary" endIcon={<DeleteIcon />} onClick={cancelBooking}>Cancel</Button>
                        ) : (
                            carBooking.notes && (
                                carBooking.notes.length < 20 && (
                                    <p>Notes: {carBooking.notes}</p>
                                )
                            )
                        )
                    }
                </div>
            </Paper>
        </div>
    );
};

export default CarBookingCard;
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
        <div className="flexed-container">
            <CarCard car={carBooking.car} dates={dates} hideButton="hide"/>
            <Paper elevation={2} className={classes.bookingCardDetailsPaper}>
                <div className="column-div-container">
                    <div className="car-booking-dates-container">
                        <div className="car-calendar-icon-container">
                            <DateRangeIcon className={classes.dateRangeIcon} />
                        </div>
                        <p>{moment(dates.startDate).subtract(1, 'months').format("DD-MMM-YYYY")} <br/> {moment(dates.endDate).add(1, "days").subtract(1, 'months').format("DD-MMM-YYYY")}</p>
                    </div>
                    <h5>{carBooking.gps ? <CheckCircleIcon color="success" /> : <DoNotDisturbOnIcon color="error"/>} GPS</h5>
                    <h5>{carBooking.babySeat} baby seat(s)</h5>
                    <h5 className="child-seats">{carBooking.childSeat} child seat(s)</h5>
                    {
                        new Date(moment(dates.startDate).subtract(1, 'months').format("YYYY-MM-DD")) > new Date() ? (
                            <Button variant="contained" color="secondary" endIcon={<DeleteIcon />} onClick={cancelBooking}>Cancel</Button>
                        ) : (
                            carBooking.notes && (
                                carBooking.notes.length < 20 && (
                                    <Button variant="contained" disabled>Past booking</Button>
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
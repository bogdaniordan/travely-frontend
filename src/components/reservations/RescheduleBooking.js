import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import BookingService from "../../service/BookingService";
import {convertDates} from "../../utils/CityCoordinates";
import DateRange from "react-date-range/dist/components/DateRange";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";
import {getBookingDuration} from "../../utils/CityCoordinates";
import AccommodationService from "../../service/AccommodationService";
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Button from "@material-ui/core/Button";
import InfoIcon from '@mui/icons-material/Info';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const RescheduleBooking = (props) => {
    const history = useHistory();
    const bookingId = props.match.params.bookingId;
    const [showErrorMessage, setShowErrorMessage] = useState()
    const [disabledDates, setDisabledDates] = useState([])
    const [bookingDurationInDays, setBookingDurationInDays] = useState(0);
    const [accommodation, setAccommodation] = useState({});
    const [booking, setBooking] = useState({})
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);

    useEffect(() => {
        BookingService.getById(bookingId).then(res => {
            setBooking(res.data)
            AccommodationService.getById(res.data.accommodation.id).then(response => setAccommodation(response.data))
            getAlreadyBookedDates(res.data.accommodation.id);
            setBookingDurationInDays(getBookingDuration(res.data.checkInDate, res.data.checkoutDate))
        })
    }, [])

    const getAlreadyBookedDates = accommodationId => {
        BookingService.getBookedDatesForAccommodation(accommodationId).then(res => {
            setDisabledDates(convertDates(res.data))
        })
    }

    const reschedule = () => {
        if(!dates[0].endDate) {
            setShowErrorMessage(true)
        } else {
            if (getBookingDuration(dates[0].startDate, dates[0].endDate) !== bookingDurationInDays) {
                setShowErrorMessage(true)
            } else {
                BookingService.updateBookingDates(dates[0].startDate, dates[0].endDate, bookingId).then(
                    res => history.push(`/profile`)
                )
            }
        }
    }

    const cancelBooking = () => {
        BookingService.deleteBooking(bookingId).then(res => history.push("/profile"));
    }

    return (
        <div>
            <Navbar title="Reschedule booking"/>
            <div className="container">
                <Link to={`/profile`} style={{float: "left"}}>Back to profile</Link>
                <br/>
                <br/>
                <div className="card">
                    <div className="card-body">
                        <div className="reschedule-icons-container">
                            <LocalHotelIcon style={{width: "100px", height: "100px", margin: "auto"}}/>
                            <DateRangeIcon style={{width: "70px", height: "100px", margin: "auto"}}/>
                        </div>
                        <br/>
                        <h4 className="reschedule-header">Reschedule your future booking at {accommodation.title}, {accommodation.location}</h4>
                        <h5>Rescheduling fee: <span className="reschedule-fee">$50</span> <span className="green-text">FREE</span></h5>
                        <div className="card">
                            <div className="card-body">
                                <div className="flexed-container">
                                    <div className="reschedule-dates">
                                        <br/>
                                        <h5 className="reschedule-dates">Current booked dates:</h5>
                                        <br/>
                                        <p>Check-in: <strong>{moment(booking.checkInDate).format("DD-MMM-YYYY")}</strong></p>
                                        <p>Check-out: <strong>{moment(booking.checkInDate).add(1, "days").format("DD-MMM-YYYY")}</strong></p>
                                    </div>
                                    <div className="new-dates">
                                        <br/>
                                        <h5>New booking dates:</h5>
                                        <br/>
                                        {
                                            dates[0].endDate ? (
                                                <div className="orange">
                                                    <p>Check-in: <strong>{moment(dates[0].startDate).format("DD-MMM-YYYY")}</strong></p>
                                                    <p>Check-out: <strong>{moment(dates[0].endDate).add(1, "days").format("DD-MMM-YYYY")}</strong></p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p>None</p>
                                                    <p>None</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <br/>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                        <div className="reschedule-container">
                            <div>
                                <h5>Pick your dates</h5>
                                <small className="small-font">Booking <strong>needs</strong> to have the same duration as before: {bookingDurationInDays} days(s)</small>
                                <div className="reschedule-empty"></div>
                                <DateRange
                                    onChange={item => {
                                        setDates([item.selection])
                                        setShowErrorMessage(false)
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    disabledDates={disabledDates}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="reschedule-buttons">
                                    <img className="reschedule-img" src={`http://localhost:8080/accommodations/image/${accommodation.id}/firstImage/download`}  alt="property image"/>
                                        <div className="reschedule-inner-buttons">
                                            <Button variant="contained" color="primary" style={{marginRight: "5px"}} onClick={reschedule}>Reschedule</Button>
                                            <Button variant="contained" color="secondary" onClick={cancelBooking}>Cancel booking</Button>
                                        </div>
                                        <br/>
                                        <small className="small-font"><InfoIcon style={{color: "orange"}}/> Note: You won't receive your funds back if you cancel the booking.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {showErrorMessage && <h5 className="reschedule-error"><EventBusyIcon color="error"/> Choose a new date range with the same duration: {bookingDurationInDays} day(s).</h5>}
                    </div>
                </div>
            </div>
            <br/>
            <Footer />
        </div>
    );
};

export default RescheduleBooking;
import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import BookingService from "../../service/BookingService";
import {convertDates} from "../../utils/CityCoordinates";
import DateRange from "react-date-range/dist/components/DateRange";
import {Link} from "react-router-dom";
import moment from "moment";
import {getBookingDuration} from "../../utils/CityCoordinates";
import AccommodationService from "../../service/AccommodationService";
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Button from "@material-ui/core/Button";

const RescheduleBooking = (props) => {
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

    return (
        <div>
            <Navbar title="Reschedule booking"/>
            <div className="container">
                <Link to={`/profile`} style={{float: "left"}}>Back to profile</Link>
                <br/>
                <br/>
                <div className="card">
                    <div className="card-body">
                        <div style={{display: "flex", textAlign: "center", width: "100%"}}>
                            <LocalHotelIcon color="primary" style={{width: "100px", height: "100px", margin: "auto"}}/>
                            <DateRangeIcon style={{width: "70px", height: "100px", margin: "auto"}}/>
                        </div>

                        <h3 style={{marginBottom: "100px"}}>Reschedule your booking at {accommodation.title}</h3>
                        <div style={{display: "flex"}}>
                            <div>
                                <img style={{width: "400px", height: "350px", borderRadius: "10px"}} src={`http://localhost:8080/accommodations/image/${accommodation.id}/firstImage/download`}  alt="property image"/>
                                <h5 style={{marginTop: "5px"}}>Hosted by {booking.host.firstName} {booking.host.lastName}</h5>
                                <Button variant="contained" color="primary" style={{marginTop: "15px"}}>Reschedule</Button>
                            </div>
                            <div style={{width: "40%"}}>
                                <h5>Current booked dates:</h5>
                                <p>Check-in: {moment(booking.checkInDate).format("DD-MMM-YYYY")}</p>
                                <p>Check-out: {moment(booking.checkInDate).format("DD-MMM-YYYY")}</p>
                                <p>Hosted by {booking.host.firstName} {booking.host.lastName}</p>
                                <h5 style={{marginTop: "100px"}}>New booking dates:</h5>
                                {
                                    dates[0].endDate ? (
                                        <div style={{color: "orange"}}>
                                            <p>Check-in: {moment(dates[0].startDate).format("DD-MMM-YYYY")}</p>
                                            <p>Check-out: {moment(dates[0].endDate).format("DD-MMM-YYYY")}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p>None</p>
                                            <p>None</p>
                                        </div>
                                    )
                                }
                                <h4>Rescheduling fee: <span style={{textDecoration: "line-through"}}>$50</span> <span style={{color: "green"}}>FREE</span></h4>
                                {}
                                <h5 style={{color: "red", marginTop: "30px", padding: "5px", border: "1px solid red", borderRadius: "7px"}}>Try again! Choose a new date range with the same duration: {bookingDurationInDays} day(s).</h5>
                            </div>
                            <div>
                                <h5>Pick your dates</h5>
                                <p>Your booking <strong>needs</strong> to have the same duration as before: {bookingDurationInDays} days(s)</p>
                                <DateRange
                                    onChange={item => {
                                        setDates([item.selection])
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    disabledDates={disabledDates}
                                    minDate={new Date()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RescheduleBooking;
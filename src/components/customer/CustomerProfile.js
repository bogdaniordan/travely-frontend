import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import AuthService from "../../service/AuthService";
import ProfileCard from "./ProfileCard";
import BookingService from "../../service/BookingService";
import CustomerBooking from "./CustomerBooking";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import {Collapse} from "@material-ui/core";
import CarBookingService from "../../service/CarBookingService";
import CarBookingCard from "../reservations/CarBookingCard";
import moment from "moment";

const CustomerProfile = () => {
    const [bookings, setBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [showPastBookings, setShowPastBookings] = useState(false);
    const [carBookings, setCarBookings] = useState([]);

    useEffect(() => {
        BookingService.getAllByCustomerId(AuthService.getCurrentUser().id).then(response => {
            setBookings(response.data.filter(booking => new Date(moment(booking.checkoutDate).format("YYYY-MM-DD")) >= new Date()).reverse());
            setPastBookings(response.data.filter(booking => new Date(moment(booking.checkoutDate).format("YYYY-MM-DD")) < new Date()))
        })
        getCarBookings();
    }, [])

    const getCarBookings = () => {
        CarBookingService.getAllByCustomer().then(response => setCarBookings(response.data));
    }

    return (
        <div>
            <Navbar title={"User profile"} subtitle={"View profile information or view bookings"}/>
                <div className="container">
                    {/*<div className="card">*/}
                    {/*    <div className="card-body">*/}
                    {/*        <br/>*/}
                            <h4>View and update your profile, check your current statistics or manage all of yours bookings</h4>
                            <ProfileCard/>
                        {/*</div>*/}
                    {/*</div>*/}

                    {
                        carBookings.length > 0 && (
                            <div className="card">
                                <div className="card-body">
                                    <br/>
                                    <h4>Car rentals</h4>
                                    <div>
                                        {
                                            carBookings.map(
                                                carBooking => <CarBookingCard carBooking={carBooking} carBookings={carBookings} setCarBookings={setCarBookings}/>
                                            )
                                        }
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="card">
                        <div className="card-body">
                            <div className="container mt-5">
                                {/*<hr className="mb-4"/>*/}
                                <section>
                                    {
                                        bookings.length > 0 ? (
                                            <div className="container py-2">
                                                <h4>Current and future bookings</h4>
                                                <br/>
                                                {
                                                    bookings.map(
                                                        booking => <CustomerBooking key={booking.id} booking={booking} bookings={bookings} setBookings={setBookings}/>
                                                    )
                                                }
                                            </div>
                                        ) : (<h4>No current bookings</h4>)
                                    }
                                    {/*{*/}
                                    {/*    pastBookings.length > 0 && (*/}
                                    {/*        <div className="container py-2">*/}
                                    {/*            <h4>Past bookings</h4>*/}
                                    {/*            <br/>*/}
                                    {/*            {*/}
                                    {/*                pastBookings.map(*/}
                                    {/*                    booking => <CustomerBooking key={booking.id} booking={booking} bookings={bookings} setBookings={setBookings}/>*/}
                                    {/*                )*/}
                                    {/*            }*/}
                                    {/*        </div>*/}
                                    {/*    )*/}
                                    {/*}*/}
                                </section>
                                {
                                    pastBookings.length > 0 && <Button variant="contained" color="primary" onClick={() => setShowPastBookings(!showPastBookings)}>{showPastBookings ? "Hide past bookings" : "Past bookings"}</Button>
                                }
                                <Collapse in={showPastBookings}>
                                    <div className="container py-2">
                                        {/*<h4>Past bookings</h4>*/}
                                        <br/>
                                        {
                                            pastBookings.map(
                                                booking => <CustomerBooking key={booking.id} booking={booking} bookings={bookings} setBookings={setBookings}/>
                                            )
                                        }
                                    </div>
                                </Collapse>
                                {/*<hr className="mb-4"/>*/}
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    );
};

export default CustomerProfile;
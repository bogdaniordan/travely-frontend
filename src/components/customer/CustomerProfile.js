import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import AuthService from "../../service/AuthService";
import ProfileCard from "./ProfileCard";
import BookingService from "../../service/BookingService";
import CustomerBooking from "./CustomerBooking";
import Footer from "../navigation/Footer";

const CustomerProfile = () => {
    const [bookings, setBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);

    useEffect(() => {
        BookingService.getAllByCustomerId(AuthService.getCurrentUser().id).then(response => {
            setBookings(response.data.filter(booking => new Date(getFormattedDate(booking.checkoutDate)) >= new Date()));
            setPastBookings(response.data.filter(booking => new Date(getFormattedDate(booking.checkoutDate)) < new Date()))
        })
    }, [])

    const getFormattedDate = (date) => {
        return date[0] + "-" + date[1] + "-" + date[2]
    }

    return (
        <div>
            <Navbar title={"User profile"} subtitle={"View profile information or view bookings"}/>
                <ProfileCard/>
                <div className="container mt-5">
                    <hr className="mb-4"/>
                    <section>
                        {
                            bookings.length > 0 && (
                                <div className="container py-2">
                                    <h4>Current and future bookings</h4>
                                    <br/>
                                    {
                                        bookings.map(
                                            booking => <CustomerBooking key={booking.id} booking={booking} bookings={bookings} setBookings={setBookings}/>
                                        )
                                    }
                                </div>
                            )
                        }

                        {
                            pastBookings.length > 0 && (
                                <div className="container py-2">
                                    <h4>Past bookings</h4>
                                    <br/>
                                    {
                                        pastBookings.map(
                                            booking => <CustomerBooking key={booking.id} booking={booking} bookings={bookings} setBookings={setBookings}/>
                                        )
                                    }
                                </div>
                            )
                        }
                    </section>
                    <hr className="mb-4"/>
                </div>
            <Footer />
        </div>
    );
};

export default CustomerProfile;
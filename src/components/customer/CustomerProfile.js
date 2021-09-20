import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import AuthService from "../../service/AuthService";
import ProfileCard from "./ProfileCard";
import BookingService from "../../service/BookingService";
import CustomerBooking from "./CustomerBooking";
import Footer from "../navigation/Footer";

const CustomerProfile = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        BookingService.getAllByCustomerId(AuthService.getCurrentUser().id).then(response => setBookings(response.data))
    }, [])

        return (
            <div>
                <Navbar title={"User profile"} subtitle={"View profile information or view bookings"}/>
                    <ProfileCard/>
                    <div className="container mt-5">
                        {/*<h5>My bookings</h5>*/}
                        <hr className="mb-4"/>
                        <section>
                            <div className="container py-2">
                                {/*<div className="h1 text-center text-dark" id="pageHeaderTitle">My bookings</div>*/}
                                <h4>My bookings</h4>
                                <br/>
                                {
                                    bookings.length > 0 ? (
                                        bookings.map(
                                            booking => <CustomerBooking key={booking.id} booking={booking} bookings={bookings} setBookings={setBookings}/>
                                        )
                                    ) : (
                                        <h4 style={{margin: "auto"}}>No bookings at the moment.</h4>
                                    )
                                }
                            </div>
                        </section>
                        <hr className="mb-4"/>
                    </div>
                <Footer />
            </div>
        );
};

export default CustomerProfile;
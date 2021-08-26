import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import Button from "@material-ui/core/Button";
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
                <Navbar />
                {/*<div className="page-content page-container" id="page-content">*/}
                    <ProfileCard/>
                    <div className="container mt-5">
                        <h5>My bookings</h5>
                        <hr className="mb-4"/>

                        <div className="row">
                            {
                                bookings.map(
                                    booking => <CustomerBooking key={booking.id} booking={booking} />
                                )
                            }
                        </div>
                        <hr className="mb-4"/>

                    </div>
                {/*</div>*/}
                <Footer />

            </div>
        );
};

export default CustomerProfile;
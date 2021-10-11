import React, {useEffect} from 'react';
import "../../styling/SuccesfulPaymentStyling.css"
import Navbar from "../navigation/Navbar";
import Button from "@material-ui/core/Button";
import {useHistory, useLocation} from "react-router-dom";
import moment from "moment";

const SuccessfulPayment = () => {
    const history = useHistory();
    const location = useLocation();
    const booking = location.state.booking;

    useEffect(() => {
        console.log(booking.checkInDate)
        console.log(moment(booking.checkInDate).subtract(1, 'months').format("DD-MM-YYYY"))
        console.log(moment(booking.checkoutDate).subtract(1, 'months').format("DD-MM-YYYY"))
    })

    return (
        <body className="payment-success-body">
            <Navbar title="Congratulations" />
            <div className="payment-success-card">
                <div className="payment-success-container">
                    <i id="success-checkmark" className="checkmark">✓</i>
                </div>
                <h1 className="payment-success-header">Thank you</h1>
                <br/>
                <p className="payment-success-message">Your payment for <strong>{booking.accommodation.title}</strong> has been made successfully!
                    <br/> Check-in: <strong>{moment(booking.checkInDate).subtract(1, 'months').format("DD-MM-YYYY")}</strong> / Check-out: <strong>{moment(booking.checkoutDate).subtract(1, 'months').format("DD-MM-YYYY")}</strong>.
                    <br/><br/>  You can view your bookings in your profile page. <br/>
                <Button variant="contained" color="primary" onClick={() => history.push("/profile")} style={{marginTop: "25px"}}>Go to profile</Button>
                </p>
            </div>
        </body>
    );
};

export default SuccessfulPayment;
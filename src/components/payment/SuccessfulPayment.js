import React from 'react';
import "../../styling/SuccesfulPaymentStyling.css"
import Navbar from "../navigation/Navbar";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const SuccessfulPayment = () => {
    const history = useHistory();

    return (
        <body className="payment-success-body">
            <Navbar title="Congratulations" />
            <div className="payment-success-card">
                <div className="payment-success-container">
                    <i id="success-checkmark" className="checkmark">✓</i>
                </div>
                <h1 className="payment-success-header">Success</h1>
                <p className="payment-success-message">Your payment has been made successfully!<br/> You can view your bookings in your profile page.<br/>
                <Button variant="contained" color="primary" onClick={() => history.push("/home")} style={{marginTop: "25px"}}>Go to profile</Button>
                </p>
            </div>
        </body>
    );
};

export default SuccessfulPayment;
import React from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Navbar from "../navigation/Navbar";
import moment from "moment";
import Button from "@material-ui/core/Button";
import {useStyles} from "../../styling/js-styling/QuestionsTableStyling";

const SuccessfulCarPayment = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    return (
        <body className="payment-success-body">
        <Navbar title="Congratulations" />
        <div className="payment-success-card">
            <div className="payment-success-container">
                {/*<i id="success-checkmark" className="checkmark">✓</i>*/}
                <img src={`http://localhost:8080/cars/image/${location.state.car.id}/download`} className={classes.carAvatar} alt="car-img"/>
            </div>
            <h1 className="payment-success-header">Thank you!</h1>
            <br/>
            <p className="payment-success-message">Your payment for <strong>{location.state.car.model}</strong> for <strong>${location.state.totalPrice}</strong> has been made successfully!
                <br/> Pick-up date: <strong>{moment(location.state.dates.startDate).subtract(1, 'months').format("DD-MM-YY")}</strong> / Drop off date: <strong>{moment(location.state.dates.endDate).add(1, "days").subtract(1, 'months').format("DD-MM-YY")}</strong>.
                <br/><br/>  You can view you car rentals at your profile page. <br/>
                <Button variant="contained" color="primary" onClick={() => history.push("/profile")} className={classes.gotToProfileButton}>Go to profile</Button>
            </p>
        </div>
        </body>
    );
};

export default SuccessfulCarPayment;
import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import {useLocation} from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchResults from "../search/SearchResults"
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";


const Payment = () => {
    const booking = useLocation().state.booking;
    const accommodation = useLocation().state.accommodation;
    const [isLoading, setIsLoading] = useState(true);
    const [customer, setCustomer] = useState();
    const [bookingDurationInDays, setBookingDurationInDays] = useState();

    useEffect(() => {
        setBookingDuration()
        getCustomer();
    }, [])

    const setBookingDuration = () => {
        const arriveDate = new Date(booking.checkInDate);
        const leavingDate = new Date(booking.checkoutDate);
        const differenceInTime = leavingDate.getTime() - arriveDate.getTime();
        setBookingDurationInDays(differenceInTime / (1000 * 3600 * 24))
    }

    const getCustomer = () => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(
            response => {
                setCustomer(response.data);
                setIsLoading(false);
            }
        )
    }

    if (!isLoading) {
        return (
            <>
                <Navbar />
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your booking</span>
                                <span className="badge badge-secondary badge-pill">3</span>
                            </h4>
                            <ul className="list-group mb-3">
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">Booking for {accommodation.title}</h6>
                                        <small className="text-muted">Location: {accommodation.location}</small>
                                        <br/>
                                        <small className="text-muted">Type: {accommodation.placeType}</small>
                                        <br/>
                                        <small className="text-muted">Check-in: {booking.checkInDate}</small>
                                        <br/>
                                        <small className="text-muted">Checkout: {booking.checkoutDate}</small>
                                        <br/>
                                        <small className="text-muted">{bookingDurationInDays} nights</small>
                                    </div>
                                    <span className="text-muted">${accommodation.pricePerNight}/night</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>${bookingDurationInDays * accommodation.pricePerNight}</strong>
                                </li>
                            </ul>
                            <SearchResults places={[accommodation]}/>
                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Billing address</h4>
                            <form className="needs-validation" noValidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <input type="text" className="form-control" id="firstName" placeholder="" value=""
                                               required/>
                                        <div className="invalid-feedback">
                                            Valid first name is required.
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last name</label>
                                        <input type="text" className="form-control" id="lastName" placeholder="" value=""
                                               required/>
                                        <div className="invalid-feedback">
                                            Valid last name is required.
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username">Username</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">@</span>
                                        </div>
                                        <input type="text" className="form-control" id="username" placeholder="Username"
                                               required/>
                                        <div className="invalid-feedback" style={{width: "100%"}}>
                                            Your username is required.
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" required/>
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" className="form-control" id="address" placeholder="1234 Main St"
                                           required/>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>
                                <hr className="mb-4"/>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="save-info"/>
                                    <label className="custom-control-label" htmlFor="save-info">Save credit
                                        card details for next time</label>
                                </div>
                                <hr className="mb-4"/>

                                <h4 className="mb-3">Payment</h4>

                                <div className="d-block my-3">
                                    <div className="custom-control custom-radio">
                                        <input id="credit" name="paymentMethod" type="radio"
                                               className="custom-control-input" checked required/>
                                        <label className="custom-control-label" htmlFor="credit">Credit
                                            card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="debit" name="paymentMethod" type="radio"
                                               className="custom-control-input" required/>
                                        <label className="custom-control-label" htmlFor="debit">Debit
                                            card</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input id="paypal" name="paymentMethod" type="radio"
                                               className="custom-control-input" required/>
                                        <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-name">Name on card</label>
                                        <input type="text" className="form-control" id="cc-name" placeholder=""
                                               required/>
                                        <small className="text-muted">Full name as displayed on card</small>
                                        <div className="invalid-feedback">
                                            Name on card is required
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-number">Credit card number</label>
                                        <input type="text" className="form-control" id="cc-number" placeholder=""
                                               required/>
                                        <div className="invalid-feedback">
                                            Credit card number is required
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-expiration">Expiration</label>
                                        <input type="text" className="form-control" id="cc-expiration"
                                               placeholder="" required/>
                                        <div className="invalid-feedback">
                                            Expiration date required
                                        </div>
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-expiration">CVV</label>
                                        <input type="text" className="form-control" id="cc-cvv" placeholder=""
                                               required/>
                                        <div className="invalid-feedback">
                                            Security code required
                                        </div>
                                    </div>
                                </div>
                                <hr className="mb-4"/>
                                <Button variant="contained" color="primary" type="submit">Book</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return(
            <h3>Loading...</h3>
        )
    }

};

export default Payment;
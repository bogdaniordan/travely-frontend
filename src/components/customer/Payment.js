import React, {useEffect, useState, useRef} from 'react';
import Navbar from "../navigation/Navbar";
import {useLocation} from "react-router-dom";
import Button from "@material-ui/core/Button";
import SearchResults from "../search/SearchResults"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {required, nameValidation, validEmail, validCardName, validCreditCardNumber, validExpirationDate, validCVV} from "../auth/validations/Validations"
import BookingService from "../../service/BookingService";

const Payment = () => {
    const booking = useLocation().state.booking;
    const accommodation = useLocation().state.accommodation;
    const customer = useLocation().state.customer;
    const form = useRef();
    const checkBtn = useRef();

    const [bookingDurationInDays, setBookingDurationInDays] = useState();
    const [saveCardDetails, setSaveCardDetails] = useState(false);
    const [firstName, setFirstName] = useState(customer.firstName);
    const [lastName, setLastName] = useState(customer.lastName);
    const [email, setEmail] = useState(customer.email);
    const [address, setAddress] = useState(customer.address);
    const [nameOnCard, setNameOnCard] = useState(customer.cardDetails ? customer.cardName : "");
    const [cardNumber, setCardNumber] = useState(customer.cardDetails ? customer.cardNumber: "");
    const [expirationDate, setExpirationDate] = useState(customer.cardDetails ? customer.expirationDate : "");
    const [cvv, setCvv] = useState(customer.cardDetails ? customer.CVV : "");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeFirstName = event => {
        setFirstName(event.target.value)
    }

    const onChangeLastName = event => {
        setLastName(event.target.value)
    }

    const onChangeEmail = event => {
        setEmail(event.target.value)
    }

    const onChangeAddress = event => {
        setAddress(event.target.value)
    }

    const onChangeNameOnCard = event => {
        setNameOnCard(event.target.value)
    }

    const onChangeCardNumber = event => {
        setCardNumber(event.target.value)
    }

    const onChangeExpirationDate = event => {
        setExpirationDate(event.target.value)
    }

    const onChangeCvv = event => {
        setCvv(event.target.value)
    }

    useEffect(() => {
        // console.log(customer)
        setBookingDuration()
    }, [])

    const setBookingDuration = () => {
        const arriveDate = new Date(booking.checkInDate);
        const leavingDate = new Date(booking.checkoutDate);
        const differenceInTime = leavingDate.getTime() - arriveDate.getTime();
        setBookingDurationInDays(differenceInTime / (1000 * 3600 * 24))
    }

    const saveCustomerCardDetails = () => {

    }


    const submitForm = e => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            BookingService.saveBooking(booking, accommodation.host.id, customer.id, accommodation)
                .then(
                    response => {
                            setMessage("You're booking was successful.")
                            setSuccessful(true);
                        },
                        error => {
                            setMessage("Something went wrong with your payment or billing details.")
                            setSuccessful(true);
                        })

        }
    }

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
                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <Form className="needs-validation" onSubmit={submitForm} ref={form}>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="firstName">First name</label>
                                        <Input
                                               type="text"
                                               className="form-control"
                                               value={firstName}
                                               onChange={onChangeFirstName}
                                               validations={[required, nameValidation]}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName">Last name</label>
                                        <Input
                                               type="text"
                                               className="form-control"
                                               value={lastName}
                                               onChange={onChangeLastName}
                                               validations={[required, nameValidation]}
                                        />

                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={onChangeEmail}
                                        validations={[required, validEmail]}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address">Address</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        value={address}
                                        onChange={onChangeAddress}
                                        validations={[required]}
                                    />
                                </div>
                                <hr className="mb-4"/>

                                <h4 className="mb-3">Payment</h4>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-name">Name on card</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={nameOnCard}
                                            onChange={onChangeNameOnCard}
                                            validations={[required, validCardName]}
                                        />
                                        <small className="text-muted">Full name as displayed on card</small>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="cc-number">Credit card number</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="#### #### #### ####"
                                            value={cardNumber}
                                            onChange={onChangeCardNumber}
                                            validations={[required, validCreditCardNumber]}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-expiration">Expiration</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            value={expirationDate}
                                            onChange={onChangeExpirationDate}
                                            placeholder="12/22"
                                            validations={[required, validExpirationDate]}
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <label htmlFor="cc-expiration">CVV</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="236"
                                            value={cvv}
                                            onChange={onChangeCvv}
                                            validations={[required, validCVV]}
                                        />
                                    </div>
                                </div>

                                <hr className="mb-4"/>

                                <div className="form-check">
                                    <Input type="checkbox" className="form-check-input" id="same-address" onChange={() => setSaveCardDetails(!saveCardDetails)}/>
                                    <label className="form-check-label" htmlFor="same-address">Save credit card details</label>
                                </div>
                                <hr className="mb-4"/>
                                <Button variant="contained" color="primary" type="submit">Book</Button>
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            </Form>
                        </div>
                    </div>
                </div>
            </>
        );

};

export default Payment;
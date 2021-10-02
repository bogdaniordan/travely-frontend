import React from 'react';
import AccommodationCard from "../accommodation/AccommodationCard";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {
    nameValidation,
    required,
    validCardName,
    validCreditCardNumber, validCVV,
    validEmail,
    validExpirationDate
} from "../../utils/Validations";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import StripeCheckout from "react-stripe-checkout";
import CustomerService from "../../service/CustomerService";
import {useHistory} from "react-router-dom";
import BookingService from "../../service/BookingService";
import AuthService from "../../service/AuthService";
import moment from "moment";

const PaymentForm = ({accommodation, booking, bookingDurationInDays, submitForm, form, firstName, onChangeFirstName, lastName ,onChangeLastName, email, onChangeEmail, address, onChangeAddress, nameOnCard, onChangeNameOnCard, cardNumber, onChangeCardNumber,
                     expirationDate, onChangeExpirationDate, cvv, onChangeCvv, setSaveCardDetails, saveCardDetails, checkBtn, cardDetailsExist}) => {
    const history = useHistory();

    const convertedBooking = {
        checkInDate: moment(booking.checkInDate).format("YYYY-MM-DD"),
        checkoutDate: moment(booking.checkoutDate).format("YYYY-MM-DD")
    }

    const handleToken = (token) => {
        const amount = bookingDurationInDays * accommodation.pricePerNight;
        CustomerService.payWithStripe(token, amount).then(
            res => {
                BookingService.saveBooking(convertedBooking, accommodation.host.id, AuthService.getCurrentUser().id, accommodation.id)
                    .then(response => history.push({
                        pathname: "/success-payment",
                        state: {booking: response.data}
                    }))
            },
            error => console.error(error)
        )
    }

    return (
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
                                <small className="text-muted">Check-in: {moment(booking.checkInDate).format("DD-MM-YYYY")}</small>
                                <br/>
                                <small className="text-muted">Checkout: {moment(booking.checkoutDate).format("DD-MMMM-YYYY")}</small>
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
                    <AccommodationCard place={accommodation}/>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Billing address</h4>
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
                                <small className="text-muted">3 digits</small>
                            </div>
                        </div>

                        <hr className="mb-4"/>
                        {
                            !cardDetailsExist && (
                                <div className="form-check">
                                    <Input type="checkbox" className="form-check-input" id="same-address" onChange={() => {setSaveCardDetails(!saveCardDetails)}}/>
                                    <label className="form-check-label" htmlFor="same-address">Save credit card details</label>
                                </div>
                            )
                        }
                        <hr className="mb-4"/>
                        <Button variant="contained" color="primary" type="submit" style={{marginRight: "10px"}}>PAY</Button>
                        <StripeCheckout
                            stripeKey="pk_test_51JediMF8Clxej3cvDhlrQQrHdpK2xvTsIhFgdI1nAZEJPQ4ciYaRSMZjhrLMjP9nO6E07mGqQsuc74FUI4sjbRX9004hVSsslc"
                            token={handleToken}
                            billingAddress
                            image={`http://localhost:8080/accommodations/image/${accommodation.id}/firstImage/download`}
                            amount={bookingDurationInDays * accommodation.pricePerNight * 100}
                            name={accommodation.title}
                            description="Enter your details for Stripe payment"
                        >
                            <Button color="secondary" variant="contained">PAY WITH STRIPE</Button>
                        </StripeCheckout>

                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
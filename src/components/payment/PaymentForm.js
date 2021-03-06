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
import { Link } from "react-router-dom";

const PaymentForm = ({accommodation, booking, bookingDurationInDays, submitForm, form, firstName, onChangeFirstName, lastName ,onChangeLastName, email, onChangeEmail, address, onChangeAddress, nameOnCard, onChangeNameOnCard, cardNumber, onChangeCardNumber,
                     expirationDate, onChangeExpirationDate, cvv, onChangeCvv, setSaveCardDetails, saveCardDetails, checkBtn, cardDetailsExist}) => {
    const history = useHistory();
    const bookingPrice = bookingDurationInDays * accommodation.pricePerNight;

    const convertedBooking = {
        checkInDate: moment(booking.checkInDate).format("YYYY-MM-DD"),
        checkoutDate: moment(booking.checkoutDate).format("YYYY-MM-DD"),
        price: bookingPrice
    }

    const handleToken = (token) => {
        CustomerService.payWithStripe(token, bookingPrice).then(
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
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div className="text-aligned-left">
                                <h6 className="my-0">Booking for {accommodation.title}</h6>
                                <small className="text-muted">Location: {accommodation.location}</small>
                                <br/>
                                <small className="text-muted">Type: {accommodation.placeType}</small>
                                <br/>
                                <small className="text-muted">Check-in: {moment(booking.checkInDate).format("DD-MMMM-YYYY")}</small>
                                <br/>
                                <small className="text-muted">Checkout: {moment(booking.checkoutDate).add(1, "days").format("DD-MMMM-YYYY")}</small>
                                <br/>
                                <small className="text-muted">{bookingDurationInDays} nights</small>
                            </div>
                            <span className="text-muted"><strong>${accommodation.pricePerNight}/night</strong></span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${bookingDurationInDays * accommodation.pricePerNight}</strong>
                        </li>
                    </ul>
                    <AccommodationCard place={accommodation} showPicture={"yes"}/>
                </div>
                <div className="col-md-8 order-md-1">
                    <Link to={`/accommodation/${accommodation.id}`} style={{float: "left"}}>Back to accommodation</Link>
                    <br/>
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

                        <h4 className="mb-3">Credit card details</h4>
                        <p>Pay by using your own credit or debit card, or by using the Stripe payment service.</p>
                        <br/>
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
                        {
                            !cardDetailsExist && (
                                <div>
                                    <hr className="mb-4"/>
                                    <div className="form-check">
                                        <div className="save-card-details-container">
                                            <Input type="checkbox" className="form-check-input" id="same-address" onChange={() => {setSaveCardDetails(!saveCardDetails)}}/>
                                            <label className="form-check-label" htmlFor="same-address">Save credit card details</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <hr className="mb-4"/>
                        <Button variant="contained" color="primary" type="submit" style={{marginRight: "10px"}}>REGULAR PAY</Button>
                        <StripeCheckout
                            stripeKey="pk_test_51JediMF8Clxej3cvDhlrQQrHdpK2xvTsIhFgdI1nAZEJPQ4ciYaRSMZjhrLMjP9nO6E07mGqQsuc74FUI4sjbRX9004hVSsslc"
                            token={handleToken}
                            billingAddress
                            image={`http://localhost:8080/accommodations/image/${accommodation.id}/firstImage/download`}
                            amount={bookingDurationInDays * accommodation.pricePerNight * 100}
                            name={accommodation.title}
                            description="Enter your details for Stripe payment"
                        >
                            <Button color="secondary" variant="contained">STRIPE PAYMENT</Button>
                        </StripeCheckout>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
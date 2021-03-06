import React, {useEffect, useState, useRef} from 'react';
import Navbar from "../navigation/Navbar";
import {useHistory, useLocation} from "react-router-dom";
import BookingService from "../../service/BookingService";
import CustomerService from "../../service/CustomerService";
import PaymentForm from "./PaymentForm";
import Footer from "../navigation/Footer";
import AuthService from "../../service/AuthService";
import moment from "moment";
import {getBookingDuration} from "../../utils/CityCoordinates";

const Payment = () => {
    const booking = useLocation().state.booking;
    const accommodation = useLocation().state.accommodation;
    const customer = useLocation().state.customer;
    const form = useRef();
    const checkBtn = useRef();
    const history = useHistory();

    const [cardDetailsExist, setCardDetailsExist] = useState(false);
    const [bookingDurationInDays, setBookingDurationInDays] = useState();
    const [saveCardDetails, setSaveCardDetails] = useState(false);
    const [firstName, setFirstName] = useState(customer.firstName);
    const [lastName, setLastName] = useState(customer.lastName);
    const [email, setEmail] = useState(customer.email);
    const [address, setAddress] = useState(customer.address);
    const [nameOnCard, setNameOnCard] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [expirationDate, setExpirationDate] = useState();
    const [cvv, setCvv] = useState();
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
        setBookingDurationInDays(getBookingDuration(booking.checkInDate, booking.checkoutDate))
        setCardDetailsIfSaved();
        CustomerService.cardDetailsExist(AuthService.getCurrentUser().id).then(res => setCardDetailsExist(res.data))
    }, [])


    const setCardDetailsIfSaved = () => {
        if (customer.cardDetails) {
            setNameOnCard(customer.cardDetails.cardName);
            setCardNumber(customer.cardDetails.cardNumber);
            setExpirationDate(customer.cardDetails.expirationDate);
            setCvv(customer.cardDetails.cvv)
        }
    }

    const saveCustomerCardDetails = () => {
        if (saveCardDetails) {
            CustomerService.saveCardDetails(nameOnCard, cardNumber, expirationDate, cvv, customer.id).then(
                res => {},
                error => {
                    setMessage("Something went wrong with the payment.")
                    setSuccessful(false);
                })
        }
    }

    const submitForm = e => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        booking.checkInDate = moment(booking.checkInDate).format("YYYY-MM-DD");
        booking.checkoutDate = moment(booking.checkoutDate).format("YYYY-MM-DD");
        booking.price = bookingDurationInDays * accommodation.pricePerNight;
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            BookingService.saveBooking(booking, accommodation.host.id, customer.id, accommodation.id)
                .then(
                    response => {
                            saveCustomerCardDetails();
                            history.push({
                                pathname: "/success-payment",
                                state: {booking: response.data}
                            })
                        },
                        error => {
                            setMessage("Something went wrong with the billing details.")
                            setSuccessful(false);
                        })

        }
    }

    return (
        <>
            <Navbar title={"Payment"} subtitle={"Please fill in your billing address along with your payment info."}/>
            <br/>
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
            <PaymentForm
                accommodation={accommodation}
                booking={booking}
                bookingDurationInDays={bookingDurationInDays}
                submitForm={submitForm}
                form={form}
                firstName={firstName}
                onChangeFirstName={onChangeFirstName}
                lastName={lastName}
                onChangeLastName={onChangeLastName}
                email={email}
                onChangeEmail={onChangeEmail}
                address={address}
                onChangeAddress={onChangeAddress}
                cardNumber={cardNumber}
                onChangeCardNumber={onChangeCardNumber}
                nameOnCard={nameOnCard}
                onChangeNameOnCard={onChangeNameOnCard}
                expirationDate={expirationDate}
                onChangeExpirationDate={onChangeExpirationDate}
                cvv={cvv}
                onChangeCvv={onChangeCvv}
                setSaveCardDetails={setSaveCardDetails}
                saveCardDetails={saveCardDetails}
                checkBtn={checkBtn}
                cardDetailsExist={cardDetailsExist}
            />
            <Footer />
        </>
    );
};

export default Payment;
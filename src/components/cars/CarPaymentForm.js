import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";
import InfoIcon from "@mui/icons-material/Info";
import {useStyles} from "../../styling/js-styling/QuestionsTableStyling";
import {useForm} from "react-hook-form";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import CarBookingService from "../../service/CarBookingService";
import {useHistory} from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const CarPaymentForm = ({totalPrice, notes, dates, childSeatNumber, babySeatNumber, gps, car}) => {
    const classes = useStyles();
    const history = useHistory();

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(res => {
            let customer = res.data;
            if(customer.cardDetails) {
                customer.cvv = res.data.cardDetails.cvv;
                customer.expirationDate = res.data.cardDetails.expirationDate;
                customer.cardNumber = res.data.cardDetails.cardNumber;
                customer.cardName = res.data.cardDetails.cardName
            }
            reset(customer);
        })
    },[reset])

    const redirectToPaidPage = () => {
        history.push({
            pathname: "/successful-car-booking",
            state: {
                car: car,
                dates: dates,
                totalPrice: totalPrice
            }})
    }

    const handleToken = () => {
        CarBookingService.saveCarBooking(car.id, dates.startDate, dates.endDate, childSeatNumber, babySeatNumber, gps, totalPrice, notes)
            .then(res => redirectToPaidPage())
    }

    return (
        <div className="row">
            <div className="card">
                <form onSubmit={
                    handleSubmit(() => {
                        CarBookingService.saveCarBooking(car.id, dates.startDate, dates.endDate, childSeatNumber, babySeatNumber, gps, totalPrice, notes)
                            .then(res => redirectToPaidPage())})
                }>
                    <div className="card-body">
                        <h5>Payment</h5>
                        <p><InfoIcon className={classes.infoIcon}/> Please note: Your own car insurance does not cover hire cars.</p>
                        <h5>Billing address </h5>
                        <br/>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("firstName", {required: true, minLength: 3})}
                                />
                                {errors.firstName && <span className="error-red">This field needs at least 3 characters.</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("lastName", {required: true, minLength: 3})}
                                />
                                {errors.lastName && <span className="error-red">This field needs at least 3 characters.</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("email", {required: true,  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                                />
                                <small className="text-muted" id="card-info">You will not receive any marketing materials.</small>
                                {errors.phoneNumber && <span className="error-red">Please enter a valid phone number!</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("address", {required: true , minLength: 10, maxLength: 40})}
                                />
                                {errors.address && <span className="error-red">Enter a valid address!</span>}
                            </div>
                        </div>
                        <br/>
                        <hr className="mb-4"/>
                        <br/>
                        <h5>Credit card details</h5>
                        <br/>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Card name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("cardName", {required: true, minLength: 5})}
                                />
                                {errors.cardName && <p className="error-red">Enter a valid card name!</p>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Card number</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("cardNumber", {required: true, pattern: /^4[0-9]{12}(?:[0-9]{3})?$/})}
                                />
                                {errors.cardNumber && <p className="error-red">Enter a valid card number!</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3" id="flexed">
                                <div className="expiration-date-container">
                                    <label htmlFor="firstName">Expiration date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("expirationDate", {required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/})}
                                    />
                                    {errors.expirationDate && <p className="error-red">Enter a valid expiration date!</p>}
                                    <small className="text-muted" id="card-info">Month/year</small>
                                </div>
                                <div className="cvv-container">
                                    <label htmlFor="firstName" className="centered-middle">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("cvv", {required: true, minLength: 3, maxLength: 3})}
                                    />
                                    {errors.cvv && <p className="error-red">Enter a valid CVV!</p>}
                                    <small className="text-muted" id="card-info">Digits on the back of the card</small>
                                </div>

                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="total-price-container">
                                    <h3 className="total-price">TOTAL ${totalPrice}</h3>
                                    <div className="right-container">
                                        <Button type="submit" variant="contained" color="primary" style={{marginLeft: "20px", marginTop: "25px", marginRight: "10px"}}>REGULAR PAY</Button>
                                        <StripeCheckout
                                            stripeKey="pk_test_51JediMF8Clxej3cvDhlrQQrHdpK2xvTsIhFgdI1nAZEJPQ4ciYaRSMZjhrLMjP9nO6E07mGqQsuc74FUI4sjbRX9004hVSsslc"
                                            token={handleToken}
                                            billingAddress
                                            image={`http://localhost:8080/cars/image/${car.id}/download`}
                                            amount={totalPrice * 100}
                                            name={car.model}
                                            description="Enter your details for Stripe payment"
                                        >
                                        <Button variant="contained" color="secondary" style={{marginTop: "25px"}}>STRIPE PAY</Button>
                                        </StripeCheckout>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CarPaymentForm;
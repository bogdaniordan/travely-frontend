import React, {useEffect, useState} from 'react';
import Input from "react-validation/build/input";
import {nameValidation, required} from "../../utils/Validations";
import Button from "@material-ui/core/Button";
import InfoIcon from "@mui/icons-material/Info";
import {useStyles} from "../../styling/js-styling/QuestionsTableStyling";
import {useForm} from "react-hook-form";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import CarBookingService from "../../service/CarBookingService";
import {useHistory} from "react-router-dom";

const CarPaymentForm = ({totalPrice, notes, dates, childSeatNumber, babySeatNumber, gps, car}) => {
    const classes = useStyles();
    const history = useHistory();
    const [customer, setCustomer] = useState({})

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(res => {
            setCustomer(res.data);
            reset(res.data);
        })
        console.log(dates)
    },[reset])

    return (
        <div className="row">
            <div className="card">
                <form onSubmit={
                    handleSubmit(() => {
                        CarBookingService.saveCarBooking(car.id, dates.startDate, dates.endDate, childSeatNumber, babySeatNumber, gps, totalPrice, notes)
                            .then(res => history.push("/home"))
                    })
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
                                {errors.firstName && <span style={{color:"red"}}>This field needs at least 3 characters.</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("lastName", {required: true, minLength: 3})}
                                />
                                {errors.lastName && <span style={{color:"red"}}>This field needs at least 3 characters.</span>}
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
                                <small className="text-muted">You will not receive any marketing materials.</small>
                                {errors.phoneNumber && <span style={{color:"red"}}>Please enter a valid phone number!</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("address", {required: true , minLength: 10, maxLength: 40})}
                                />
                                {errors.address && <span style={{color:"red"}}>Enter a valid address!</span>}
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
                                {errors.cardName && <span style={{color:"red"}}>Enter a valid card name!</span>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">Card number</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("cardNumber", {required: true, pattern: /^4[0-9]{12}(?:[0-9]{3})?$/})}
                                />
                                {errors.cardNumber && <span style={{color:"red"}}>Enter a valid card number!</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3" style={{display: "flex"}}>
                                <div style={{width: "40%"}}>
                                    <label htmlFor="firstName">Expiration date</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("expirationDate", {required: true, pattern: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/})}
                                    />
                                    <small className="text-muted">Month/year</small>
                                    {errors.expirationDate && <span style={{color:"red"}}>Enter a valid expiration date!</span>}
                                </div>
                                <div style={{marginLeft: "85px"}}>
                                    <label htmlFor="firstName" style={{margin: "auto"}}>CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        {...register("cvv", {required: true, minLength: 3, maxLength: 3})}
                                    />
                                    <small className="text-muted">Digits on the back of the card</small>
                                    {errors.cvv && <span style={{color:"red"}}>Enter a valid CVV!</span>}
                                </div>

                            </div>
                            <div className="col-md-6 mb-3">
                                <div style={{display: "flex", height: "100%"}}>
                                    <h3 style={{marginLeft: "100px", marginTop: "20px"}}>TOTAL ${totalPrice}</h3>
                                    <div style={{float: "right"}}>
                                        <Button type="submit" variant="contained" color="primary" style={{marginLeft: "20px", marginTop: "25px", marginRight: "10px"}}>REGULAR PAY</Button>
                                        <Button variant="contained" color="secondary" style={{marginTop: "25px"}}>STRIPE PAY</Button>
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
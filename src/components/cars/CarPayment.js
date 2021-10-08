import React from 'react';
import Input from "react-validation/build/input";
import {nameValidation, required} from "../../utils/Validations";
import Button from "@material-ui/core/Button";

const CarPayment = ({totalPrice, notes}) => {
    return (
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <h4>Payment</h4>
                    {/*<h4 style={{color: "orange"}}>Total: ${totalPrice}</h4>*/}
                    <h4>Billing address </h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <hr className="mb-4"/>
                    <h4>Credit card details</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="firstName">First name</label>

                            <input
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3" style={{display: "flex", border: "1px solid yellow"}}>
                            <div style={{width: "40%"}}>
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <div style={{textAlign: "right", border: "1px solid blue"}}>
                                <div style={{width: "80%", float :"right"}}>
                                    <label htmlFor="firstName" style={{margin: "auto"}}>First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6 mb-3">
                            <div style={{display: "flex"}}>
                                <h4>Total ${totalPrice}</h4>
                                <Button variant="contained" color="primary">REGULAR PAY</Button>
                                <Button variant="contained" color="secondary">STRIPE PAY</Button>
                            </div>
                        </div>
                        {/*<div className="col-md-6 mb-3" style={{width: "50%"}}>*/}
                        {/*    <label htmlFor="firstName">First name</label>*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        className="form-control"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarPayment;
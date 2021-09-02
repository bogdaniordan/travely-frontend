import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Button from "@material-ui/core/Button";
import Footer from "../navigation/Footer";
import {useForm} from 'react-hook-form';
import AuthService from "../../service/AuthService";
import TestimonialService from "../../service/TestimonialService";

const AddTestimonial = () => {
    const location = useLocation();
    const accommodation = location.state.accommodation;
    const history = useHistory();
    // const [reviewMessage, setReviewMessage] = useState("");

    const { register, handleSubmit, formState: {errors} } = useForm();

    return (
        <div>
            <Navbar title={"Accommodation review"}/>
            <div className="container contact-form">
                <form onSubmit={handleSubmit((data) => {
                    TestimonialService.addTestimonial(accommodation.id, AuthService.getCurrentUser().id, data);
                    history.push("/profile")
                })}>
                    <h3 style={{color: "black"}}>Leave a review for your booking at {accommodation.title}, {accommodation.location}</h3>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <textarea name="txtMsg"
                                          className="form-control"
                                          placeholder="Message"
                                          name="message"
                                          style={{width: "100%", height: "150px"}}
                                          {...register("message", {required: true, minLength: 5})}
                                    // onChange={(event) => setReviewMessage(event.target.value)}
                                ></textarea>
                                {errors.message && <span style={{color:"red"}}>Please enter a message which is at least 5 characters long!</span>}
                            </div>
                            <br/>
                            <div className="form-group">
                                <Button type="submit" variant="contained" name="btnSubmit" className="btnContact" value="Send question">Submit</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default AddTestimonial;
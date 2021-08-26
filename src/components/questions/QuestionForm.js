import React from 'react';
import {useLocation} from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";

const QuestionForm = () => {
    const location = useLocation();
    const booking = location.state.booking;

    return (
        <div>
            <Navbar />
            <div className="container contact-form">
                <div className="contact-image">
                    <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
                </div>
                <form method="post">
                    <h3 style={{color: "black"}}>Drop {booking.host.firstName} {booking.host.lastName} a Question</h3>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <textarea name="txtMsg" className="form-control" placeholder="Your question *"
                                          style={{width: "100%", height: "150px"}}></textarea>
                            </div>
                            <br/>
                            <div className="form-group">
                                <Button variant="contained" name="btnSubmit" className="btnContact" value="Send question">Submit</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default QuestionForm;
import React, {useEffect, useState} from 'react';
import TestimonialService from "../../service/TestimonialService";
import AuthService from "../../service/AuthService";
import { RatingView } from 'react-simple-star-rating'
import {Paper} from "@material-ui/core";


const TestimonialCard = ({accommodationId}) => {
    const [testimonials, setTestimonials] = useState([])

    useEffect(() => {
        TestimonialService.getAllForAccommodation(accommodationId).then(res => setTestimonials(res.data))
    }, [])

    return (
        <>
            {
                testimonials.length > 0 && (
                    <div className="testimonials-clean" id="testimonials-clean-container">
                        <Paper elevation={3}>
                            <div className="container">
                                <div className="row people">
                                    <h4 className="text-center" id="testimonials-header">Check out what other guests had to say </h4>
                                    {
                                        testimonials.map(
                                            (testimonial, index) =>
                                                index <= 2 && (
                                                    <div className="col-md-6 col-lg-4 item">
                                                        <div className="box">
                                                            <h4 className="description">{testimonial.message.toUpperCase()}</h4>
                                                        </div>
                                                        <div className="author">
                                                            <img className="rounded-circle" height="50px" width="90px"
                                                                 src={testimonial.customer.provider !== "local" ? testimonial.customer.picture :
                                                                     `http://localhost:8080/customers/image/${testimonial.customer.id}/download` ? `http://localhost:8080/customers/image/${testimonial.customer.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} alt=""/>
                                                            <p className="name">{testimonial.customer.firstName} {testimonial.customer.lastName}, {testimonial.customer.age ? testimonial.customer.age : ""}</p>
                                                            <RatingView ratingValue={testimonial.rating}/>
                                                        </div>
                                                    </div>
                                                )
                                        )
                                    }
                                </div>
                            </div>
                        </Paper>
                    </div>
                )
            }
        </>
    );
};

export default TestimonialCard;
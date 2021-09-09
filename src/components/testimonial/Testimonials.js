import React, {useEffect, useState} from 'react';
import TestimonialService from "../../service/TestimonialService";
import AuthService from "../../service/AuthService";
import { Rating, RatingView } from 'react-simple-star-rating'


const TestimonialCard = ({accommodationId}) => {
    const[testimonials, setTestimonials] = useState([])

    useEffect(() => {
        TestimonialService.getAllForAccommodation(accommodationId).then(res => setTestimonials(res.data))
    }, [])

    return (
        <>
            <div className="testimonials-clean" style={{marginBottom: "-250px"}}>
                <div className="container">
                    {
                        testimonials.length > 0 && (
                            <div className="intro">
                                <h2 className="text-center">Testimonials </h2>
                                <p className="text-center">Checkout what other customers thought about this accommodation.</p>
                            </div>
                        )
                    }
                    <div className="row people">
                        {
                            testimonials.length > 0 ? (
                                testimonials.map(
                                    testimonial => <div className="col-md-6 col-lg-4 item">
                                        <div className="box">
                                            <p className="description">{testimonial.message}</p>
                                        </div>
                                        <div className="author"><img className="rounded-circle" height="50px" width="60px" src={`http://localhost:8080/customers/image/${AuthService.getCurrentUser().id}/download` ? `http://localhost:8080/customers/image/${AuthService.getCurrentUser().id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} alt=""/>
                                            <h5 className="name">{testimonial.customer.firstName} {testimonial.customer.lastName}</h5>
                                            <RatingView ratingValue={testimonial.rating}/>
                                        </div>
                                    </div>
                                )
                                ) : (
                                    <h4>There are no testimonials for this accommodation</h4>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestimonialCard;
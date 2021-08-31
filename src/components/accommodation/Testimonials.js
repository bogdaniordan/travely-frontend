import React, {useEffect, useState} from 'react';
import TestimonialService from "../../service/TestimonialService";

const TestimonialCard = ({accommodationId}) => {
    const[testimonials, setTestimonials] = useState([])

    useEffect(() => {
        TestimonialService.getAllForAccommodation(accommodationId).then(res => setTestimonials(res.data))
    }, [])

    return (
        <>
            <div className="testimonials-clean">
                <div className="container">
                    <div className="intro">
                        <h2 className="text-center">Testimonials </h2>
                        <p className="text-center">Checkout what other customers thought about this accommodation.</p>
                    </div>
                    <div className="row people">
                        {
                            testimonials.length > 0 ? (
                                testimonials.map(
                                    testimonial => <div className="col-md-6 col-lg-4 item">
                                        <div className="box">
                                            <p className="description">{testimonial.message}</p>
                                        </div>
                                        <div className="author"><img className="rounded-circle" src="https://img4.cityrealty.com/neo/i/p/mig/airbnb_guide.jpg" alt=""/>
                                            <h5 className="name">{testimonial.customer.firstName} {testimonial.customer.lastName}</h5>
                                            {/*<p className="title">CEO of Company Inc.</p>*/}
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
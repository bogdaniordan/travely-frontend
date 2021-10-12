import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Button from "@material-ui/core/Button";
import Footer from "../navigation/Footer";
import {useForm} from 'react-hook-form';
import AuthService from "../../service/AuthService";
import TestimonialService from "../../service/TestimonialService";
import { Rating, RatingView } from 'react-simple-star-rating'
import ReviewsIcon from '@mui/icons-material/Reviews';
import AccommodationService from "../../service/AccommodationService";
import {Link} from "react-router-dom";

const AddTestimonial = (props) => {
    const accommodationId = props.match.params.accommodationId;
    const history = useHistory();
    const [rating, setRating] = useState(0)
    const [accommodation, setAccommodation] = useState({})

    useEffect(() => {
       AccommodationService.getById(accommodationId).then(res => setAccommodation(res.data))
    },[])

    const { register, handleSubmit, formState: {errors} } = useForm();

    const handleRating = rate => {
        setRating(rate);
    }

    return (
        <div>
            <Navbar title={"Accommodation review"}/>
            <div className="container" id="add-review-container">
                <Link to="/profile" style={{float: "left"}}>Back to profile</Link>
                <br/>
                <br/>
                <ReviewsIcon style={{margin: "auto", height: "100px", width: "100px", marginBottom: "20px"}} color="primary"/>
                <br/>
                <form onSubmit={handleSubmit((data) => {
                    TestimonialService.addTestimonial(accommodationId, AuthService.getCurrentUser().id, data, rating).then(
                        res => history.push("/profile")
                    )
                })}>
                    <br/>
                    <h4 className="black-colored">Leave a review for your booking at {accommodation.title}, {accommodation.location}</h4>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Rating onClick={handleRating}  ratingValue={rating}/>
                                <textarea name="txtMsg"
                                          className="form-control"
                                          placeholder="Message"
                                          name="message"
                                          style={{width: "75%", height: "150px", margin: "auto", marginTop: "20px"}}
                                          {...register("message", {required: true, minLength: 5})}
                                ></textarea>
                                {errors.message && <span className="red-colored">Please enter a message which is at least 5 characters long!</span>}
                            </div>
                            <br/>
                            <div className="form-group">
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
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
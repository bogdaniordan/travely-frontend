import React, {useEffect, useState} from 'react';
import TestimonialService from "../../service/TestimonialService";
import { RatingView } from 'react-simple-star-rating'


const AccommodationFacilitiesCard = ({accommodation, hostNumber}) => {
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(0)

    useEffect(() => {
        TestimonialService.getAverageRating(accommodation.id).then(res => setRating(res.data))
        TestimonialService.getAllForAccommodation(accommodation.id).then(r => setReviews(r.data))
    }, [])

    return (
        <div className="container">
            <div className="row mb-2" >
                <div className="col-md-6">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250">
                        <div className="card-body d-flex flex-column align-items-start">
                            <strong className="d-inline-block mb-2 text-primary">Accomodation type</strong>
                            <h3 className="mb-0">
                                <a className="text-dark" href="#">{accommodation.placeType}</a>
                            </h3>
                            <div className="mb-1 text-muted" style={{marginTop: "10px"}}>Location: {accommodation.location}</div>
                            <br/>
                            <p className="card-text mb-auto">The price for this accommodation is ${accommodation.pricePerNight} per night.</p>
                        </div>
                        <img height="250px" width="200px" src="https://cdn3.iconfinder.com/data/icons/business-outline-29/32/business-03-512.png" className="card-img-right flex-auto d-none d-md-block"
                             data-src="holder.js/200x250?theme=thumb" alt="Card image cap"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250" >
                        <div className="card-body d-flex flex-column align-items-start">
                            {/*<strong className="d-inline-block mb-2 text-primary">This accommodation offers</strong>*/}
                            {
                                reviews.length > 0 ? (
                                    <div>
                                        <p><RatingView ratingValue={Math.round(rating)}/> {rating.toFixed(1)} - {reviews.length} review(s)</p>
                                        {/*<small>{reviews.length} review(s)</small>*/}
                                    </div>
                                ) : (
                                    <p>There are no reviews yet.</p>
                                )
                            }
                            <h3 className="mb-0">
                                <a className="text-dark" href="#">Facilities</a>
                            </h3>
                            <p>Cleanliness: {accommodation.cleaningStatus.toLowerCase().replace("_", " ")}</p>
                            {/*<div className="mb-1 text-muted">This {accommodation.placeType} offers</div>*/}
                            <br/>
                            {accommodation.facilities.map(facility => <p className="card-text mb-auto">{facility.replace("_", " ")}</p>)}
                        </div>
                        <img  height="250px" width="200px" src="https://www.kindpng.com/picc/m/584-5847848_hotel-facilities-icon-png-transparent-png.png" className="card-img-right flex-auto d-none d-md-block"
                              data-src="holder.js/200x250?theme=thumb" alt="Card image cap"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationFacilitiesCard;
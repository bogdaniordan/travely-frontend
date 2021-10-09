import React, {useEffect, useState} from 'react';
import TestimonialService from "../../service/TestimonialService";
import { RatingView } from 'react-simple-star-rating'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MicrowaveIcon from '@mui/icons-material/Microwave';

const AccommodationFacilitiesCard = ({accommodation}) => {
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
                            <div className="mb-1 text-muted" style={{marginTop: "10px"}}><LocationOnIcon /> {accommodation.location} </div>
                            <div className="mb-1 text-muted">{accommodation.address}</div>
                            <br/>
                            <h5 className="card-text mb-auto">Price: ${accommodation.pricePerNight} per night.</h5>
                        </div>
                        <img height="250px" width="200px" src="https://www.mcicon.com/wp-content/uploads/2020/12/Architecture_Hotel_1-copy.jpg" className="card-img-right flex-auto d-none d-md-block"
                             data-src="holder.js/200x250?theme=thumb" alt="Card image cap"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250" >
                        <div className="card-body d-flex flex-column align-items-start">
                            {
                                reviews.length > 0 ? (
                                    <div>
                                        <p><RatingView ratingValue={Math.round(rating)}/> {rating.toFixed(1)} - {reviews.length} review(s)</p>
                                    </div>
                                ) : (
                                    <div>
                                        <RatingView ratingValue={0}/>
                                        <p>There are no reviews yet.</p>
                                    </div>
                                )
                            }
                            <h3 className="mb-0">
                                <a className="text-dark" href="#">Facilities{" "}<MicrowaveIcon /></a>
                            </h3>
                            <br/>
                            {accommodation.facilities.map(facility => <p className="card-text mb-auto">{facility.replace("_", " ")}</p>)}
                        </div>
                        <img  height="250px" width="200px" src="https://media.istockphoto.com/vectors/hotel-icons-vector-id693744314?b=1&k=20&m=693744314&s=612x612&w=0&h=EgQTJwQK-F_fVviWu48LCN2oIHD1ntsFJATLE9aPB9I=" className="card-img-right flex-auto d-none d-md-block"
                              data-src="holder.js/200x250?theme=thumb" alt="Card image cap"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationFacilitiesCard;
import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AccommodationService from "../../service/AccommodationService";
import AuthService from "../../service/AuthService";
import { RatingView } from 'react-simple-star-rating'
import TestimonialService from "../../service/TestimonialService";


const AccommodationCards = ({place}) => {
    const history = useHistory();
    const [jobIsSaved, setJobIsSaved] = useState(false)
    const [rating, setRating] = useState(0);

    useEffect(() => {
        AccommodationService.accommodationIsSaved(place.id, AuthService.getCurrentUser().id).then(res => setJobIsSaved(res.data))
        TestimonialService.getAllForAccommodation(place.id).then(
            res => {
                if (res.data.length > 0) {
                    TestimonialService.getAverageRating(place.id).then(res => setRating(res.data))
                }
            }
        )
    }, [])

    const saveOrUnsaveAccommodation = () => {
        if (jobIsSaved) {
            AccommodationService.removeFromFavorites(place.id, AuthService.getCurrentUser().id).then(res => setJobIsSaved(false))
        } else {
            AccommodationService.saveToFavorites(place.id, AuthService.getCurrentUser().id).then(res => setJobIsSaved(true))
        }
    }

    return (
        <>
                    <div className="col">
                        <div className="card shadow-sm">
                            <img alt="Responsive image" className="img-fluid" style={{height: "250px"}}  src={`http://localhost:8080/accommodations/image/${place.id}/firstImage/download`}/>
                            <div className="card-body">
                                <p className="card-text"><strong>{place.title}</strong></p>
                                {
                                    rating !== 0 && (
                                        <div>
                                            <small><RatingView ratingValue={Math.round(rating)}/></small>
                                        </div>
                                    )
                                }

                                <small>{place.location}</small>
                                <br/>
                                <small>Place type: {place.placeType}</small>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => history.push(`/accommodation/${place.id}`)}><PageviewIcon /></button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={saveOrUnsaveAccommodation}>
                                            {
                                                !jobIsSaved ? (
                                                    <BookmarkBorderIcon />
                                                ) : (
                                                    <BookmarkIcon />
                                                )
                                            }
                                        </button>
                                    </div>
                                    <small className="text-muted">${place.pricePerNight}/night</small>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    );
};

export default AccommodationCards;
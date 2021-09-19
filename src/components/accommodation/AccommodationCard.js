import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PageviewIcon from '@material-ui/icons/Pageview';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AccommodationService from "../../service/AccommodationService";
import AuthService from "../../service/AuthService";
import { RatingView } from 'react-simple-star-rating'
import TestimonialService from "../../service/TestimonialService";
import Modal from 'react-modal';
import {customStyles} from "../../styling/ModalStyling";
import RecommendationModal from "../community/RecommendationModal";


const AccommodationCard = ({place}) => {
    const history = useHistory();
    const [jobIsSaved, setJobIsSaved] = useState(false)
    const [rating, setRating] = useState(0);
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

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
                                    rating !== 0 ? (
                                        <div>
                                            <small><RatingView ratingValue={Math.round(rating)}/></small>
                                        </div>
                                    ) : (
                                        <div>
                                            <small><RatingView ratingValue={0} /></small>
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
                                        <button type="button" className="btn btn-sm  btn-outline-secondary" onClick={openModal}><SupervisedUserCircleIcon /></button>
                                    </div>
                                    <small className="text-muted">${place.pricePerNight}/night</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                    >
                        <RecommendationModal
                            closeModal={closeModal}
                            accommodation={place}
                        />
                    </Modal>
        </>
    );
};

export default AccommodationCard;
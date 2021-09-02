import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';
import BookingService from "../../service/BookingService";
import {useHistory} from "react-router-dom";
import "./BookingCard.scss"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');
const CustomerBooking = ({booking}) => {
    const history = useHistory();

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const getFormattedDate = (date) => {
        return date[0] + "-" + date[1] + "-" + date[2]
    }

    const cancelBooking = () => {
        BookingService.deleteBooking(booking.id);
        closeModal();
        history.push("/profile")
    }

    const leaveQuestion = () => {
        history.push({
            pathname: `/ask-question/${booking.id}`,
            state: {booking: booking}
        })
    }

    const goToAllQuestions = () => {
        history.push(`/questions/${booking.host.id}`)
    }

    const leaveReview = () => {
        history.push({
          pathname: `/add-testimonial/`,
          state: {accommodation: booking.accommodation}
        })
    }

    return (
        <>
                    <article className="postcard light blue">
                        <a className="postcard__img_link" href="#">
                            <img className="postcard__img" src={`http://localhost:8080/accommodations/image/${booking.accommodation.id}/firstImage/download`} alt="Image Title"/>
                        </a>
                        <div className="postcard__text t-dark">
                            <h1 className="postcard__title blue"><a href="#">{booking.accommodation.title}</a></h1>
                            <div className="postcard__subtitle small">
                                <time dateTime="2020-05-25 12:00:00">
                                    <i className="fas fa-calendar-alt mr-2"></i>Check in: {getFormattedDate(booking.checkInDate)}  Check out: {getFormattedDate(booking.checkoutDate)}

                                </time>
                            </div>
                            <div className="postcard__bar"></div>
                            <div className="postcard__preview-txt">Location: {booking.accommodation.location}</div>
                            <br/>
                            <div className="postcard__preview-txt">Accommodation type: {booking.accommodation.placeType}</div>
                            <br/>
                            <div className="postcard__preview-txt">Host: {booking.host.firstName} {booking.host.lastName}</div>
                            <ul className="postcard__tagbox">
                                <li className="tag__item play green" onClick={goToAllQuestions}><i className="fas fa-tag mr-2"></i>All questions</li>
                                <li className="tag__item play blue" onClick={leaveQuestion}><i className="fas fa-tag mr-2"></i>Leave question</li>
                                {
                                    new Date(getFormattedDate(booking.checkoutDate)) < new Date() && (
                                        <li className="tag__item play blue" onClick={leaveReview}><i className="fas fa-clock mr-2"></i>Review</li>
                                    )
                                }
                                {
                                    new Date(getFormattedDate(booking.checkInDate)) > new Date() && (
                                        <li className="tag__item play red" onClick={openModal}>Cancel booking</li>
                                    )
                                }
                            </ul>
                        </div>
                    </article>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <div className="modal-dialog modal-confirm">
                            <div className="modal-content">
                                <div className="modal-header justify-content-center">
                                    <div className="icon-box">
                                        <i className="material-icons">&#xE5CD;</i>
                                    </div>
                                </div>
                                <div className="modal-body text-center">
                                    <h4>Are you sure you want to cancel this appointment?</h4>
                                    <p>Your funds will be refunded in 14 working days.</p>
                                    <Button variant="contained" color="primary" style={{marginRight: "5px", padding: "10px"}} onClick={cancelBooking}>Yes</Button>
                                    <Button variant="contained" color="secondary" style={{padding: "10px"}} onClick={closeModal}>No</Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
        </>
    );
};

export default CustomerBooking;
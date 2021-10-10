import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import BookingService from "../../service/BookingService";
import {useHistory} from "react-router-dom";
import "../../styling/BookingCard.scss"
import {customStyles} from "../../styling/js-styling/ModalStyling";
import TestimonialService from "../../service/TestimonialService";
import AuthService from "../../service/AuthService";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from "moment";
import DateRangeIcon from '@mui/icons-material/DateRange';
import CancelBookingModal from "./CancelBookingModal";
import {getBookingDuration} from "../../utils/CityCoordinates";

Modal.setAppElement('#root');
const CustomerBooking = ({booking, bookings, setBookings}) => {
    const history = useHistory();
    const [modalIsOpen, setIsOpen] = useState(false)
    const [bookingIsReviewed, setBookingIsReviewed] = useState(false);
    const [bookingDurationInDays, setBookingDurationInDays] = useState();

    useEffect(() => {
        setBookingDurationInDays(getBookingDuration(booking.checkInDate, booking.checkoutDate))
        TestimonialService.accommodationIsReviewedByUser(booking.accommodation.id, AuthService.getCurrentUser().id).then(res => setBookingIsReviewed(res.data));
    }, [])

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const cancelBooking = () => {
        BookingService.deleteBooking(booking.id);
        closeModal();
        history.push("/profile")
        setBookings(bookings.filter(book => book.id !== booking.id));
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
        history.push(`/add-testimonial/${booking.accommodation.id}`)
    }

    const rescheduleBooking = () => {
        history.push(`/reschedule-booking/${booking.id}`)
    }

    return (
        <>
            <article className="postcard light blue">
                <a className="postcard__img_link" href="#">
                    <img className="postcard__img" onClick={() => history.push(`/accommodation/${booking.accommodation.id}`)} src={`http://localhost:8080/accommodations/image/${booking.accommodation.id}/firstImage/download`} alt="Image Title"/>
                </a>
                <div className="postcard__text t-dark">
                    <div className="flexed-container">
                        <h1 className="postcard__title blue" id="booked-accommodation-title"><a href="#">{booking.accommodation.title}</a></h1>
                        <div className="postcard__subtitle small" id="booked-accommodation-dates-container">
                            <div className="calendar-icon-container">
                                <DateRangeIcon style={{height: "35px", width: "35px"}}/>
                            </div>
                            <time dateTime="2020-05-25 12:00:00">
                                <i className="fas fa-calendar-alt mr-2"></i>Check in: {moment(booking.checkInDate).format("DD-MM-YYYY")}
                                <br/>
                                <i className="fas fa-calendar-alt mr-2"></i>Check out: {moment(booking.checkoutDate).format("DD-MM-YYYY")}
                            </time>
                        </div>
                    </div>

                    <div className="postcard__bar"></div>
                    <div className="postcard__preview-txt">Amount: <strong>${booking.price}</strong> - {bookingDurationInDays} nights/${booking.accommodation.pricePerNight}</div>
                    <br/>
                    <div className="postcard__preview-txt"><LocationOnIcon /> {booking.accommodation.location}</div>
                    <br/>
                    <div className="postcard__preview-txt">Accommodation type: {booking.accommodation.placeType}</div>
                    <br/>
                    <div className="postcard__preview-txt">Host: {booking.host.firstName} {booking.host.lastName}</div>
                    <ul className="postcard__tagbox">

                        <li className="tag__item play blue" onClick={goToAllQuestions}><i className="fas fa-tag mr-2"></i>All questions</li>
                        <li className="tag__item play blue" onClick={leaveQuestion}><i className="fas fa-tag mr-2"></i>Contact</li>
                        {
                            new Date(moment(booking.checkoutDate).format("DD-MM-YYYY")) < new Date() && (
                                !bookingIsReviewed && (
                                    <li className="tag__item play blue" onClick={leaveReview}><i className="fas fa-clock mr-2"></i>Review</li>
                                )
                            )
                        }
                        {
                            new Date(moment(booking.checkoutDate).format("DD-MM-YYYY")) > new Date() && (
                                <li className="tag__item play blue" onClick={rescheduleBooking}><i className="fas fa-clock mr-2"></i>Reschedule</li>
                            )
                        }
                        {
                            new Date(moment(booking.checkInDate).format("DD-MM-YYYY")) > new Date() && (
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
            >
                <CancelBookingModal cancelBooking={cancelBooking} closeModal={closeModal}/>
            </Modal>
        </>
    );
};

export default CustomerBooking;
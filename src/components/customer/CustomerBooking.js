import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';
import BookingService from "../../service/BookingService";
import {useHistory} from "react-router-dom";

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

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // useEffect(() => {
    //     console.log(booking)
    // }, [])

    const getFormattedDate = (date) => {
        return date[0] + "-" + date[1] + "-" + date[2]
    }

    const cancelAppointment = () => {
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


    return (
        <>
            <div className="col-md-4">
                <div className="card p-3">
                    <div className="d-flex flex-row mb-3"><img src={booking.accommodation.imageUrls.allImages[0]}
                                                               width="70" alt="" />
                        <div className="d-flex flex-column ml-2"><span>{booking.accommodation.title}</span><span
                            className="text-black-50">{getFormattedDate(booking.checkInDate)}</span><span
                            className="text-black-50">{getFormattedDate(booking.checkoutDate)}</span><span
                            className="ratings"><i className="fa fa-star"></i><i
                            className="fa fa-star"></i><i className="fa fa-star"></i><i
                            className="fa fa-star"></i></span></div>
                    </div>
                    <h6>Get more context on your users with stripe data inside our platform.</h6>
                    <div className="d-flex justify-content-between install mt-3"><span>
                        {
                            new Date(getFormattedDate(booking.checkoutDate)) < new Date() && (
                                <Button variant="contained" color="primary">R</Button>
                            )
                        }
                        </span><span
                        className="text-primary"><Button variant="contained" color="primary" onClick={leaveQuestion}>Question
                        </Button>
                        {
                            new Date(getFormattedDate(booking.checkInDate)) > new Date() && (
                                <Button variant="contained" color="secondary" style={{marginLeft: "5px"}} onClick={openModal}>CANCEL</Button>
                            )
                        }
                        </span>
                    </div>
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
                                        <Button variant="contained" color="primary" style={{marginRight: "5px", padding: "10px"}} onClick={cancelAppointment}>Yes</Button>
                                        <Button variant="contained" color="secondary" style={{padding: "10px"}} onClick={closeModal}>No</Button>
                                    </div>
                                </div>
                            </div>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default CustomerBooking;
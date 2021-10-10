import React from 'react';
import Button from "@material-ui/core/Button";
import {useStyles} from "../../styling/js-styling/CardDetailsStyling";

const CancelBookingModal = ({cancelBooking, closeModal}) => {
    const classes = useStyles();

    return (
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div className="modal-header justify-content-center">
                    <div className="icon-box">
                        <i className="material-icons">&#xE5CD;</i>
                    </div>
                </div>
                <div className="modal-body text-center">
                    <h4>Are you sure you want to cancel this booking?</h4>
                    <br/>
                    <p>Your funds will be refunded in 14 working days.</p>
                    <br/>
                    <Button variant="contained" color="primary" className={classes.yesCancelButton} onClick={cancelBooking}>Yes</Button>
                    <Button variant="contained" color="secondary" className={classes.noCancelButton} onClick={closeModal}>No</Button>
                </div>
            </div>
        </div>
    );
};

export default CancelBookingModal;
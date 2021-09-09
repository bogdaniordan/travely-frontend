import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import AuthService from "../../service/AuthService";
import {TextField} from "@material-ui/core";

const RecommendationModal = ({closeModal}) => {
    return (
        <div>
            <Button onClick={closeModal} color="secondary" variant="contained">X</Button>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h4>Enter your email address</h4>
                        <p>Your will receive an email in a few moments.</p>
                            <br/>
                            <br/>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationModal;
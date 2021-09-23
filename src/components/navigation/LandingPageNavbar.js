
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../../service/AuthService";
import SavedAccommodations from "./SavedAccommodations";
import ChatNotifications from "./ChatNotifications";
import QuestionsNotifications from "./QuestionsNotifications";
import plane from "../../images/plane.png";


const LandingPageNavbar = () => {
    const history = useHistory();
    return (
        <div>
            <nav style={{paddingTop: "35px", paddingBottom: "35px"}} className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                <div className="container" >
                    <a style={{color: "#aaaccc"}} className="navbar-brand" href="#">Travely</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "#aaaccc"}} aria-current="page" href="#">About us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "#aaaccc"}} aria-current="page" href="/customer-landing-page">Customer</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" style={{color: "#aaaccc"}} aria-current="page" href="/host-landing-page">Host</a>
                                </li>
                            </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default LandingPageNavbar;
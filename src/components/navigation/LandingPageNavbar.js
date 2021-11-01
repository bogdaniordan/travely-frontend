import React from "react";
import simple_logo from "../../images/travely_logo.png";


const LandingPageNavbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="landing-page-navbar-font" aria-label="Eighth navbar example">
                <div className="container" >
                    <a href="/customer-landing-page">
                        <img src={simple_logo} className="logo-image" alt="logo"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample07">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" id="navbar-link-color" aria-current="page" href="#">About us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" id="navbar-link-color" aria-current="page" href="/customer-landing-page">Customer</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" id="navbar-link-color" aria-current="page" href="/host-landing-page">Host</a>
                                </li>
                            </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default LandingPageNavbar;
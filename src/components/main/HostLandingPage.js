import React from 'react';
import LandingPageNavbar from "../navigation/LandingPageNavbar";
import "../../styling/LandingPage.css";
import Button from "@material-ui/core/Button";
import picture from "../../images/host_landing_page_picture.png"
const HostLandingPage = () => {
    return (
        <div>
            <LandingPageNavbar />
            <section className="landing-page-container">
                <div className="fifth-circle"></div>
                <div className="circle" style={{ background: "blue" }}></div>
                <div className="second-circle"></div>
                <div className="third-circle"></div>
                <div className="content">
                    <div className="textBox">
                        <h2>
                            <span>Travely for hosts</span>
                        </h2>
                        <br/>
                        <p>
                            Hosts can manager their accommodations, their bookings,
                            add new accommodation or clean them. They can also earn badges.
                        </p>
                        <br/>
                        {
                            !JSON.parse(localStorage.getItem("host")) ? (
                                <div>
                                    <Button variant="contained" color="primary"><a href="http://localhost:3001/login">
                                        Login as host
                                    </a></Button>
                                    <Button variant="contained" color="primary" style={{marginLeft: "10px"}}><a href="http://localhost:3001/register">
                                        Register as host
                                    </a></Button>
                                </div>
                            ) : (
                                <div>
                                    <Button variant="contained" color="primary"><a href="http://localhost:3001/">
                                        Home
                                    </a></Button>
                                </div>
                            )
                        }
                    </div>
                    <a href="/host-landing-page">
                        <div className="imgBox">
                            <img src={picture} alt="Travel picture" className="landing-page-image"/>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default HostLandingPage;
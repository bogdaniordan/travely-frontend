import React from 'react';
import LandingPageNavbar from "../navigation/LandingPageNavbar";
import "../../styling/LandingPage.css"
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import AuthService from "../../service/AuthService";
import picture from "../../images/customer_landing_page_picture.png"
const CustomerLandingPage = () => {
    const history = useHistory();

    return (
        <div>
            <LandingPageNavbar />
            <section className="landing-page-container">
                <div className="circle"></div>
                <div className="second-circle"></div>
                <div className="fourth-circle"></div>
                <div className="third-circle"></div>
                <div className="content">
                    <div className="textBox">
                        <h2>
                            <span>Travely for customers</span>
                        </h2>
                        <br/>
                        <p>
                            Users can view and book different accommodations around the globe.
                            They can also manage their bookings and access the community features where they can interact with other travellers.
                        </p>
                        <br/>
                        {
                            !AuthService.getCurrentUser() ? (
                                <div>
                                    <Button variant="contained" color="primary" onClick={() => history.push("/login")}>
                                        Login as customer
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => history.push("/register")} style={{marginLeft: "10px"}}>
                                        Register as customer
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button variant="contained" color="primary" onClick={() => history.push("/home")}>
                                        Home
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                    <a href="/customer-landing-page">
                        <div className="imgBox">
                            <img
                                src={picture}
                                alt="pet"
                                className="petImage"
                                style={{ marginTop: "-110px", width: "800px" }}
                            />
                        </div>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default CustomerLandingPage;
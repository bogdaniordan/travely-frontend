import React from 'react';
import LandingPageNavbar from "../navigation/LandingPageNavbar";
import "../../styling/LandingPage.css";
import Button from "@material-ui/core/Button";

const HostLandingPage = () => {
    return (
        <div>
            <LandingPageNavbar />
            <section className="landing-page-container">
                <div className="circle" style={{ background: "orange" }}></div>
                <div className="second-circle"></div>
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
                        <Button variant="contained" color="primary"><a href="http://localhost:3001/login">
                            Login as host
                        </a></Button>
                        <Button variant="contained" color="primary" style={{marginLeft: "10px"}}><a href="http://localhost:3001/register">
                            Register as host
                        </a></Button>
                    </div>
                    <a href="/clinicPage">
                        <div className="imgBox">
                            <img
                                src="https://i.pinimg.com/originals/d6/11/3b/d6113b031ac40ecc19a85eda0ae55436.png"
                                alt="pet"
                                className="petImage"
                                style={{ marginTop: "-110px", width: "700px" }}
                            />
                        </div>
                    </a>
                </div>
                {/*<ul className="thumb">*/}
                {/*    <li>*/}
                {/*        <img*/}
                {/*            src="https://cdn2.iconfinder.com/data/icons/general-health-1/24/clinic2-512.png"*/}
                {/*            alt="clinicSide"*/}
                {/*            // onClick={redirectToClinicPage}*/}
                {/*        />*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <img*/}
                {/*            src="https://static.thenounproject.com/png/2404351-200.png"*/}
                {/*            alt="clientSide"*/}
                {/*            // onClick={redirectToCustomerPage}*/}
                {/*        />*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </section>
        </div>
    );
};

export default HostLandingPage;
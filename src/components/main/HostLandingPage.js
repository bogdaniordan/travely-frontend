import React from 'react';
import LandingPageNavbar from "../navigation/LandingPageNavbar";
import "../../styling/LandingPage.css";

const HostLandingPage = () => {
    return (
        <div>
            <LandingPageNavbar />
            <section className="landing-page-container">
                <div className="circle" style={{ background: "orange" }}></div>
                <div className="content">
                    <div className="textBox">
                        <h2>
                            {/*Welcome to{" "}*/}
                            <span style={{ color: "orange" }}>Travely for customers</span>
                        </h2>
                        <p>
                            Petbox for customers allows you to stay up to date with your
                            favorite clinic, to make online appointments, to ask questions and
                            to see your pet information.
                        </p>
                        <a
                            href="http://localhost:3001/login"
                            // style={{ background: "orange" }}
                        >
                            Login as customer
                        </a>
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
                <ul className="thumb">
                    <li>
                        <img
                            src="https://cdn2.iconfinder.com/data/icons/general-health-1/24/clinic2-512.png"
                            alt="clinicSide"
                            // onClick={redirectToClinicPage}
                        />
                    </li>
                    <li>
                        <img
                            src="https://static.thenounproject.com/png/2404351-200.png"
                            alt="clientSide"
                            // onClick={redirectToCustomerPage}
                        />
                    </li>
                </ul>
            </section>
            {/*<section>*/}
            {/*    <div className="circle"></div>*/}
            {/*    <div className="content">*/}
            {/*        <div className="textBox">*/}
            {/*            <h2>*/}
            {/*                /!* <br /> *!/*/}
            {/*                Welcome to <span>Petbox for clinics</span>*/}
            {/*            </h2>*/}
            {/*            <p>*/}
            {/*                Petbox for clinics is the best way to manage your veterinary*/}
            {/*                clinic, keep track of your customers, employees, pets,*/}
            {/*                appointments and many other features like communication via*/}
            {/*                questions and answers.*/}
            {/*            </p>*/}
            {/*            <a href="/register" style={{ marginRight: "50px" }}>*/}
            {/*                Register your clinic*/}
            {/*            </a>*/}
            {/*            <a href="/login">Login into your clinic</a>*/}
            {/*        </div>*/}
            {/*        <a href="/clinicPage">*/}
            {/*            <div className="imgBox">*/}
            {/*                <img*/}
            {/*                    src="https://i.pinimg.com/originals/d6/11/3b/d6113b031ac40ecc19a85eda0ae55436.png"*/}
            {/*                    alt="pet"*/}
            {/*                    className="petImage"*/}
            {/*                    style={{ marginTop: "-110px" }}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*    <ul className="thumb">*/}
            {/*        <li>*/}
            {/*            <img*/}
            {/*                src="https://cdn2.iconfinder.com/data/icons/general-health-1/24/clinic2-512.png"*/}
            {/*                alt="clinicSide"*/}
            {/*                // onClick={redirectToClinicPage}*/}
            {/*            />*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <img*/}
            {/*                src="https://static.thenounproject.com/png/2404351-200.png"*/}
            {/*                alt="clientSide"*/}
            {/*                // onClick={redirectToCustomerPage}*/}
            {/*            />*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</section>*/}
        </div>
    );
};

export default HostLandingPage;
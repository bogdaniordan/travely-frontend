import React, {useState} from "react";
import AuthService from "../../service/AuthService";
import plane from "../../images/plane.png"
import QuestionsNotifications from "./QuestionsNotifications";
import SavedAccommodations from "./SavedAccommodations";
import ChatNotifications from "./ChatNotifications";

const Navbar = ({title, subtitle}) => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const isHomePage = title === "Welcome to Travely."

    const logout = () => {
        AuthService.logout();
    }

    return (
        <div style={{border: "1px solid white"}}>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
                <div className="container" >
                    <a className="navbar-brand" href="/">Travely</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample07">
                        {currentUser ? (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/profile">Profile</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/community">Community</a>
                                </li>
                                <li className="nav-item" style={{marginLeft: "370px"}}>
                                   <SavedAccommodations />
                                </li>
                                <li>
                                    <ChatNotifications />
                                </li>
                                <li className="nav-item">
                                    <QuestionsNotifications />
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/login" onClick={logout}>Logout</a>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
            <div id="masthead" style={{minHeight: isHomePage ? "370px" : "235px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h1 style={{marginLeft: "100px"}}>{title}
                                {
                                    subtitle && (
                                        <p className="lead">{subtitle}</p>
                                    )
                                }
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
            {isHomePage && (<img src = {plane} className="malePhoto" alt=""/>)}
        </div>
    );
};

export default Navbar;
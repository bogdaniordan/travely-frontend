import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import AuthService from "../../service/AuthService";
import plane from "./plane.png"
import Notifications from "./Notifications";
import SavedAccommodations from "./SavedAccommodations";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1),
//         },
//     },
// }));

const Navbar = ({title, subtitle}) => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    // const classes = useStyles();
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
                                <li className="nav-item" style={{marginLeft: "470px"}}>
                                   <SavedAccommodations />
                                </li>
                                <li className="nav-item">
                                    <Notifications />
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
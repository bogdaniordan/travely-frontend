import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../service/AuthService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

    return (
        <div>
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
                                    <a className="nav-link active" aria-current="page" href="/profile">My profile</a>
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

            {/*<AppBar position="static">*/}
            {/*    <Toolbar>*/}
            {/*        <IconButton*/}
            {/*            edge="start"*/}
            {/*            className={classes.menuButton}*/}
            {/*            color="inherit"*/}
            {/*            aria-label="menu"*/}
            {/*            onClick={() => history.push("/")}*/}
            {/*        >*/}
            {/*            Travely*/}
            {/*        </IconButton>*/}
            {/*        {currentUser ? (*/}
            {/*            <React.Fragment>*/}
            {/*                <Typography variant="h6">*/}
            {/*                    <Button color="inherit">*/}
            {/*                        <Link*/}
            {/*                            to={`/profile`}*/}
            {/*                            className="nav-link"*/}
            {/*                            style={{ color: "white" }}*/}
            {/*                        >*/}
            {/*                            <strong>My profile</strong>*/}
            {/*                        </Link>*/}
            {/*                    </Button>*/}
            {/*                    /!*<Button color="inherit">*!/*/}
            {/*                    /!*    <Link*!/*/}
            {/*                    /!*        to={`/services`}*!/*/}
            {/*                    /!*        className="nav-link"*!/*/}
            {/*                    /!*        style={{ color: "white" }}*!/*/}
            {/*                    /!*    >*!/*/}
            {/*                    /!*        Services*!/*/}
            {/*                    /!*    </Link>*!/*/}
            {/*                    /!*</Button>*!/*/}
            {/*                    /!*<Button color="inherit">*!/*/}
            {/*                    /!*    <Link*!/*/}
            {/*                    /!*        to={`/mechanics`}*!/*/}
            {/*                    /!*        className="nav-link"*!/*/}
            {/*                    /!*        style={{ color: "white" }}*!/*/}
            {/*                    /!*    >*!/*/}
            {/*                    /!*        Mechanics*!/*/}
            {/*                    /!*    </Link>*!/*/}
            {/*                    /!*</Button>*!/*/}
            {/*                </Typography>*/}
            {/*            </React.Fragment>*/}
            {/*        ) : (*/}
            {/*            <div className="navbar-nav ml-auto">*/}
            {/*                <Typography variant="h6" className={classes.title}>*/}
            {/*                    <Button color="inherit">*/}
            {/*                        <Link*/}
            {/*                            to={`/login`}*/}
            {/*                            className="nav-link"*/}
            {/*                            style={{ color: "white" }}*/}
            {/*                        >*/}
            {/*                            Login*/}
            {/*                        </Link>*/}
            {/*                    </Button>*/}
            {/*                    <Button color="inherit">*/}
            {/*                        <Link*/}
            {/*                            to={`/register`}*/}
            {/*                            className="nav-link"*/}
            {/*                            style={{ color: "white" }}*/}
            {/*                        >*/}
            {/*                            Register*/}
            {/*                        </Link>*/}
            {/*                    </Button>*/}
            {/*                </Typography>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
        </div>
    );
};

export default Navbar;
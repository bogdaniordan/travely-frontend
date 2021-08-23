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
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => history.push("/")}
                    >
                        Travely
                    </IconButton>
                    {currentUser ? (
                        <React.Fragment>
                            <Typography variant="h6">
                                <Button color="inherit">
                                    <Link
                                        to={`/profile`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        <strong>My profile</strong>
                                    </Link>
                                </Button>
                                {/*<Button color="inherit">*/}
                                {/*    <Link*/}
                                {/*        to={`/services`}*/}
                                {/*        className="nav-link"*/}
                                {/*        style={{ color: "white" }}*/}
                                {/*    >*/}
                                {/*        Services*/}
                                {/*    </Link>*/}
                                {/*</Button>*/}
                                {/*<Button color="inherit">*/}
                                {/*    <Link*/}
                                {/*        to={`/mechanics`}*/}
                                {/*        className="nav-link"*/}
                                {/*        style={{ color: "white" }}*/}
                                {/*    >*/}
                                {/*        Mechanics*/}
                                {/*    </Link>*/}
                                {/*</Button>*/}
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <Typography variant="h6" className={classes.title}>
                                <Button color="inherit">
                                    <Link
                                        to={`/login`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        Login
                                    </Link>
                                </Button>
                                <Button color="inherit">
                                    <Link
                                        to={`/register`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        Register
                                    </Link>
                                </Button>
                            </Typography>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
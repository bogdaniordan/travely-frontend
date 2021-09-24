import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {required, validPassword, validUsername} from "../../utils/Validations";
import CheckButton from "react-validation/build/button";
import {useHistory} from "react-router-dom";
import AuthService from "../../service/AuthService";
import {useStyles} from "../../styling/AuthStyles";
import {Link, Paper} from "@material-ui/core";
import Modal from 'react-modal';
import {customStyles} from "../../styling/ModalStyling";
import ResetPasswordModal from "./ResetPasswordModal";
import LandingPageNavbar from "../navigation/LandingPageNavbar";
import "../../styling/LoginStyling.css"
import login_background from "./login_background.jpg"

const Login = () => {
    const classes = useStyles();
    const form = useRef();
    const checkBtn = useRef();
    const history = useHistory();

    const [modalIsOpen, setIsOpen] = useState(false)
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const onChangeUsername = event => {
        setUsername(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    const submitForm = e => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                res => {
                    setMessage("You have signed in. Redirecting to home page...")
                    setSuccessful(true)
                    setTimeout(() => {
                        history.push("/home")
                    }, 2500)
                },
                error => {
                    setMessage("User doesn't exist or credentials don't match.");
                    setSuccessful(false);
                }
            )
        }
    }
    
    return (
        <>
            <LandingPageNavbar />
            <div className="login-image-container">
                <img src={login_background}/>
                <Paper style={{position: "absolute", width: "500px", height: "500px", margin: "auto", marginTop: "300px"}} elevation={3}>
                    <Container maxWidth="xs" className="sign-up-container">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <br/>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <br/>
                            <Form onSubmit={submitForm} ref={form}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="username"
                                                value={username}
                                                onChange={onChangeUsername}
                                                validations={[required, validUsername]}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={password}
                                                onChange={onChangePassword}
                                                validations={[required, validPassword]}
                                            />
                                        </div>
                                    </Grid>
                                    <br/>
                                    <br/>
                                    <Grid xs={12}>
                                        <div className="form-group" style={{marginTop: "20px", marginBottom: "20px"}}>
                                            <Button type="submit" variant="contained" color="primary" block style={{margin: "10px"}}>Sign in</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                <Grid container>
                                    <Grid item xs>
                                        <Link variant="body2" onClick={openModal}>
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        </div>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                        >
                        <ResetPasswordModal
                            closeModal={closeModal}
                        />
                        </Modal>
                    </Container>
                </Paper>
            </div>
        </>
    );
}

export default Login;
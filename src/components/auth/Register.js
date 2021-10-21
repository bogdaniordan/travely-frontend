import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from "react-router-dom";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import AuthService from "../../service/AuthService";
import {nameValidation, required, validEmail, validPassword, validUsername} from "../../utils/Validations"
import {Grid, Paper} from "@material-ui/core";
import {useStyles} from "../../styling/js-styling/AuthStyles";
import LandingPageNavbar from "../navigation/LandingPageNavbar";
import login_background from "../../images/auth_backgound.jpg";

const Register = () => {
    const classes = useStyles();
    const history = useHistory();
    const form = useRef();
    const checkBtn = useRef();

    const submitForm = e => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(firstName, lastName, username, password, email).then(
                res => {
                    setMessage(res.data.message);
                    setSuccessful(true);
                    setTimeout(() => {
                        history.push("/login");
                    }, 3000);
                },
                error => {
                    setMessage(error.response.data.message);
                    setSuccessful(false);
                }
            )
        }
    }

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeFirstName = event => {
        setFirstName(event.target.value)
    }

    const onChangeLastName = event => {
        setLastName(event.target.value)
    }

    const onChangeEmail = event => {
        setEmail(event.target.value)
    }

    const onChangeUsername = event => {
        setUsername(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    return (
        <>
            <LandingPageNavbar />
            <div className="login-image-container">
                <img src={login_background} alt="Login background"/>
                <Paper className={classes.container} elevation={3}>
                    <Container maxWidth="xs" className={classes.loginContainer}>
                        <CssBaseline />
                        <div className={classes.paper}>
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
                                    <Grid item={12} sm={6} >
                                        <div className="form-group" style={{marginRight: "5px"}}>
                                            <label htmlFor="firstName">First name</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                value={firstName}
                                                onChange={onChangeFirstName}
                                                validations={[required, nameValidation]}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item={12} sm={6}>
                                        <div className="form-group" style={{marginLeft: "5px"}}>
                                            <label htmlFor="username">Last name</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="lastName"
                                                value={lastName}
                                                onChange={onChangeLastName}
                                                validations={[required, nameValidation]}
                                            />
                                        </div>
                                    </Grid>
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
                                            <label htmlFor="email">Email</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                value={email}
                                                onChange={onChangeEmail}
                                                validations={[required, validEmail]}
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
                                            <Button type="submit" variant="contained" color="primary" block style={{margin: "10px"}}>Sign Up</Button>
                                            <Button variant="contained" color="secondary" block href="/login">Back to login</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                                <Grid container>
                                    <Grid items xs>
                                        <Link to="/login" variant="body2">
                                            Already have an account? Login!
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Form>
                        </div>
                    </Container>
                </Paper>
            </div>
        </>

    );
}

export default Register;
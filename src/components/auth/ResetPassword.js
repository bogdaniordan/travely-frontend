import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import AuthService from "../../service/AuthService";
import Navbar from "../navigation/Navbar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {required, validPassword} from "../../utils/Validations"
import CheckButton from "react-validation/build/button";
import Button from "@material-ui/core/Button";
import LandingPageNavbar from "../navigation/LandingPageNavbar";
import {Paper} from "@material-ui/core";
import login_background from "../../images/auth_backgound.jpg"
import {useStyles} from "../../styling/js-styling/AuthStyles";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Avatar from "@material-ui/core/Avatar";

const ResetPassword = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const token = props.match.params.token;
    const form = useRef();
    const checkBtn = useRef();

    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        AuthService.verifyResetPasswordToken(token).then(res => {
            if (!res.data) {
                history.push("/login")
            }
        })
    }, [])

    const submitForm = e => {
        e.preventDefault();
        // setMessage("");
        // setShowMessage(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            if (!(password === confirmationPassword)) {
                setMessage("Your passwords don't match.");
                setShowMessage(true);
            } else {
                AuthService.savePassword(password, token).then(res => history.push("/login"));
            }
        }
    }

    return (
        <div>
            <LandingPageNavbar />
            <div className="login-image-container">
                <img src={login_background} alt="Login background"/>

                <Paper elevation={2} style={{width: "600px", height: "430px", borderRadius: "20px", margin: "auto", position: "absolute"}}>
                    {/*<div className={classes.paper}>*/}
                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    showMessage ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                        <Avatar className={classes.avatar} style={{margin: "auto", marginTop: "50px"}}>
                            <RotateLeftIcon />
                        </Avatar>
                        <Form className="form-group" onSubmit={submitForm} ref={form}>
                            <div className="form-group">
                                <br/>
                                <br/>
                                <label htmlFor="password">Enter your new password</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    validations={[required, validPassword]}
                                    style={{width: "80%", margin: "auto"}}
                                />
                            </div>
                            <div className="form-group" style={{marginTop: "25px"}}>
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="confirmPassword"
                                    value={confirmationPassword}
                                    onChange={e => setConfirmationPassword(e.target.value)}
                                    validations={[required, validPassword]}
                                    style={{width: "80%", margin: "auto"}}
                                />
                            </div>
                            <br/>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    {/*</div>*/}
                    <br/>
                    <br/>
                </Paper>
            </div>
        </div>
    );
};

export default ResetPassword;
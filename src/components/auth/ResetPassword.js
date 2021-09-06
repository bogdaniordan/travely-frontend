import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router-dom";
import AuthService from "../../service/AuthService";
import Navbar from "../navigation/Navbar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {required, validPassword} from "../../utils/Validations"
import CheckButton from "react-validation/build/button";
import Button from "@material-ui/core/Button";


const ResetPassword = (props) => {
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
        setMessage("");
        setShowMessage(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            console.log("XD")
            if (!(password === confirmationPassword)) {
                setMessage("Your passwords don't match.");
                setShowMessage(false);
            }
        }
    }

    return (
        <div>
            <Navbar title={"Reset your password"}/>
            <div className="container" style={{width: "20%"}}>
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
                <Form className="form-group" onSubmit={submitForm} ref={form}>
                    <div className="form-group">
                        <label htmlFor="password">Please enter your new password</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            validations={[required, validPassword]}
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
                        />
                    </div>
                    <br/>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default ResetPassword;
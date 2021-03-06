import React from 'react';
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import {TextField} from "@material-ui/core";
import AuthService from "../../service/AuthService";
import {useStyles} from "../../styling/js-styling/AuthStyles";

const ResetPasswordModal = ({closeModal}) => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const classes = useStyles();

    return (
        <div>
            <div className="right-align-container">
                <Button onClick={closeModal} className={classes.exitButton} color="secondary" variant="contained">X</Button>
            </div>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h5>Please enter your email address</h5>
                        <p>Your will receive a reset password email in a few moments.</p>
                        <br/>
                        <form onSubmit={handleSubmit((data) => {
                            AuthService.sendResetPasswordEmail(data).then(r => closeModal());
                        })}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                {...register("email", {required: true,  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                                autoComplete="email"
                            />
                            {errors.email && <span className="red-colored">Please enter a valid email!</span>}
                            <br/>
                            <br/>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal;
import React from 'react';
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import {TextField} from "@material-ui/core";
import AuthService from "../../service/AuthService";

const ResetPasswordModal = ({closeModal}) => {
    const { register, handleSubmit, formState: {errors} } = useForm();

    return (
        <div>
            <Button onClick={closeModal} color="secondary" variant="contained">X</Button>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h4>Enter your email address</h4>
                        <p>Your will receive an email in a few moments.</p>
                        <form onSubmit={handleSubmit((data) => {
                            AuthService.sendResetPasswordEmail(data);
                            closeModal();
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
                            {errors.email && <span style={{color:"red"}}>Please enter a valid email!</span>}
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
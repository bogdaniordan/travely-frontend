import React, {useEffect, useState} from 'react';
import {Container, Paper} from "@material-ui/core";
import Navbar from "../navigation/Navbar";
import Button from "@material-ui/core/Button";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import Footer from "../navigation/Footer";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";
import {useStyles} from "../../styling/js-styling/QuestionsTableStyling";

const UpdateProfile = () => {
    const classes = useStyles();
    const history = useHistory();
    const [file, setFile] = useState();
    const [customer, setCustomer] = useState({});

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        defaultValues: {}
    });

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(res => {
            setCustomer(res.data)
            reset(res.data)
        })
    }, [reset])


    const getProfilePicture = event => {
        setFile(event.target.files[0]);
    }

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", file);
        if (file) {
            CustomerService.setImage(customer.id, formData);
        }
    }

    return (
        <div>
            <Navbar title={"Update user"} subtitle={"Please fill in any user detail you want to update."}/>
                <div className="container">
                    <Paper elevation={2} className={classes.updatePaper}>
                        <Container className={classes.updateContainer}>
                            <br/>
                            <h4 className="center-avatar-container">Please enter the details you want to update</h4>
                            <br/>
                                <form onSubmit={handleSubmit((data) => {
                                    CustomerService.updateCustomer(data).then(
                                        res => {
                                            uploadImage();
                                            history.push(`/profile`);
                                        }
                                    )
                                })}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">First name</label>
                                        <input
                                                type="text"
                                                className="form-control"
                                                name="firstName"
                                                {...register("firstName", {required: true, minLength: 3})}
                                            />
                                    </div>
                                    {errors.firstName && <p className="error-red">This field needs at least 3 characters.</p>}
                                    <div className="form-group">
                                        <label htmlFor="username">Last name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            {...register("lastName", {required: true, minLength: 3})}
                                        />
                                    </div>
                                    {errors.lastName && <p className="error-red">This field needs at least 3 characters.</p>}
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            {...register("email", {required: true,  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                                        />
                                    </div>
                                    {errors.email && <p className="error-red">Please enter a valid email!</p>}
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phoneNumber"
                                            {...register("phoneNumber", {required: true, length: 6, pattern: /^[0-9]*$/})}
                                        />
                                    </div>
                                    {errors.phoneNumber && <p className="error-red">Please enter a valid phone number!</p>}
                                    <label htmlFor="gender" className="form-label">
                                        Gender
                                    </label>
                                    <select
                                        className="form-control"
                                        name="gender"
                                    >
                                        <option value="" selected disabled hidden>Pick a gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <label htmlFor="address" className="form-label">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        {...register("address", {required: true , minLength: 10, maxLength: 40})}
                                    />
                                    {errors.address && <p className="error-red">Enter a valid address!</p>}
                                    <label htmlFor="age" className="form-label">
                                        Age
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        {...register("age", {required: true, min: 18, pattern: /^[0-9]*$/})}
                                    />
                                    {errors.address && <p className="error-red">You have to be at least 18 years old.</p>}
                                    <Form.Label>Profile picture</Form.Label>
                                    <Form.Control type="file" onChange={getProfilePicture}/>
                                    <br/>
                                    <br/>
                                    <Button variant="contained" type="submit" color="primary" className={classes.updateSubmitBtn}>Submit</Button>
                                    <Button variant="contained" color="secondary" className={classes.updateBackBtn} onClick={() => history.push("/profile")}>Back</Button>
                                </form>
                        </Container>
                    </Paper>
                </div>
            <Footer />
        </div>
    );
};

export default UpdateProfile;
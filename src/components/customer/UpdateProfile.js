import React, {useEffect, useState} from 'react';
import {Container, CssBaseline, Grid, Paper} from "@material-ui/core";
import Navbar from "../navigation/Navbar";
import Button from "@material-ui/core/Button";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import {Link, useHistory} from "react-router-dom";
import Footer from "../navigation/Footer";
import {useStyles} from "../../styling/AuthStyles";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";

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
                    <Paper elevation={2} style={{height: "750px", width: "700px", margin: "auto"}}>
                        <Container maxWidth="xs" className="sign-up-container">
                            <br/>
                            <h3 className="update-user-header">Update user details</h3>
                            <CssBaseline />
                            <div className={classes.paper}>
                                <form onSubmit={handleSubmit((data) => {
                                    CustomerService.updateCustomer(data).then(
                                        res => {
                                            uploadImage();
                                            history.push(`/profile`);
                                        }
                                    )
                                })}>
                                    {/*<div>*/}
                                    {/*    <Link to="profile" style={{float: "left"}}>Back to profile</Link>*/}
                                    {/*</div>*/}
                                    <Grid container spacing={2}>
                                        <Grid item={12} sm={6}>
                                            <div className="form-group">
                                                <label htmlFor="firstName">First name</label>
                                                <input
                                                        type="text"
                                                        className="form-control"
                                                        name="firstName"
                                                        {...register("firstName", {required: true, minLength: 3})}
                                                    />
                                            </div>
                                            {errors.firstName && <span style={{color:"red"}}>This field needs at least 3 characters.!</span>}
                                        </Grid>
                                        <Grid item={12} sm={6}>
                                            <div className="form-group">
                                                <label htmlFor="username">Last name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lastName"
                                                    {...register("lastName", {required: true, minLength: 3})}
                                                />
                                            </div>
                                            {errors.lastName && <span style={{color:"red"}}>This field needs at least 3 characters.!</span>}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="email"
                                                    {...register("email", {required: true,  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                                                />
                                            </div>
                                            {errors.email && <span style={{color:"red"}}>Please enter a valid email!</span>}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
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
                                            {errors.phoneNumber && <span style={{color:"red"}}>Please enter a valid phone number!</span>}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <label htmlFor="gender" className="form-label">
                                                Gender
                                            </label>
                                            <select
                                                className="form-control"
                                                name="gender"
                                                {...register("gender", {required: true })}
                                            >
                                                <option disabled>Pick a gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                            {errors.gender && <span style={{color:"red"}}>Please pick a gender!</span>}
                                        </Grid>
                                        <Grid item={12} sm={6}>
                                            <label htmlFor="address" className="form-label">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                {...register("address", {required: true , minLength: 10, maxLength: 40})}
                                            />
                                            {errors.address && <span style={{color:"red"}}>Enter a valid address!</span>}
                                        </Grid>
                                        <Grid item={12} sm={6}>
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
                                            {errors.address && <span style={{color:"red"}}>You have to be at least 18 years old.</span>}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Form.Label>Profile picture</Form.Label>
                                            <Form.Control type="file" onChange={getProfilePicture}/>
                                        </Grid>
                                        <br/>
                                        <br/>
                                        <Grid container style={{marginTop: "25px"}}>
                                            <Grid items xs>
                                                <Button variant="contained" type="submit" color="primary" style={{float: "left", marginLeft: "15px"}}>Submit</Button>
                                                <Button variant="contained" color="secondary" style={{float: "right"}} onClick={() => history.push("/profile")}>Back</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Container>
                    </Paper>
                </div>
            <Footer />
        </div>
    );
};

export default UpdateProfile;
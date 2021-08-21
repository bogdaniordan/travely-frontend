import React, {useState, useEffect, useRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { isEmail } from "validator";
import {useHistory} from "react-router-dom";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Select from "react-validation/build/select"


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const nameValidation = value => {
    if (value.length < 3 && value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Name must be between 3 and 15 characters long.
            </div>
        );
    }
}

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};


const validUsername = (value) => {
    if (value.length < 3 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 25 characters.
            </div>
        );
    }
};

const validPassword = (value) => {
    if (value.length < 5 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 5 and 25 characters.
            </div>
        );
    }
};

const validPhoneNumber = (value) => {
    if (value.length < 5 || value.length > 15 || !/^\d+\.\d+$/.test(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Phone number must be between 5 and 15 and must be only digits.
            </div>
        );
    }
}

const validAge = value => {
    if (value < 18) {
        return (
            <div className="alert alert-danger" role="alert">
                You must be at least 18 years old.
            </div>
        );
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

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


    }

    const [firstName, setFirstName] = useState();

    const onChangeFirstName = event => {
        setFirstName(event.target.value)
    }

    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    return (
        <Container maxWidth="xs" style={{border: "1px solid black"}}>
            <CssBaseline />
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
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {/*<form className={classes.form} onSubmit={submitForm} ref={form}>*/}
                    {/*<Input />*/}
                    {/*<Grid container spacing={2}>*/}
                    {/*    <Grid item xs={12} sm={6}>*/}
                    {/*        <TextField*/}
                    {/*            // autoComplete="fname"*/}
                    {/*            name="firstName"*/}
                    {/*            variant="outlined"*/}
                    {/*            validations={[required, nameValidation]}*/}
                    {/*            fullWidth*/}
                    {/*            className="form-control"*/}
                    {/*            value={firstName}*/}
                    {/*            onChange={onChangeFirstName}*/}
                    {/*            // id="firstName"*/}
                    {/*            label="First Name"*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12} sm={6}>*/}
                    {/*        <TextField*/}
                    {/*            variant="outlined"*/}
                    {/*            // required*/}
                    {/*            fullWidth*/}
                    {/*            className="form-control"*/}

                    {/*            // id="lastName"*/}
                    {/*            validations={[required, nameValidation]}*/}
                    {/*            label="Last Name"*/}
                    {/*            name="lastName"*/}
                    {/*            // autoComplete="lname"*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <TextField*/}
                    {/*            variant="outlined"*/}
                    {/*            // required*/}
                    {/*            fullWidth*/}
                    {/*            // id="username"*/}
                    {/*            className="form-control"*/}

                    {/*            validations={[required, validUsername]}*/}
                    {/*            label="Username"*/}
                    {/*            name="username"*/}
                    {/*            autoComplete="uname"*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <TextField*/}
                    {/*            variant="outlined"*/}
                    {/*            // required*/}
                    {/*            fullWidth*/}
                    {/*            className="form-control"*/}

                    {/*            // id="email"*/}
                    {/*            validations={[validEmail, required]}*/}
                    {/*            label="Email Address"*/}
                    {/*            name="email"*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <TextField*/}
                    {/*            variant="outlined"*/}
                    {/*            required*/}
                    {/*            fullWidth*/}
                    {/*            name="password"*/}
                    {/*            label="Password"*/}
                    {/*            type="password"*/}
                    {/*            className="form-control"*/}

                    {/*            validations={[validPassword, required]}*/}
                    {/*            // id="password"*/}
                    {/*            autoComplete="current-password"*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12} sm={6}>*/}
                    {/*        <TextField*/}
                    {/*            variant="outlined"*/}
                    {/*            // required*/}
                    {/*            fullWidth*/}
                    {/*            id="address"*/}
                    {/*            label="Address"*/}
                    {/*            className="form-control"*/}

                    {/*            validations={[required]}*/}
                    {/*            name="address"*/}
                    {/*            // autoComplete="address"*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12} sm={6}>*/}
                    {/*        <TextField*/}
                    {/*            variant="outlined"*/}
                    {/*            // required*/}
                    {/*            fullWidth*/}
                    {/*            id="phoneNumber"*/}
                    {/*            label="Phone number"*/}
                    {/*            className="form-control"*/}

                    {/*            validations={[validPhoneNumber, required]}*/}
                    {/*            name="phoneNumber"*/}
                    {/*            // autoComplete="pnumber"*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12} sm={6}>*/}
                    {/*        /!*<InputLabel id="demo-simple-select-filled-label">Age</InputLabel>*!/*/}
                    {/*        <Select*/}
                    {/*            // labelId="demo-simple-select-filled-label"*/}
                    {/*            // id="demo-simple-select-filled"*/}
                    {/*            variant="outlined"*/}
                    {/*            fullWidth*/}
                    {/*            label="Gender"*/}
                    {/*            name="gender"*/}
                    {/*            validations={[required]}*/}
                    {/*            // value={age}*/}
                    {/*            className="form-control"*/}

                    {/*            // onChange={handleChange}*/}
                    {/*        >*/}
                    {/*            <MenuItem value="">*/}
                    {/*                <em>None</em>*/}
                    {/*            </MenuItem>*/}
                    {/*            <MenuItem value="Male">Male</MenuItem>*/}
                    {/*            <MenuItem value="Female">Female</MenuItem>*/}
                    {/*        </Select>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12} sm={6}>*/}
                    {/*        <TextField*/}
                    {/*            variant="outlined"*/}
                    {/*            className="form-control"*/}

                    {/*            // required*/}
                    {/*            type="number"*/}
                    {/*            fullWidth*/}
                    {/*            // id="age"*/}
                    {/*            validations={[required, validAge]}*/}
                    {/*            label="Age"*/}
                    {/*            name="age"*/}
                    {/*            // autoComplete="age"*/}
                    {/*        />*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                {/*    <Button*/}
                {/*        type="submit"*/}
                {/*        fullWidth*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        className={classes.submit}*/}
                {/*    >*/}
                {/*        Sign Up*/}
                {/*    </Button>*/}
                {/*    <Grid container justifyContent="flex-end">*/}
                {/*        <Grid item>*/}
                {/*            <Link href="/login" variant="body2">*/}
                {/*                Already have an account? Sign in*/}
                {/*            </Link>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</form>*/}
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
                {/*<div className="card card-container">*/}
                {/*    <img*/}
                {/*        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"*/}
                {/*        alt="profile-img"*/}
                {/*        className="profile-img-card"*/}
                {/*    />*/}
                    <br/>
                    <Form ref={form}>
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    // value={username}
                                    // onChange={onChangeUsername}
                                    // validations={[required, vusername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    // onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    // onChange={onChangePassword}
                                    validations={[required, validPassword]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <Select
                                    className="form-control"
                                    name="email"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Male</option>
                                </Select>
                            </div>
                            <br/>
                            <div className="form-group">
                                <Button type="submit" variant="contained" color="primary" block style={{margin: "10px"}}>Sign Up</Button>
                                <Button variant="outline-info" variant="contained" color="success" block href="/login">Back to login</Button>
                            </div>
                        </div>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                {/*</div>*/}
            </div>
        </Container>
    );
}

export default Register;
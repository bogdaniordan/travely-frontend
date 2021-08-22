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
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [gender, setGender] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState();
    const [age, setAge] = useState();

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

    const onChangeGender = event => {
        setGender(event.target.value)
    }

    const onChangePhoneNumber = event => {
        setPhoneNumber(event.target.value)
    }

    const onChangeAddress = event => {
        setAddress(event.target.value)
    }

    const onChangeAge = event => {
        setAge(event.target.value)
    }




    return (
        <Container maxWidth="xs" className="sign-up-container" style={{border: "1px solid black"}}>
            <CssBaseline />
            {/*{message && (*/}
            {/*    <div className="form-group">*/}
            {/*        <div*/}
            {/*            className={*/}
            {/*                successful ? "alert alert-success" : "alert alert-danger"*/}
            {/*            }*/}
            {/*            role="alert"*/}
            {/*        >*/}
            {/*            {message}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
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
                        <div>
                            <div className="form-group">
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
                            <div className="form-group">
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

                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <Select
                                    className="form-control"
                                    name="email"
                                    value={gender}
                                    onChange={onChangeGender}
                                    validations={[required]}
                                >
                                    <option value="" selected disabled hidden>Choose gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={onChangePhoneNumber}
                                    validations={[required, validPhoneNumber]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Address">Address</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={address}
                                    onChange={onChangeAddress}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    value={age}
                                    onChange={onChangeAge}
                                    validations={[required, validAge]}
                                />
                            </div>
                            <br/>
                            <div className="form-group">
                                <Button type="submit" variant="contained" color="primary" block style={{margin: "10px"}}>Sign Up</Button>
                                <Button variant="contained" color="success" block href="/login">Back to login</Button>
                            </div>
                        </div>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
            </div>
        </Container>
    );
}

export default Register;
import React, {useState, useEffect} from 'react';
import { Container } from "@material-ui/core";
import Navbar from "../navigation/Navbar";
import Button from "@material-ui/core/Button";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import {Form} from "react-bootstrap";


const UpdateProfile = () => {
    const [customer, setCustomer] = useState({});
    const history = useHistory();
    const [file, setFile] = useState();

    const getCustomer = () => {
        return CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(res => setCustomer(res.data))
    }

    const onChangeHandler = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value,
        });
    };

    const getProfilePicture = event => {
        setFile(event.target.files[0]);
    }

    useEffect(() => {
        getCustomer();
    }, []);

    function submitForm(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const newCustomer = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            address: data.get("address"),
            phoneNumber: data.get("phoneNumber"),
            gender: data.get("gender"),
            age: data.get("age"),
        }
        CustomerService.updateCustomer(newCustomer, customer.id);
        uploadImage();
        history.push(`/profile`);
    }

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", file);
        CustomerService.setImage(customer.id, formData);
    }

    return (

        <div>
            <Navbar />
            <Container
                style={{
                    border: "white",
                    height: "100%",
                    width: "50%",
                    margin: "auto",
                    marginTop: "5%",
                }}
            >
                <h1>Update details</h1>
                <form
                    className="form-signin"
                    method="post"
                    onSubmit={submitForm}
                >
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            onChange={onChangeHandler}
                            value={customer.firstName}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            onChange={onChangeHandler}
                            value={customer.lastName}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            onChange={onChangeHandler}
                            value={customer.phoneNumber}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                            Gender
                        </label>
                        <select
                            className="form-select form-select-sm mb-3"
                            aria-label=".form-select-sm example"
                            id="gender"
                            name="gender"
                            onChange={onChangeHandler}
                            value={customer.gender}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            onChange={onChangeHandler}
                            value={customer.email}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            onChange={onChangeHandler}
                            value={customer.address}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">
                            Age
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            name="age"
                            onChange={onChangeHandler}
                            value={customer.age}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label>Profile picture</Form.Label>
                        <Form.Control type="file" onChange={getProfilePicture}/>
                    </div>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default UpdateProfile;
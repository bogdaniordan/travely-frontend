import React, {useEffect, useState} from 'react';
import Navbar from "../../navigation/Navbar";
import Footer from "../../navigation/Footer";
import CustomerService from "../../../service/CustomerService";
import cover from "../../../images/cover_photo.jpg"
import Avatar from "@material-ui/core/Avatar";
import StatsBar from "../../customer/StatsBar";
import UserSocialBar from "./UserSocialBar";
import {useStyles} from "../../../styling/js-styling/AuthStyles";

const UserProfilePage = (props) => {
    const classes = useStyles();
    const userId = props.match.params.userId;
    const [user, setUser] = useState({})

    useEffect(() => {
        CustomerService.getCustomerById(userId).then(res => setUser(res.data))
    }, [])

    return (
        <div>
            <Navbar title={user.firstName + " " + user.lastName} subtitle="Checkout the stats and interact with other users"/>
            <div className="container">
                <Avatar src={user.provider !== "local" ? user.picture : `http://localhost:8080/customers/image/${userId}/download`} className={classes.otherUserProfile} />
                <img src={cover} className="other-user-profile-cover" alt="cover"/>
                <UserSocialBar userId={userId} name={user.firstName + " " + user.lastName}/>
                    <div className="row container d-flex justify-content-center" id="profile-inner-container">
                        <div className="col-xl-6 col-md-12" id="profile-second-inner">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-8"id="other-user-profile-container">
                                        <div className="card-block" >
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">INFORMATION</h6>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="m-b-10 f-w-600">EMAIL</p>
                                                    <h6 className="text-muted f-w-400">{user.email}</h6>
                                                </div>
                                                <div className="col-sm-3">
                                                    <p className="m-b-10 f-w-600">PHONE NUMBER</p>
                                                    <h6 className="text-muted f-w-400">{user.phoneNumber ? user.phoneNumber : "None"}</h6>
                                                </div>
                                                <div className="col-sm-3">
                                                    <p className="m-b-10 f-w-600">ADDRESS</p>
                                                    <h6 className="text-muted f-w-400">{user.address ? user.address : "None"}</h6>
                                                </div>
                                                <div className="col-sm-3">
                                                    <p className="m-b-10 f-w-600">AGE</p>
                                                    <h6 className="text-muted f-w-400">{user.age ? user.age : "None"}</h6>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                <StatsBar userId={userId} />
            </div>
            <Footer />
        </div>
    );
};

export default UserProfilePage;
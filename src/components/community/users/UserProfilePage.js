import React, {useEffect, useState} from 'react';
import Navbar from "../../navigation/Navbar";
import Footer from "../../navigation/Footer";
import CustomerService from "../../../service/CustomerService";
import cover from "../../../images/cover_photo.jpg"
import Avatar from "@material-ui/core/Avatar";
import StatsBar from "../../customer/StatsBar";
import Button from "@material-ui/core/Button";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import Modal from "react-modal";
import {customStyles} from "../../../styling/js-styling/ModalStyling";
import SavePaymentDetails from "../../payment/SavePaymentDetails";
import UserSocialBar from "./UserSocialBar";

const UserProfilePage = (props) => {
    const userId = props.match.params.userId;
    const [user, setUser] = useState({})

    useEffect(() => {
        CustomerService.getCustomerById(userId).then(res => setUser(res.data))
    }, [])

    return (
        <div>
            <Navbar title={user.firstName + " " + user.lastName} />
            <div className="container">
                <Avatar src={`http://localhost:8080/customers/image/${userId}/download`} style={{width: "150px", height: "150px", position: "absolute", marginLeft: "150px", marginTop: "150px", zIndex: 2}}/>
                <img src={cover} style={{width: "100%", height: "250px", marginBottom: "50px", borderRadius: "20px"}} alt="cover"/>
                <UserSocialBar userId={userId}/>
                {/*<div >*/}
                    <div className="row container d-flex justify-content-center" id="profile-inner-container">
                        <div className="col-xl-6 col-md-12" id="profile-second-inner">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    {/*<div className="col-sm-4 bg-c-lite-blue user-profile" id="profile-color">*/}
                                    {/*    <div className="card-block text-center text-white">*/}
                                    {/*        <div className="m-b-25"><img src={customer.picture ? `http://localhost:8080/customers/image/${customer.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} height="150px" width="150px"*/}
                                    {/*                                     className="img-radius" alt="User-Profile-Image"/></div>*/}
                                    {/*        <h6 className="f-w-600" id="profile-name-header">{customer.firstName} {customer.lastName}</h6>*/}
                                    {/*        <p><Button variant="contained" color="primary" onClick={updateProfile} endIcon={<SystemUpdateAltIcon />}>Update profile</Button></p>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="col-sm-8" style={{width: "100%"}}>
                                        <div className="card-block" >
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">INFORMATION</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">EMAIL</p>
                                                    <h6 className="text-muted f-w-400">{user.email}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">PHONE NUMBER</p>
                                                    <h6 className="text-muted f-w-400">{user.phoneNumber ? user.phoneNumber : "None"}</h6>
                                                </div>
                                            </div>
                                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                                            <br/>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">ADDRESS</p>
                                                    <h6 className="text-muted f-w-400">{user.address ? user.address : "None"}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">AGE</p>
                                                    <h6 className="text-muted f-w-400">{user.age ? user.age : "None"}</h6>
                                                </div>
                                            </div>
                                            <br/>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">GENDER</p>
                                                    <h6 className="text-muted f-w-400">{user.gender ? user.gender: "None"}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">CARD DETAILS</p>
                                                    {/*<h6 className="text-muted f-w-400"><Button color="primary" variant="contained" onClick={openModal}>EDIT</Button></h6>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                {/*</div>*/}
                {/*<StatsBar />*/}
            </div>
            <Footer />
        </div>
    );
};

export default UserProfilePage;
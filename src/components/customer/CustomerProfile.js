import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import Button from "@material-ui/core/Button";
import ProfileCard from "./ProfileCard";

const CustomerProfile = () => {
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(res => {setCustomer(res.data);})
    }, [])

        return (
            <div>
                <Navbar />
                <div className="page-content page-container" id="page-content">
                    <ProfileCard customer={customer}/>
                    {/*<div className="container mt-5">*/}
                    {/*    My bookings*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="col-md-4">*/}
                    {/*            <div className="card p-3">*/}
                    {/*                <div className="d-flex flex-row mb-3"><img src="https://i.imgur.com/ccMhxvC.png"*/}
                    {/*                                                           width="70"/>*/}
                    {/*                    <div className="d-flex flex-column ml-2"><span>Stripe</span><span*/}
                    {/*                        className="text-black-50">Payment Services</span><span*/}
                    {/*                        className="ratings"><i className="fa fa-star"></i><i*/}
                    {/*                        className="fa fa-star"></i><i className="fa fa-star"></i><i*/}
                    {/*                        className="fa fa-star"></i></span></div>*/}
                    {/*                </div>*/}
                    {/*                <h6>Get more context on your users with stripe data inside our platform.</h6>*/}
                    {/*                <div className="d-flex justify-content-between install mt-3"><span>Installed 172 times</span><span*/}
                    {/*                    className="text-primary">View&nbsp;<i className="fa fa-angle-right"></i></span>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="col-md-4">*/}
                    {/*            <div className="card p-3">*/}
                    {/*                <div className="d-flex flex-row mb-3"><img src="https://i.imgur.com/IpKQiNu.png"*/}
                    {/*                                                           width="70"/>*/}
                    {/*                    <div className="d-flex flex-column ml-2"><span>Mailchimp</span><span*/}
                    {/*                        className="text-black-50">Project Management</span><span*/}
                    {/*                        className="ratings"><i className="fa fa-star"></i><i*/}
                    {/*                        className="fa fa-star"></i><i className="fa fa-star"></i><i*/}
                    {/*                        className="fa fa-star"></i></span></div>*/}
                    {/*                </div>*/}
                    {/*                <h6>Capture and sync subscribers from your mailchimp platform to ours with*/}
                    {/*                    ease.</h6>*/}
                    {/*                <div className="d-flex justify-content-between install mt-3"><span>Installed 1234 times</span><span*/}
                    {/*                    className="text-primary">View&nbsp;<i className="fa fa-angle-right"></i></span>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

            </div>
        );
};

export default CustomerProfile;
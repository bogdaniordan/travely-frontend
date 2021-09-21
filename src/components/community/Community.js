import React, {useState, useEffect} from 'react';
import Footer from "../navigation/Footer";
import Navbar from "../navigation/Navbar";
import Recommendations from "./Recommendations";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import Customers from "./Customers";
import Avatar from "@material-ui/core/Avatar";
import BookingService from "../../service/BookingService";
import {Divider} from "@material-ui/core";
import UserPost from "./UserPost";
import PostService from "../../service/PostService";

const Community = () => {
    const [user, setUser] = useState({})
    const [bookings, setBookings] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(
            res => setUser(res.data)
        )
        BookingService.getAllByCustomerId().then(res => setBookings(res.data))
        PostService.findAll().then(res => setPosts(res.data))
    }, [])

    return (
        <div>
            <Navbar title={"Community"} subtitle={"Browse different communities."}/>

            <div className="container">
                <div className="container-fluid gedf-wrapper" style={{backgroundColor: "white"}}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="h5">@{user.firstName} {user.lastName}</div>
                                    <div className="h7 text-muted">Email : {user.email}</div>
                                    <br/>
                                    <div className="h7">Favourite cities: Miami, Copenhagen, Rotterdam, L.A. and Stockholm.
                                    </div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="h6 text-muted">Trips</div>
                                        <div className="h5">{bookings.length}</div>
                                    </li>
                                    <Customers />
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 gedf-main">

                            <div className="card gedf-card">
                                <div className="card-body">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="posts" role="tabpanel"
                                             aria-labelledby="posts-tab">
                                            <div className="form-group">
                                                <label className="sr-only" htmlFor="message">post</label>
                                                <textarea className="form-control" id="message" rows="3"
                                                          placeholder="What are you thinking?"></textarea>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="btn-toolbar justify-content-between">
                                        <div className="btn-group">
                                            <button type="submit" className="btn btn-primary">POST</button>
                                        </div>
                                        {/*<div className="btn-group">*/}
                                        {/*    <button id="btnGroupDrop1" type="button"*/}
                                        {/*            className="btn btn-link dropdown-toggle" data-toggle="dropdown"*/}
                                        {/*            aria-haspopup="true"*/}
                                        {/*            aria-expanded="false">*/}
                                        {/*        <i className="fa fa-globe"></i>*/}
                                        {/*    </button>*/}
                                        {/*    <div className="dropdown-menu dropdown-menu-right"*/}
                                        {/*         aria-labelledby="btnGroupDrop1">*/}
                                        {/*        <a className="dropdown-item" href="#"><i className="fa fa-globe"></i> Public</a>*/}
                                        {/*        <a className="dropdown-item" href="#"><i*/}
                                        {/*            className="fa fa-users"></i> Friends</a>*/}
                                        {/*        <a className="dropdown-item" href="#"><i className="fa fa-user"></i> Just me</a>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                            {
                                posts.map(
                                    post => <UserPost post={post}/>
                                )
                            }




                        </div>
                    <Recommendations />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Community;
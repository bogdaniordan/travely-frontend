import React, {useEffect, useState} from 'react';
import Footer from "../navigation/Footer";
import Navbar from "../navigation/Navbar";
import Recommendations from "./Recommendations";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import Customers from "./Customers";
import BookingService from "../../service/BookingService";
import UserPost from "./UserPost";
import PostService from "../../service/PostService";
import {useForm} from "react-hook-form";

const Community = () => {
    const [user, setUser] = useState({})
    const [bookings, setBookings] = useState([])
    const [posts, setPosts] = useState([])

    const { register, handleSubmit, formState: {errors} } = useForm();

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(
            res => setUser(res.data)
        )
        BookingService.getAllByCustomerId().then(res => setBookings(res.data));
        getAllPosts();

    }, [])

    const getAllPosts = () => {
        PostService.findAll().then(res => setPosts(res.data))
    }

    return (
        <div>
            <Navbar title={"Community"} subtitle={"Interact with other users of Travely."}/>
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
                                                <form onSubmit={
                                                    handleSubmit((data) => {
                                                        PostService.addPost(data).then(res => getAllPosts())
                                                    })
                                                }>
                                                    <label className="sr-only" htmlFor="message">Title</label>
                                                    <input
                                                        className="form-control"
                                                        type="text" id="message"
                                                        style={{width: "100%"}}
                                                        placeholder="Post title"
                                                        {...register("title", {required: true, minLength: 5})}
                                                    />
                                                    {errors.title && <span style={{color:"red"}}>Title's length has to be at least 5 characters.</span>}
                                                    <label className="sr-only" htmlFor="message">Content</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="message"
                                                        rows="3"
                                                        placeholder="What are you thinking?"
                                                        {...register("content", {required: true, minLength: 5})}
                                                    ></textarea>
                                                    {errors.content && <span style={{color:"red"}}>Post content length has to be at least 5 characters.</span>}
                                                    <button type="submit" className="btn btn-primary">POST</button>
                                                </form>
                                            </div>
                                        </div>
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
import React, {useEffect, useState} from 'react';
import Footer from "../navigation/Footer";
import Navbar from "../navigation/Navbar";
import Recommendations from "../recommendation/Recommendations";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import Friends from "./users/Friends";
import BookingService from "../../service/BookingService";
import UserPost from "./UserPost";
import PostService from "../../service/PostService";
import {useForm} from "react-hook-form";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {Collapse} from "@material-ui/core";
import PostNotifications from "./PostNotifications";

const Community = () => {
    const [user, setUser] = useState({})
    const [bookings, setBookings] = useState([])
    const [posts, setPosts] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [searchInput, setSearchInput] = useState("");
    const [showAddPost, setShowAddPost] = useState(true);

    const { register, handleSubmit, formState: {errors} } = useForm();

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(res => setUser(res.data))
        BookingService.getAllByCustomerId(AuthService.getCurrentUser().id).then(res => setBookings(res.data));
        PostService.findAll().then(res => setPosts(res.data))
    }, [])

    const filterPosts = e => {
        if (e.target.value === "all_posts") {
            PostService.findAll().then(res => setPosts(res.data));
        } else if (e.target.value === "my_posts") {
            PostService.findAll().then(res => setPosts(res.data.filter(post => post.author.id === AuthService.getCurrentUser().id)))
        } else {
            PostService.findAll().then(res => setPosts(res.data.filter(post => post.author.id !== AuthService.getCurrentUser().id)))
        }
    }

    const showSearchBar = () => {
        setShowSearch(!showSearch)
        setShowAddPost(!showAddPost)
    }

    const search = () => {
        if(searchInput.length > 0) {
            PostService.searchPosts(searchInput).then(res => {
                setPosts(res.data.reverse())
            })
        }
    }

    return (
        <div>
            <Navbar title={"Community"} subtitle={"Interact with other users of Travely."}/>
            <div className="container">
                <div className="container-fluid gedf-wrapper" id="community-container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="h5">Filter posts</h4>
                                        <div className="h7 text-muted">
                                            <select className="form-control" onChange={filterPosts}>
                                                <option value="all_posts">All posts</option>
                                                <option value="my_posts">My posts</option>
                                                <option value="other_posts">Other's posts</option>
                                            </select>
                                            <br/>
                                            <Button variant="outlined" color="primary" onClick={showSearchBar}>{showSearch ? "Hide search" : "Search Posts"}</Button>
                                        </div>
                                    </div>
                                </div>
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
                                    <Friends />
                                </ul>
                            </div>
                            <PostNotifications />
                        </div>
                        <div className="col-md-6 gedf-main">
                            <div className="card gedf-card">
                                <div className="card-body">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="posts" role="tabpanel"
                                             aria-labelledby="posts-tab">
                                            <div className="form-group">
                                                <Collapse in={showAddPost}>
                                                    <form onSubmit={
                                                        handleSubmit((data) => {
                                                            PostService.addPost(data).then(res => {
                                                                PostService.findAll().then(r => setPosts(r.data))
                                                            })
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
                                                        {errors.title && <p className="red-colored">Title's length has to be at least 5 characters.</p>}
                                                        <label className="sr-only">Location</label>
                                                        <select
                                                            className="form-control"
                                                            {...register("location", {required: true})}
                                                        >
                                                            <option value="" selected disabled hidden>City</option>
                                                            <option value="London">London</option>
                                                            <option value="Boston">Boston</option>
                                                            <option value="Mumbai">Mumbai</option>
                                                            <option value="Toronto">Toronto</option>
                                                            <option value="Paris">Paris</option>
                                                        </select>
                                                        {errors.location && <p className="red-colored">Select a location</p>}
                                                        <label className="sr-only" htmlFor="message">Content</label>
                                                        <textarea
                                                            className="form-control"
                                                            id="message"
                                                            rows="3"
                                                            placeholder="What are you thinking?"
                                                            {...register("content", {required: true, minLength: 5})}
                                                        ></textarea>
                                                        {errors.content && <p className="red-colored">Post content length has to be at least 5 characters.</p>}
                                                        <Button type="submit" variant="outlined" color="primary">POST</Button>
                                                    </form>
                                                </Collapse>

                                                <Collapse in={showSearch}>
                                                    <div>
                                                        <br/>
                                                        <h5>Search posts</h5>
                                                        <div className="flexed-container">
                                                            <input id="post-search-bar" className="form-control" type="text" onChange={e => setSearchInput(e.target.value)}/>
                                                            <Button variant="outlined" color="primary" onClick={search} style={{height: "84%", marginTop: "6px"}}>Search</Button>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                posts.map(
                                    post => <UserPost post={post} posts={posts} setPosts={setPosts}/>
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
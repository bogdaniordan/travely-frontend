import React, {useState, useEffect} from 'react';
import Footer from "../navigation/Footer";
import Navbar from "../navigation/Navbar";
import Recommendations from "./Recommendations";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import Customers from "./Customers";
import Avatar from "@material-ui/core/Avatar";

const Community = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(
            res => setUser(res.data)
        )
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
                                    <div className="h7 text-muted">Fullname : Miracles Lee Cross</div>
                                    <div className="h7">Developer of web applications, JavaScript, PHP, Java, Python, Ruby,
                                        Java, Node.js,
                                        etc.
                                    </div>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="h6 text-muted">Followers</div>
                                        <div className="h5">5.2342</div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="h6 text-muted">Following</div>
                                        <div className="h5">6758</div>
                                    </li>
                                    <Customers />
                                    {/*<li className="list-group-item">*/}
                                    {/*    <div className="h6 text-muted">Users</div>*/}
                                    {/*    <div className="h5">*/}
                                    {/*        <Avatar  style={{margin: "auto"}}/>*/}
                                    {/*        <p>Gigel</p>*/}
                                    {/*    </div>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>
                        </div>
                        {/*<Customers />*/}
                        <div className="col-md-6 gedf-main">

                            <div className="card gedf-card">
                                {/*<div className="card-header">*/}
                                {/*    <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">*/}
                                {/*        <li className="nav-item">*/}
                                {/*            <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts"*/}
                                {/*               role="tab" aria-controls="posts" aria-selected="true">Make*/}
                                {/*                a publication</a>*/}
                                {/*        </li>*/}
                                {/*        <li className="nav-item">*/}
                                {/*            <a className="nav-link" id="images-tab" data-toggle="tab" role="tab"*/}
                                {/*               aria-controls="images" aria-selected="false" href="#images">Images</a>*/}
                                {/*        </li>*/}
                                {/*    </ul>*/}
                                {/*</div>*/}
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
                                            <button type="submit" className="btn btn-primary">share</button>
                                        </div>
                                        <div className="btn-group">
                                            <button id="btnGroupDrop1" type="button"
                                                    className="btn btn-link dropdown-toggle" data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false">
                                                <i className="fa fa-globe"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right"
                                                 aria-labelledby="btnGroupDrop1">
                                                <a className="dropdown-item" href="#"><i className="fa fa-globe"></i> Public</a>
                                                <a className="dropdown-item" href="#"><i
                                                    className="fa fa-users"></i> Friends</a>
                                                <a className="dropdown-item" href="#"><i className="fa fa-user"></i> Just me</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card gedf-card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="mr-2">
                                                <img className="rounded-circle" width="45" src="https://picsum.photos/50/50"
                                                     alt=""/>
                                            </div>
                                            <div className="ml-2">
                                                <div className="h5 m-0">@LeeCross</div>
                                                <div className="h7 text-muted">Miracles Lee Cross</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="dropdown">
                                                <button className="btn btn-link dropdown-toggle" type="button"
                                                        id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                    <i className="fa fa-ellipsis-h"></i>
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right"
                                                     aria-labelledby="gedf-drop1">
                                                    <div className="h6 dropdown-header">Configuration</div>
                                                    <a className="dropdown-item" href="#">Save</a>
                                                    <a className="dropdown-item" href="#">Hide</a>
                                                    <a className="dropdown-item" href="#">Report</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="text-muted h7 mb-2"><i className="fa fa-clock-o"></i>10 min ago</div>
                                    <a className="card-link" href="#">
                                        <h5 className="card-title">Lorem ipsum dolor sit amet, consectetur adip.</h5>
                                    </a>

                                    <p className="card-text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae nulla rem
                                        eos ipsa praesentium esse magnam nemo dolor
                                        sequi fuga quia quaerat cum, obcaecati hic, molestias minima iste voluptates.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                                    <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                                    <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                                </div>
                            </div>


                            {/*<div className="card gedf-card">*/}
                            {/*    <div className="card-header">*/}
                            {/*        <div className="d-flex justify-content-between align-items-center">*/}
                            {/*            <div className="d-flex justify-content-between align-items-center">*/}
                            {/*                <div className="mr-2">*/}
                            {/*                    <img className="rounded-circle" width="45" src="https://picsum.photos/50/50"*/}
                            {/*                         alt=""/>*/}
                            {/*                </div>*/}
                            {/*                <div className="ml-2">*/}
                            {/*                    <div className="h5 m-0">@LeeCross</div>*/}
                            {/*                    <div className="h7 text-muted">Miracles Lee Cross</div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*            <div>*/}
                            {/*                <div className="dropdown">*/}
                            {/*                    <button className="btn btn-link dropdown-toggle" type="button"*/}
                            {/*                            id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true"*/}
                            {/*                            aria-expanded="false">*/}
                            {/*                        <i className="fa fa-ellipsis-h"></i>*/}
                            {/*                    </button>*/}
                            {/*                    <div className="dropdown-menu dropdown-menu-right"*/}
                            {/*                         aria-labelledby="gedf-drop1">*/}
                            {/*                        <div className="h6 dropdown-header">Configuration</div>*/}
                            {/*                        <a className="dropdown-item" href="#">Save</a>*/}
                            {/*                        <a className="dropdown-item" href="#">Hide</a>*/}
                            {/*                        <a className="dropdown-item" href="#">Report</a>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}

                            {/*    </div>*/}
                            {/*    <div className="card-body">*/}
                            {/*        <div className="text-muted h7 mb-2"><i className="fa fa-clock-o"></i> 10 min ago</div>*/}
                            {/*        <a className="card-link" href="#">*/}
                            {/*            <h5 className="card-title"> Lorem ipsum dolor sit amet consectetur adipisicing elit.*/}
                            {/*                Velit consectetur*/}
                            {/*                deserunt illo esse distinctio.</h5>*/}
                            {/*        </a>*/}

                            {/*        <p className="card-text">*/}
                            {/*            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam omnis nihil, aliquam*/}
                            {/*            est, voluptates officiis iure soluta*/}
                            {/*            alias vel odit, placeat reiciendis ut libero! Quas aliquid natus cumque quae*/}
                            {/*            repellendus. Lorem*/}
                            {/*            ipsum dolor sit amet consectetur adipisicing elit. Ipsa, excepturi. Doloremque,*/}
                            {/*            reprehenderit!*/}
                            {/*            Quos in maiores, soluta doloremque molestiae reiciendis libero expedita assumenda*/}
                            {/*            fuga quae.*/}
                            {/*            Consectetur id molestias itaque facere? Hic!*/}
                            {/*        </p>*/}
                            {/*        <div>*/}
                            {/*            <span className="badge badge-primary">JavaScript</span>*/}
                            {/*            <span className="badge badge-primary">Android</span>*/}
                            {/*            <span className="badge badge-primary">PHP</span>*/}
                            {/*            <span className="badge badge-primary">Node.js</span>*/}
                            {/*            <span className="badge badge-primary">Ruby</span>*/}
                            {/*            <span className="badge badge-primary">Paython</span>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="card-footer">*/}
                            {/*        <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>*/}
                            {/*        <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>*/}
                            {/*        <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
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
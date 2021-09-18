import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../auth/Login";
import AuthService from "../../service/AuthService";
import HomePage from "./HomePage";
import AccommodationDetails from "../accommodation/AccommodationDetails";
import Payment from "../customer/Payment";
import CustomerProfile from "../customer/CustomerProfile";
import UpdateProfile from "../customer/UpdateProfile"
import QuestionForm from "../questions/QuestionForm";
import QuestionsPage from "../questions/QuestionsPage";
import AddTestimonial from "../testimonial/AddTestimonial";
import ResetPassword from "../auth/ResetPassword";
import Community from "../community/Community";
import ChatPage from "../chat/ChatPage";


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact render={() => AuthService.getCurrentUser() ? <HomePage /> : <Redirect to="/login"/>} />
                    <Route path="/register" exact render={() => !AuthService.getCurrentUser() ? <Register /> : <Redirect to="/"/>} />
                    <Route path="/login" exact render={() => !AuthService.getCurrentUser() ? <Login /> : <Redirect to="/"/>} />
                    <Route path="/accommodation/:id" exact component={AccommodationDetails}/>
                    <Route path="/payment" exact component={Payment} />
                    <Route path="/profile" exact component={CustomerProfile} />
                    <Route path="/update-profile" exact component={UpdateProfile} />
                    <Route path="/ask-question/:bookingId" exact component={QuestionForm} />
                    <Route path="/questions/:hostId" exact component={QuestionsPage} />
                    <Route path="/add-testimonial" exact component={AddTestimonial} />
                    <Route path="/reset-password/:token" component={ResetPassword}/>
                    <Route path="/community" component={Community} />
                    <Route path="/chat/:userId" component={ChatPage}/>
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
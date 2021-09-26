import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../auth/Login";
import AuthService from "../../service/AuthService";
import HomePage from "./HomePage";
import AccommodationDetails from "../accommodation/AccommodationDetails";
import Payment from "../payment/Payment";
import CustomerProfile from "../customer/CustomerProfile";
import UpdateProfile from "../customer/UpdateProfile"
import QuestionForm from "../questions/QuestionForm";
import QuestionsPage from "../questions/QuestionsPage";
import AddTestimonial from "../testimonial/AddTestimonial";
import ResetPassword from "../auth/ResetPassword";
import Community from "../community/Community";
import ChatPage from "../chat/ChatPage";
import CustomerLandingPage from "./CustomerLandingPage";
import HostLandingPage from "./HostLandingPage";
import PeoplePage from "../community/users/PeoplePage";
import SuccessfulPayment from "../payment/SuccessfulPayment";
// import 'bulma/css/bulma.min.css';

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={CustomerLandingPage}/>
                    <Route path="/home" exact render={() => AuthService.getCurrentUser() ? <HomePage /> : <Redirect to="/"/>} />
                    <Route path="/register" exact component={Register} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/accommodation/:id" exact component={AccommodationDetails}/>
                    <Route path="/payment" exact component={Payment} />
                    <Route path="/profile" exact render={() => AuthService.getCurrentUser() ? <CustomerProfile /> : <Redirect to="/"/>} />
                    <Route path="/update-profile" exact component={UpdateProfile} />
                    <Route path="/ask-question/:bookingId" exact component={QuestionForm} />
                    <Route path="/questions/:hostId" exact component={QuestionsPage} />
                    <Route path="/add-testimonial" exact component={AddTestimonial} />
                    <Route path="/reset-password/:token" exact component={ResetPassword}/>
                    <Route path="/community" exact component={Community} />
                    <Route path="/chat/:userId" exact component={ChatPage}/>
                    <Route path="/customer-landing-page" exact component={CustomerLandingPage} />
                    <Route path="/host-landing-page" exact component={HostLandingPage} />
                    <Route path="/people" exact component={PeoplePage} />
                    <Route path="/success-payment" exact component={SuccessfulPayment} />
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
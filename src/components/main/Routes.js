import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../auth/Login";
import AuthService from "../../service/AuthService";
import HomePage from "./HomePage";
import Accommodation from "../accommodation/Accommodation";

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/register" exact render={() => !AuthService.getCurrentUser() ? <Register /> : <Redirect to="/"/>} />
                    <Route path="/login" exact render={() => !AuthService.getCurrentUser() ? <Login /> : <Redirect to="/"/>} />
                    <Route path="/accommodation/:id" exact component={Accommodation}/>
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../auth/Login";
import AuthService from "../../service/AuthService";

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/register" exact render={() => AuthService.getCurrentUser() ? <Register /> : <Redirect to="/"/>} />
                    <Route path="/login" exact render={() => AuthService.getCurrentUser() ? <Login /> : <Redirect to="/"/>} />
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "../auth/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../auth/Login";

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/register"} exact component={Register}/>
                    <Route path={"/login"} exact component={Login} />
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
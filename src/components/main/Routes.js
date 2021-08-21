import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import Register from "../auth/Register";

const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/"} exact component={Register}/>
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;
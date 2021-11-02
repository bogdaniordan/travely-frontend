import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import AuthHeader from "./AuthHeader";

const Oauth2RedirectHandler = (props) => {
    const history = useHistory();

    const getUrlParameter = name => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        let results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        const token = getUrlParameter('token');
        const error = getUrlParameter('error');
        console.log(token)
        if (token) {
            localStorage.setItem("user", JSON.stringify({token: token}))
            axios.get("http://localhost:8080/customers/profile", {headers: AuthHeader()})
                .then(response => {
                    console.log(response.data)
                })
        } else {

        }
    }, [])

    return (
        <div>

        </div>
    )
};

export default Oauth2RedirectHandler;
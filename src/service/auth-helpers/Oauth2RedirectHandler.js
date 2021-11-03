import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import CustomerService from "../CustomerService";

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
        if (token) {
            localStorage.setItem("user", JSON.stringify({token: token}))
                CustomerService.getOauthProfile().then(response => {
                    console.log(response.data)
                    localStorage.setItem("user", JSON.stringify({
                        token: token,
                        id: response.data.id,
                        roles: ["ROLE_CUSTOMER"]
                    }))
                    history.push("/home")
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
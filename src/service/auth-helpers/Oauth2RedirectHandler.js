import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import CustomerService from "../CustomerService";
import LandingPageNavbar from "../../components/navigation/LandingPageNavbar";

const Oauth2RedirectHandler = (props) => {
    const history = useHistory();
    const [error, setError] = useState("");
    const [showErrorPage, setShowErrorPage] = useState(false)

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
                    localStorage.setItem("user", JSON.stringify({
                        token: token,
                        id: response.data.id,
                        roles: ["ROLE_CUSTOMER"]
                    }))
                    history.push("/home")
                })
        } else {
            setError(error)
            setShowErrorPage(true)
        }
    }, [])

    return (
        <>
            {
                showErrorPage && (
                    <>
                        <LandingPageNavbar />
                        <div className="mainbox">
                            <div className="err">4</div>
                            <i className="far fa-question-circle fa-spin"></i>
                            <div className="err2">4</div>
                            <div className="error-msg">
                                Error while logging in with OAuth2. {error}
                            </div>
                        </div>
                    </>

                )
            }
        </>
    )
};

export default Oauth2RedirectHandler;
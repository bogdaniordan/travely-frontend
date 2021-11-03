import React from 'react';
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../utils/OAuthEndpoints";
import googleLogo from "../../images/oauth/google-logo.png";
import fbLogo from "../../images/oauth/fb-logo.png"
import githubLogo from "../../images/oauth/github-logo.png"
import "../../styling/SocialAuthStyling.css"

const SocialLogin = () => {
    return (
        <>
            <div className="social-login">
                <a className="social-btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Log in with Google</a>
                <a className="social-btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
                <a className="social-btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Log in with Github</a>
            </div>
            <div className="or-separator">
                <span className="or-text">OR</span>
            </div>
        </>
    );
};

export default SocialLogin;
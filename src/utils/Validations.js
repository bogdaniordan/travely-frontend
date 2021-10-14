import {isEmail} from "validator";
import React from "react";

export const required = (value) => {
    if (!value) {
        return (
            <div>
                <small className="validation-negative">
                    This field is required!
                </small>
                <br/>
            </div>
        );
    }
};

export const nameValidation = value => {
    if (value.length < 3 && value.length > 15) {
        return (
            <div className="validation-negative">
                <small>
                    Name must be between 3 and 15 characters long.
                </small>
                <br/>
            </div>
        );
    }
}

export const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="validation-negative">
                <small>
                    Enter a valid email.
                </small>
                <br/>
            </div>
        );
    }
};


export const validUsername = (value) => {
    if (value.length < 3 || value.length > 25) {
        return (
            <div className="validation-negative">
                <small>
                    The username must be between 3 and 25 characters.
                </small>
                <br/>
            </div>
        );
    }
};

export const validPassword = (value) => {
    if (value.length < 5 || value.length > 25) {
        return (
            <div className="validation-negative">
                <small>
                    The password must be between 5 and 25 characters long.
                </small>
                <br/>
            </div>
        );
    }
};


export const validLength = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="validation-negative">
                <small>
                    Input length must not be lowed than 3 or higher than 20.
                </small>
                <br/>
            </div>
        );
    }
}

export const validAge = value => {
    if (value < 18) {
        return (
            <div className="validation-negative">
                <small>
                    You must be at least 18 years old.
                </small>
                <br/>
            </div>
        );
    }
}


export const validCardName = value => {
    if (value.length < 7 || value.length > 25 || !value.includes("")) {
        return (
            <div className="validation-negative">
                <small>
                    Please enter a valid cardholder name.
                </small>
                <br/>
            </div>
        );
    }
}

export const validCreditCardNumber = value => {
    if (value.length !== 16 || !(/^\d+$/.test(value))) {
        return (
            <div className="validation-negative">
                <small>
                    Please enter a valid credit card number.
                </small>
                <br/>
            </div>
        );
    }
}

export const validExpirationDate = value => {
    if (value.length < 2 || value.length > 7 || !value.includes("/")) {
        return (
            <div className="validation-negative">
                <small>
                    Please enter a expiration date.
                </small>
                <br/>
            </div>
        );
    }
}

export const validCVV = value => {
    if (value.length !== 3 || !(/^\d+$/.test(value))) {
        return (
            <div className="validation-negative">
                <small>
                    Please enter a valid CVV.
                </small>
                <br/>
            </div>
        );
    }
}
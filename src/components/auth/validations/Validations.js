import {isEmail} from "validator";
import React from "react";

export const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export const nameValidation = value => {
    if (value.length < 3 && value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Name must be between 3 and 15 characters long.
            </div>
        );
    }
}

export const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};


export const validUsername = (value) => {
    if (value.length < 3 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 25 characters.
            </div>
        );
    }
};

export const validPassword = (value) => {
    if (value.length < 5 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 5 and 25 characters.
            </div>
        );
    }
};

export const validPhoneNumber = (value) => {
    if (value.length < 5 || value.length > 15) {
        return (
            <div className="alert alert-danger" role="alert">
                Phone number must be between 5 and 15 and must be only digits.
            </div>
        );
    }
}

export const validAge = value => {
    if (value < 18) {
        return (
            <div className="alert alert-danger" role="alert">
                You must be at least 18 years old.
            </div>
        );
    }
}


export const validCardName = value => {
    if (value.length < 5 || value.length > 25) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter a valid cardholder name.
            </div>
        );
    }
}

export const validCreditCardNumber = value => {
    if (value.length < 10 || value.length > 25 || !(/^\d+$/.test(value))) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter a valid credit card number.
            </div>
        );
    }
}

export const validExpirationDate = value => {
    if (value.length < 2 || value.length > 7 || !value.includes("/")) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter a expiration date.
            </div>
        );
    }
}

export const validCVV = value => {
    if (value.length !== 3 || !(/^\d+$/.test(value))) {
        return (
            <div className="alert alert-danger" role="alert">
                Please enter a valid CVV.
            </div>
        );
    }
}
import axios from "axios";

const API_URL = "http://localhost:8080/auth";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "/sign-in", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstName, lastName, username, password, email, address, phoneNumber, gender, age) {
        return axios.post(API_URL + "/register-customer", {
            firstName,
            lastName,
            username,
            password,
            email,
            address,
            phoneNumber,
            gender,
            age
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    verifyResetPasswordToken(token) {
        return axios.get(`${API_URL}/verify-password-token/${token}`)
    }

    savePassword(password, token) {
        return axios.post(`${API_URL}/save-password`, {
            token: token,
            password: password
        })
    }

    sendResetPasswordEmail(data) {
        return axios.get(`${API_URL}/reset-password/${data.email}`)
    }
}

export default new AuthService();

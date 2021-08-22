import axios from "axios";

const API_URL = "http://localhost:8080/auth";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "/register-customer", {
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
}

export default new AuthService();

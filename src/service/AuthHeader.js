import ExpiredTokenService from "./ExpiredTokenService";

export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    ExpiredTokenService();

    if (user && user.token) {
        return { Authorization : 'Bearer ' + user.token };
    } else {
        return {};
    }
}
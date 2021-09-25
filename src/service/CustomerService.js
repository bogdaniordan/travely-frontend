import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";
import AuthService from "./AuthService";

const CUSTOMER_SERVICE_API_URL = "http://localhost:8080/customers";

class CustomerService {
    getCustomerById(id) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/${id}`, { headers: AuthHeader() });
    }

    saveCardDetails(cardName, cardNumber, expirationDate, cvv, id) {
        return axios.post(`${CUSTOMER_SERVICE_API_URL}/save-card/${id}`, {
            cardName: cardName,
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            cvv: cvv
        }, { headers: AuthHeader() })
    }

    setImage(customerId, file) {
        return axios.post(`${CUSTOMER_SERVICE_API_URL}/image/upload/${customerId}`, file, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + AuthService.getCurrentUser().token
            }
        })
    }

    updateCustomer(customer, id) {
        return axios.put(`${CUSTOMER_SERVICE_API_URL}/update/${id}`, customer, { headers: AuthHeader() });
    }

    cardDetailsExist(id) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/card-details-exist/${id}`, {headers: AuthHeader()});
    }

    getAllCustomersExcept(id) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/all-customers-except/${id}`, {headers: AuthHeader()})
    }

    addFriend(friendId) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/add-friend/${AuthService.getCurrentUser().id}/${friendId}`, {headers: AuthHeader()})
    }

    removeFriend(friendId) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/remove-friend/${AuthService.getCurrentUser().id}/${friendId}`, {headers: AuthHeader()})
    }

    getFriends() {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/get-friends/${AuthService.getCurrentUser().id}`, {headers: AuthHeader()});
    }

    getSuggestedPeople() {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/get-suggested/${AuthService.getCurrentUser().id}`, {headers: AuthHeader()});
    }

    personIsFriend(personId) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/people-are-friends/${AuthService.getCurrentUser().id}/${personId}`, {headers: AuthHeader()});
    }

    getMutualFriends(id) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/get-mutual-friends/${AuthService.getCurrentUser().id}/${id}`, {headers: AuthHeader()})
    }

    acceptFriendRequest(receiverId) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/accept-friend-request/${AuthService.getCurrentUser().id}/${receiverId}`, {headers: AuthHeader()})
    }

    denyFriendRequest(receiverId) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/deny-friend-request/${AuthService.getCurrentUser().id}/${receiverId}`, {headers: AuthHeader()})
    }

    friendRequestSentToUser(receiverId) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/sent-friend-request/${AuthService.getCurrentUser().id}/${receiverId}`, {headers: AuthHeader()})
    }

    cancelFriendRequest(receiverId) {
        return axios.delete(`${CUSTOMER_SERVICE_API_URL}/cancel-friend-request/${AuthService.getCurrentUser().id}/${receiverId}`, {headers: AuthHeader()})
    }

    receivedFriendRequest(senderId) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/received-friend-request/${senderId}/${AuthService.getCurrentUser().id}`, {headers: AuthHeader()});
    }
}

export default new CustomerService;
import axios from "axios";
import AuthHeader from "./AuthHeader";

const RECOMMENDATION_SERVICE_API_URL = "http://localhost:8080/recommendations";


class RecommendationService {
    saveRecommendation(message, senderId, receiverId, accommodationId) {
        return axios.post(`${RECOMMENDATION_SERVICE_API_URL}/save/${receiverId}/${senderId}/${accommodationId}`, {
            message: message
        }, {headers: AuthHeader()})
    }

    findAllForCustomer(id) {
        return axios.get(`${RECOMMENDATION_SERVICE_API_URL}/all-for/${id}`, {headers: AuthHeader()});
    }

    getUsersWhoCanGetRecommendations(senderId, accommodationId) {
        return axios.get(`${RECOMMENDATION_SERVICE_API_URL}/get-all-receivers/${senderId}/${accommodationId}`, {headers: AuthHeader()})
    }
}

export default new RecommendationService;
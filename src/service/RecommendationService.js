import axios from "axios";
import AuthHeader from "./AuthHeader";

const RECOMMENDATION_SERVICE_API_URL = "http://localhost:8080/recommendations";


class RecommendationService {
    saveRecommendation(recommendation, senderId, receiverId) {
        return axios.post(`${RECOMMENDATION_SERVICE_API_URL}/save/${receiverId}/${senderId}`, recommendation, {headers: AuthHeader()})
    }

    findAllForCustomer(id) {
        return axios.get(`${RECOMMENDATION_SERVICE_API_URL}/all-for/${id}`, {headers: AuthHeader()});
    }

    getUsersWhoCanGetRecommendations(senderId, accommodationId) {
        return axios.get(`${RECOMMENDATION_SERVICE_API_URL}/get-all-receivers/${senderId}/${accommodationId}`, {headers: AuthHeader()})
    }
}

export default new RecommendationService;
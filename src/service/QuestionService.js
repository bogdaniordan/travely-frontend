import axios from "axios"
import AuthHeader from "./auth-helpers/AuthHeader";

const QUESTION_SERVICE_API_URL = "http://localhost:8080/questions";

class QuestionService {
    saveQuestion(question, author, customerId, hostId) {
        return axios.post(`${QUESTION_SERVICE_API_URL}/add-question/${customerId}/${hostId}`, {
            date: new Date(),
            text: question,
            author: author,
        }, { headers: AuthHeader() });
    }

    getAllForHost(customerId, hostId) {
        return axios.get(`${QUESTION_SERVICE_API_URL}/get-all-for-host/${customerId}/${hostId}`, { headers: AuthHeader() })
    }

    getAllQuestions() {
        return axios.get(`${QUESTION_SERVICE_API_URL}/all`, {headers: AuthHeader()});
    }

    deleteQuestion(id) {
        return axios.delete(`${QUESTION_SERVICE_API_URL}/${id}`, {headers: AuthHeader()})
    }
}

export default new QuestionService;
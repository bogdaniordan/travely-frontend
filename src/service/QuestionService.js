import axios from "axios"
import AuthHeader from "./AuthHeader";

const QUESTION_SERVICE_API_URL = "http://localhost:8080/questions";

class QuestionService {
    saveQuestion(question, author, customerId, hostId) {
        return axios.post(`${QUESTION_SERVICE_API_URL}/add-question/${customerId}/${hostId}`, {
            date: new Date(),
            text: question,
            author: author,
        }, { headers: AuthHeader() });;
    }
}

export default new QuestionService;
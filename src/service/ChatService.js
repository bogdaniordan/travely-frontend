import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";

const CHAT_SERVICE_API_URL = "http://localhost:8080";

class ChatService{
    getMessagesForConversation(senderId, receiverId) {
        return axios.get(`${CHAT_SERVICE_API_URL}/all-conversation/${senderId}/${receiverId}`, {headers: AuthHeader()});
    }

    getAsUnseenMessages(id) {
        return axios.get(`${CHAT_SERVICE_API_URL}/unseen-messages/${id}`, {headers: AuthHeader()});
    }

    markMessageAsSeen(id) {
        return axios.get(`${CHAT_SERVICE_API_URL}/mark-message-as-seen/${id}`, {headers: AuthHeader()});
    }
}

export default new ChatService;

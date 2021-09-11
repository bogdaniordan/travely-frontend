import axios from "axios";
import AuthHeader from "./AuthHeader";

const CHAT_SERVICE_API_URL = "http://localhost:8080";

class ChatService{
    getMessagesForConversation(senderId, receiverId) {
        return axios.get(`${CHAT_SERVICE_API_URL}/all-conversation/${senderId}/${receiverId}`, {headers: AuthHeader()});
    }
}

export default new ChatService;

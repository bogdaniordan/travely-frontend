import axios from "axios";
import AuthHeader from "./AuthHeader";
import AuthService from "./AuthService";

const COMMENT_SERVICE_API_URL = "http://localhost:8080/comments";

class CommentService {
    getAllForPost(id) {
        return axios.get(`${COMMENT_SERVICE_API_URL}/all-for-post/${id}`, {headers: AuthHeader()});
    }

    leaveComment(content, postId) {
        const comment = {
            content: content
        }
        return axios.post(`${COMMENT_SERVICE_API_URL}/save-comment/${postId}/${AuthService.getCurrentUser().id}`, comment, {headers: AuthHeader()});
    }

    deleteComment(id) {
        return axios.delete(`${COMMENT_SERVICE_API_URL}/${id}`, {headers: AuthHeader()});
    }
}

export default new CommentService;

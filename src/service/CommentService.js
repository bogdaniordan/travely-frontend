import axios from "axios";
import AuthHeader from "./AuthHeader";

const COMMENT_SERVICE_API_URL = "http://localhost:8080/comments";

class CommentService {
    getAllForPost(id) {
        return axios.get(`${COMMENT_SERVICE_API_URL}/all-for-post/${id}`, {headers: AuthHeader()})
    }
}

export default new CommentService;

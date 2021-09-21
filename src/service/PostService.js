import axios from "axios";
import AuthHeader from "./AuthHeader";

const POST_SERVICE_API_URL = "http://localhost:8080/posts";

class PostService {
    findAll() {
        return axios.get(`${POST_SERVICE_API_URL}/all`, {headers: AuthHeader()})
    }
}

export default new PostService;

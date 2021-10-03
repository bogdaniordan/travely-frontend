import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";
import AuthService from "./AuthService";

const POST_SERVICE_API_URL = "http://localhost:8080/posts";

class PostService {
    findAll() {
        return axios.get(`${POST_SERVICE_API_URL}/all`, {headers: AuthHeader()})
    }

    postIsLiked(postId) {
        return axios.get(`${POST_SERVICE_API_URL}/is-liked/${postId}/${AuthService.getCurrentUser().id}`, {headers: AuthHeader()});
    }

    likePost(postId) {
        return axios.get(`${POST_SERVICE_API_URL}/like-post/${postId}/${AuthService.getCurrentUser().id}`, {headers: AuthHeader()});
    }

    unLikePost(postId) {
        return axios.get(`${POST_SERVICE_API_URL}/unlike-post/${postId}/${AuthService.getCurrentUser().id}`, {headers: AuthHeader()});
    }

    getPostLikesNumber(id) {
        return axios.get(`${POST_SERVICE_API_URL}/get-likes/${id}`, {headers: AuthHeader()});
    }

    addPost(data) {
        const post = {
            title: data.title,
            content: data.content,
            location: data.location
        }
        return axios.post(`${POST_SERVICE_API_URL}/add-post/${AuthService.getCurrentUser().id}`, post, {headers: AuthHeader()});
    }

    deletePost(id) {
        return axios.delete(`${POST_SERVICE_API_URL}/${id}`, {headers: AuthHeader()});
    }
}

export default new PostService;

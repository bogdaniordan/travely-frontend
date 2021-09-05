import axios from "axios";
import AuthHeader from "./AuthHeader";

const CLEANER_SERVICE_API_URL = "http://localhost:8080/cleaners";

class CleanerService {
    findAllCleaners() {
        return axios.get(`${CLEANER_SERVICE_API_URL}/all`, {headers: AuthHeader()})
    }
}

export default new CleanerService;
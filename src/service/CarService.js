import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";

const CARS_SERVICE_API_URL = "http://localhost:8080/cars";

class CarService {
    getAll() {
        return axios.get(`${CARS_SERVICE_API_URL}/all`, {headers: AuthHeader()});
    }

    getAllByLocation(location) {
        return axios.get(`${CARS_SERVICE_API_URL}/filter-by-location/${location}`, {headers: AuthHeader()})
    }
}

export default new CarService;
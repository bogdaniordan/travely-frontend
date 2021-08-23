import axios from "axios";
import AuthHeader from "./AuthHeader";

const ACCOMMODATION_SERVICE_API_URL = "http://localhost:8080/accommodations";

class AccommodationService {
    getAllAccommodations() {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/all`, { headers: AuthHeader() });
    }

    getByLocation(location) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/location/${location}`, { headers: AuthHeader() });
    }

    getByPlaceType(placeType) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/place-type/${placeType}`, { headers: AuthHeader() });
    }

    getByPlaceTypeAndLocation(placeType, location) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/place-type/${placeType}/location/${location}`, { headers: AuthHeader() });
    }

    getById(id) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/${id}`, { headers: AuthHeader() });
    }
}

export default new AccommodationService;
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

    getByTitleInput(titleInput) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/get-by-title/${titleInput}`, { headers: AuthHeader() });
    }

    saveToFavorites(accommodationId, customerId) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/save-to-favorites/accommodation/${accommodationId}/customer/${customerId}`, {headers: AuthHeader()});
    }

    removeFromFavorites(accommodationId, customerId) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/remove-from-favorites/accommodation/${accommodationId}/customer/${customerId}`, {headers: AuthHeader()});
    }

    accommodationIsSaved(accommodationId, customerId) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/accommodation-is-saved/${accommodationId}/${customerId}`, {headers: AuthHeader()});
    }

    getAllSavedAccommodations(customerId) {
        return axios.get(`${ACCOMMODATION_SERVICE_API_URL}/all-saved/${customerId}`, {headers: AuthHeader()});;
    }
}

export default new AccommodationService;
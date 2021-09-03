import axios from "axios";
import AuthHeader from "./AuthHeader";

const TESTIMONIAL_SERVICE_API_URL = "http://localhost:8080/testimonials";

class TestimonialService {
    getAllForAccommodation(id) {
        return axios.get(`${TESTIMONIAL_SERVICE_API_URL}/get-all-for-accommodation/${id}`, {headers: AuthHeader()})
    }

    addTestimonial(accommodationId, customerId, data) {
        return axios.post(`${TESTIMONIAL_SERVICE_API_URL}/add/${accommodationId}/${customerId}`, {
            message: data.message
        }, {headers: AuthHeader()})
    }

    accommodationIsReviewedByUser(accommodationId, customerId) {
        return axios.get(`${TESTIMONIAL_SERVICE_API_URL}/accommodation-is-reviewed/${accommodationId}/${customerId}`, {headers: AuthHeader()});
    }

}

export default new TestimonialService;
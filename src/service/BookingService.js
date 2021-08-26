import axios from "axios";
import AuthHeader from "./AuthHeader";

const BOOKING_SERVICE_API_URL = "http://localhost:8080/bookings";

class BookingService {
    saveBooking(booking, hostId, customerId, accommodationId) {
        return axios.post(`${BOOKING_SERVICE_API_URL}/add-booking/host/${hostId}/customer/${customerId}/accommodation/${accommodationId}`, booking, { headers: AuthHeader() });
    }

    getAllByCustomerId(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/customer/${id}`, { headers: AuthHeader() });
    }

    deleteBooking(id) {
        return axios.delete(`${BOOKING_SERVICE_API_URL}/${id}`, { headers: AuthHeader() });
    }

}

export default new BookingService;
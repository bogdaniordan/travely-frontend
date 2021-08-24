import axios from "axios";
import AuthHeader from "./AuthHeader";

const BOOKING_SERVICE_API_URL = "http://localhost:8080/bookings";

class BookingService {
    saveBooking(booking, hostId, customerId, accommodationId) {
        return axios.post(`${BOOKING_SERVICE_API_URL}/add-booking/host/${hostId}/customer/${customerId}/accommodation/${accommodationId}`, booking, { headers: AuthHeader() })
    }

}

export default new BookingService;
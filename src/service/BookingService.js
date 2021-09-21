import axios from "axios";
import AuthHeader from "./AuthHeader";
import AuthService from "./AuthService";

const BOOKING_SERVICE_API_URL = "http://localhost:8080/bookings";

class BookingService {
    saveBooking(booking, hostId, customerId, accommodationId) {
        return axios.post(`${BOOKING_SERVICE_API_URL}/add-booking/host/${hostId}/customer/${customerId}/accommodation/${accommodationId}`, booking, { headers: AuthHeader() });
    }

    getAllByCustomerId() {
        return axios.get(`${BOOKING_SERVICE_API_URL}/customer/${AuthService.getCurrentUser().id}`, { headers: AuthHeader() });
    }

    deleteBooking(id) {
        return axios.delete(`${BOOKING_SERVICE_API_URL}/${id}`, { headers: AuthHeader() });
    }

    accommodationCanBeBooked(checkInDate, checkOutDate, accommodationId) {
        const bookingsDatesDto = {
            checkIn: checkInDate,
            checkOut: checkOutDate
        }
        return axios.post(`${BOOKING_SERVICE_API_URL}/accommodation-can-be-booked/${accommodationId}`, bookingsDatesDto, {headers: AuthHeader()})
    }

}

export default new BookingService;
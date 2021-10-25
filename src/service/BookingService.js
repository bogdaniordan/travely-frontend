import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";
import AuthService from "./AuthService";

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

    accommodationIsBookedNow(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/accommodation-is-booked-now/${id}`, {headers: AuthHeader()})
    }

    accommodationHasFutureBookings(accommodationId) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/accommodation-has-future-bookings/${accommodationId}`, {headers: AuthHeader()})
    }

    getClosestFutureBooking(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/closest-future-booking/${id}`, {headers: AuthHeader()});
    }

    getBookedDatesForAccommodation(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/booked-dates/${id}`, {headers: AuthHeader()});
    }

    getNumberOfBookedNights(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/booked-nights-number/${id}`, {headers: AuthHeader()})
    }

    getById(id) {
        return axios.get(`${BOOKING_SERVICE_API_URL}/get-by-id/${id}`, {headers: AuthHeader()});
    }

    updateBookingDates(checkInDate, checkOutDate, id) {
        const bookingsDatesDto = {
            checkIn: checkInDate,
            checkOut: checkOutDate
        }
        return axios.put(`${BOOKING_SERVICE_API_URL}/update-booking-dates/${id}`, bookingsDatesDto, {headers: AuthHeader()});
    }
}

export default new BookingService;
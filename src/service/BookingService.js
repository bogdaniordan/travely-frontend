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

    // accommodationCanBeBooked(checkInDate, checkOutDate, accommodationId) {
    //     const bookingsDatesDto = {
    //         checkIn: checkInDate,
    //         checkOut: checkOutDate
    //     }
    //     return axios.post(`${BOOKING_SERVICE_API_URL}/accommodation-can-be-booked/${accommodationId}`, bookingsDatesDto, {headers: AuthHeader()})
    // }

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

    getNumberOfBookedNights() {
        return axios.get(`${BOOKING_SERVICE_API_URL}/booked-nights-number/${AuthService.getCurrentUser().id}`, {headers: AuthHeader()})
    }

}

export default new BookingService;
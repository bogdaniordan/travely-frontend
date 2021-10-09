import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";
import AuthService from "./AuthService";
import moment from "moment";

const CAR_BOOKING_SERVICE_API_URL = "http://localhost:8080/car-bookings";

class CarBookingService {
    saveCarBooking(carId, startDate, endDate, childSeatNumber, babySeatNumber, gps, price, notes) {
        const booking = {
            price: price,
            notes: notes,
            childSeat: childSeatNumber,
            babySeat: babySeatNumber,
            gps: gps === 1,
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD"),
        }
        return axios.post(`${CAR_BOOKING_SERVICE_API_URL}/save-booking/${AuthService.getCurrentUser().id}/${carId}`, booking, {headers: AuthHeader()})
    }

    getAllByCustomer() {
        return axios.get(`${CAR_BOOKING_SERVICE_API_URL}/bookings-by-customer/${AuthService.getCurrentUser().id}`, {headers: AuthHeader()})
    }

    cancelBooking(id) {
        return axios.delete(`${CAR_BOOKING_SERVICE_API_URL}/cancel-booking/${id}`, {headers: AuthHeader()})
    }
}

export default new CarBookingService;
import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";
import AuthService from "./AuthService";

const CAR_BOOKING_SERVICE_API_URL = "http://localhost:8080/car-bookings";

class CarBookingService {
    // canBeBooked(id, startDate, endDate) {
    //     const bookingsDatesDto = {
    //         checkIn: startDate,
    //         checkOut: endDate
    //     }
    //     console.log(bookingsDatesDto)
    //     return axios.post(`${CAR_BOOKING_SERVICE_API_URL}/can-be-booked/${id}`, bookingsDatesDto,  {headers: AuthHeader()});
    // }
}

export default new CarBookingService;
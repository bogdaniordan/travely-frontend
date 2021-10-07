import axios from "axios";
import AuthHeader from "./auth-helpers/AuthHeader";

const CARS_SERVICE_API_URL = "http://localhost:8080/cars";

class CarService {
    getAll(startDate, endDate) {
        const bookingsDatesDto = {
            checkIn: startDate,
            checkOut: endDate
        }
        return axios.post(`${CARS_SERVICE_API_URL}/all`, bookingsDatesDto, {headers: AuthHeader()});
    }

    getAllByLocation(location, startDate, endDate) {
        const bookingsDatesDto = {
            checkIn: startDate,
            checkOut: endDate
        }
        return axios.post(`${CARS_SERVICE_API_URL}/filter-by-location/${location}`, bookingsDatesDto, {headers: AuthHeader()})
    }
}

export default new CarService;
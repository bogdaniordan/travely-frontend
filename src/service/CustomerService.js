import axios from "axios";
import AuthHeader from "./AuthHeader";

const CUSTOMER_SERVICE_API_URL = "http://localhost:8080/customers";

class CustomerService {
    getCustomerById(id) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/${id}`, { headers: AuthHeader() });
    }

}

export default new CustomerService;
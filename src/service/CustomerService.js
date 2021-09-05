import axios from "axios";
import AuthHeader from "./AuthHeader";
import AuthService from "./AuthService";

const CUSTOMER_SERVICE_API_URL = "http://localhost:8080/customers";

class CustomerService {
    getCustomerById(id) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/${id}`, { headers: AuthHeader() });
    }

    saveCardDetails(cardName, cardNumber, expirationDate, cvv, id) {
        return axios.post(`${CUSTOMER_SERVICE_API_URL}/save-card/${id}`, {
            cardName: cardName,
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            cvv: cvv
        }, { headers: AuthHeader() })
    }

    setImage(customerId, file) {
        return axios.post(`${CUSTOMER_SERVICE_API_URL}/image/upload/${customerId}`, file, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + AuthService.getCurrentUser().token
            }
        })
    }

    updateCustomer(customer, id) {
        return axios.put(`${CUSTOMER_SERVICE_API_URL}/update/${id}`, customer, { headers: AuthHeader() });
    }

    cardDetailsExist(id) {
        return axios.get(`${CUSTOMER_SERVICE_API_URL}/card-details-exist/${id}`, {headers: AuthHeader()});
    }
}

export default new CustomerService;
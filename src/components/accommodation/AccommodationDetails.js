import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService";
import BookingCard from "../reservations/BookingCard";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import Map from "../../utils/Map";
import Testimonials from "../testimonial/Testimonials";
import AccommodationFacilitiesCard from "./AccommodationFacilitiesCard";
import Footer from "../navigation/Footer";
import Geocode from "react-geocode";

const AccommodationDetails = (props) => {
    const id = props.match.params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [accommodation, setAccommodation] = useState({});
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        AccommodationService.getById(id).then(response => {
            setAccommodation(response.data);
            getCustomer();
        })
    }, [])

    const getCustomer = () => {
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(
            response => {
                setCustomer(response.data);
                setIsLoading(false);
            }
        )
    }

    if (!isLoading) {
        return (
            <div>
                <Navbar title={accommodation.title} subtitle={accommodation.location}/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <img className="img-fluid" src={`http://localhost:8080/accommodations/image/${accommodation.id}/firstImage/download`} alt=""/>
                        </div>

                        <div className="col-md-4">
                            <div>
                                <BookingCard customer={customer} accommodation={accommodation} />
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{marginTop: "20px"}}>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="#">
                                <img className="img-fluid" src={`http://localhost:8080/accommodations/image/${accommodation.id}/secondImage/download`} alt=""/>
                            </a>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="#">
                                <img className="img-fluid" src={`http://localhost:8080/accommodations/image/${accommodation.id}/thirdImage/download`}  alt=""/>
                            </a>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="#">
                                <img className="img-fluid" src={`http://localhost:8080/accommodations/image/${accommodation.id}/thirdImage/download`}  alt=""/>
                            </a>
                        </div>

                        <div class="col-md-3 col-sm-6 mb-4">
                            <a href="#">
                                <img className="img-fluid" src={`http://localhost:8080/accommodations/image/${accommodation.id}/thirdImage/download`}  alt=""/>
                            </a>
                        </div>
                        <div style={{marginBottom: "20px"}}>
                            <Map
                                // api key = AIzaSyBtJ-at-3HxnIdCfaeplBDJJaNuZ18rFgg
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtJ-at-3HxnIdCfaeplBDJJaNuZ18rFgg"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `244px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                lat={44.439663}
                                lng={26.096306}
                            />
                        </div>

                    </div>
                    </div>
                <AccommodationFacilitiesCard accommodation={accommodation} />

                <Testimonials accommodationId={accommodation.id}/>
                <Footer />
            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }


};

export default AccommodationDetails;
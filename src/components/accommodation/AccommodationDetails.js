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
import BookingService from "../../service/BookingService";
import AccommodationHostDetails from "./AccommodationHostDetails";
import {getCityCoordinates} from "../../utils/CityCoordinates";

const AccommodationDetails = (props) => {
    const id = props.match.params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [accommodation, setAccommodation] = useState({});
    const [customer, setCustomer] = useState({});
    const [isBookedAtm, setIsBookedAtm] = useState(false);
    const [hasFutureBookings, setHasFutureBookings] = useState(false);
    const [closestFutureBooking, setClosestFutureBooking] = useState({});

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
                getAccommodationBookings()
            }
        )
    }

    const getAccommodationBookings = () => {
        BookingService.accommodationIsBookedNow(id).then(res => {
            setIsBookedAtm(res.data)
            if(!res.data) {
                BookingService.accommodationHasFutureBookings(id).then(res =>  {
                    setHasFutureBookings(res.data)
                    if(res.data) {
                        BookingService.getClosestFutureBooking(id).then(res => {
                            setClosestFutureBooking(res.data)
                        })
                    }
                })
            }
        })
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
                        {/*<div className="col-md-6 col-sm-6 mb-8">*/}
                        {/*    <div className="card flex-md-row mb-4 box-shadow h-md-250">*/}
                        {/*        <div className="card-body d-flex flex-column align-items-start" style={{height: "170px"}}>*/}
                        {/*            <div style={{display: "flex"}}>*/}
                        {/*                <Avatar style={{height: "70px", width: "70px", marginBottom: "5px"}} src={`http://localhost:8080/hosts/image/${accommodation.host.id}/download` ? `http://localhost:8080/hosts/image/${accommodation.host.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"}/>*/}
                        {/*                <h4 style={{marginTop: "20px", marginLeft: "20px"}}>Your host: {accommodation.host.firstName} {accommodation.host.lastName}</h4>*/}
                        {/*            </div>*/}

                        {/*            {*/}
                        {/*                accommodation.cleaningStatus === "CLEAN" ? (*/}
                        {/*                    <h4 className="blue-colored">Cleanliness: CLEAN</h4>*/}
                        {/*                ) : (*/}
                        {/*                    <h4 className="red-colored">Cleanliness: DIRTY</h4>*/}
                        {/*                )*/}
                        {/*            }*/}
                        {/*            {*/}
                        {/*                isBookedAtm ? (*/}
                        {/*                    <h5>This accommodation is currently booked.</h5>*/}
                        {/*                ) : (*/}
                        {/*                    hasFutureBookings ? (*/}
                        {/*                        <div className="mb-1 text-muted">*/}
                        {/*                            Next booking starts on <strong>{moment(closestFutureBooking.checkInDate).format("DD-MM-YYYY")}</strong> and ends on <strong>{moment(closestFutureBooking.checkoutDate).format("DD-MM-YYYY")}</strong>*/}
                        {/*                        </div>*/}
                        {/*                    ) : (*/}
                        {/*                        <h5>This accommodation has no future bookings.</h5>*/}

                        {/*                    )*/}
                        {/*                )*/}
                        {/*            }*/}
                        {/*            <br/>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <AccommodationHostDetails accommodation={accommodation} isBookedAtm={isBookedAtm} hasFutureBookings={hasFutureBookings} closestFutureBooking={closestFutureBooking}/>

                        <div className="google-maps-container">
                            <Map
                                // api key = AIzaSyBtJ-at-3HxnIdCfaeplBDJJaNuZ18rFgg
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBtJ-at-3HxnIdCfaeplBDJJaNuZ18rFgg"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `244px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                lat={getCityCoordinates(accommodation.location)[0]}
                                lng={getCityCoordinates(accommodation.location)[1]}
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
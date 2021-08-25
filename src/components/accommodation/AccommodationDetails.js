import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService";
import BookingCard from "../reservations/BookingCard";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import { GoogleMap } from "react-google-maps"
import Map from "../../utils/Map";

const AccommodationDetails = (props) => {
    const id = props.match.params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [accommodation, setAccommodation] = useState();
    const [customer, setCustomer] = useState();

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
                <Navbar />
                <div className="container">
                    <h1 className="my-4">
                        <small>{accommodation.title}</small>
                    </h1>
                    <div className="row">
                        <div className="col-md-8">
                            <img className="img-fluid" src={accommodation.imageUrls.allImages[0]} alt=""/>
                        </div>

                        <div className="col-md-4">
                            <div>
                                <BookingCard customer={customer} accommodation={accommodation} />
                            </div>
                        </div>
                    </div>
                    {/*<h6 className="my-4">Other pictures</h6>*/}

                    <div className="row" style={{marginTop: "20px"}}>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="#">
                                <img className="img-fluid" src={accommodation.imageUrls.allImages[1]} alt=""/>
                            </a>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">
                            <a href="#">
                                <img className="img-fluid" src={accommodation.imageUrls.allImages[2]}  alt=""/>
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

                        {/*<div class="col-md-3 col-sm-6 mb-4">*/}
                        {/*    <a href="#">*/}
                        {/*        <img class="img-fluid" src="https://via.placeholder.com/500x300" alt=""/>*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>

                    <div className="container">
                        <div className="row mb-2" >
                            <div className="col-md-6">
                                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                                    <div className="card-body d-flex flex-column align-items-start">
                                        <strong className="d-inline-block mb-2 text-primary">Accomodation type</strong>
                                        <h3 className="mb-0">
                                            <a className="text-dark" href="#">{accommodation.placeType}</a>
                                        </h3>
                                        <div className="mb-1 text-muted" style={{marginTop: "10px"}}>Location: {accommodation.location}</div>
                                        <br/>
                                        <p className="card-text mb-auto">The price for this accommodation is ${accommodation.pricePerNight} per night.</p>
                                    </div>
                                    <img height="250px" width="200px" src="https://image.freepik.com/free-vector/beach-house-logo-design-template-beach-resort-villa-beach-hotel-logo_98702-711.jpg" className="card-img-right flex-auto d-none d-md-block"
                                         data-src="holder.js/200x250?theme=thumb" alt="Card image cap"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card flex-md-row mb-4 box-shadow h-md-250" >
                                    <div className="card-body d-flex flex-column align-items-start">
                                        {/*<strong className="d-inline-block mb-2 text-success">This accommodation offers</strong>*/}
                                        <h3 className="mb-0">
                                            <a className="text-dark" href="#">Facilities</a>
                                        </h3>
                                        {/*<div className="mb-1 text-muted">This {accommodation.placeType} offers</div>*/}
                                        <br/>
                                        {accommodation.facilities.map(facility => <p className="card-text mb-auto">{facility.replace("_", " ")}</p>)}
                                    </div>
                                    <img  height="250px" width="200px" src="https://static.vecteezy.com/system/resources/previews/001/483/727/non_2x/hotel-services-and-facilities-banner-vector.jpg" className="card-img-right flex-auto d-none d-md-block"
                                         data-src="holder.js/200x250?theme=thumb" alt="Card image cap"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }


};

export default AccommodationDetails;
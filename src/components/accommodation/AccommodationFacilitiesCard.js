import React from 'react';

const AccommodationFacilitiesCard = ({accommodation}) => {
    return (
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
                        <img height="250px" width="200px" src="https://cdn3.iconfinder.com/data/icons/business-outline-29/32/business-03-512.png" className="card-img-right flex-auto d-none d-md-block"
                             data-src="holder.js/200x250?theme=thumb" alt="Card image cap"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card flex-md-row mb-4 box-shadow h-md-250" >
                        <div className="card-body d-flex flex-column align-items-start">
                            <strong className="d-inline-block mb-2 text-primary">This accommodation offers</strong>
                            <h3 className="mb-0">
                                <a className="text-dark" href="#">Facilities</a>
                            </h3>
                            {/*<div className="mb-1 text-muted">This {accommodation.placeType} offers</div>*/}
                            <br/>
                            {accommodation.facilities.map(facility => <p className="card-text mb-auto">{facility.replace("_", " ")}</p>)}
                        </div>
                        <img  height="250px" width="200px" src="https://www.kindpng.com/picc/m/584-5847848_hotel-facilities-icon-png-transparent-png.png" className="card-img-right flex-auto d-none d-md-block"
                              data-src="holder.js/200x250?theme=thumb" alt="Card image cap"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccommodationFacilitiesCard;
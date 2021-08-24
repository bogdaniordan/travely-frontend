import React, {useEffect} from 'react';
import Navbar from "../navigation/Navbar";
import {useHistory, useLocation} from "react-router-dom";

const SearchResults = (props) => {
    const history = useHistory();

    return (
        <>
            {
                props.places.map(
                    place => <div className="col">
                        <div className="card shadow-sm">
                            <img alt="Responsive image" className="img-fluid" src={place.imageUrls.allImages[0]}/>

                            <div className="card-body">
                                <p className="card-text"><strong>{place.title}</strong></p>
                                <p className="card-text">Location: {place.location}</p>
                                <small style={{marginBottom: "5px"}}>Place type: {place.placeType}</small>


                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => history.push(`/accommodation/${place.id}`)}>View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Save</button>
                                    </div>
                                    <small className="text-muted">${place.pricePerNight}/night</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SearchResults;
import React, {useState} from 'react';
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService"
import {useHistory} from "react-router-dom";
import SearchResults from "../search/SearchResults";

const HomePage = (props) => {
    const history = useHistory();
    const [location, setLocation] = useState();
    const [searchInput, setSearchInput] = useState();
    const [results, setResults] = useState();

    const search = () => {
        if (!location && !searchInput) {
            AccommodationService.getAllAccommodations().then(r => {setResults(r.data)})
        } else if (location) {
            AccommodationService.getByLocation(location).then(r => setResults(r.data))
        }

    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 card-margin">
                        <div className="card search-form">
                            <div className="card-body p-0">
                                {/*<form id="search-form">*/}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row no-gutters">
                                                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                    <select className="form-control" id="exampleFormControlSelect1" onChange={(event) => setLocation(event.target.value)}>
                                                        <option value="" selected disabled hidden>City</option>
                                                        <option value="London">London</option>
                                                        <option value="Boston">Boston</option>
                                                        <option value="Mumbai">Mumbai</option>
                                                        <option value="New York">New York</option>
                                                        <option value="Toronto">Toronto</option>
                                                        <option value="Paris">Paris</option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                                                    <input type="text" placeholder="Search..." className="form-control"
                                                           id="search" name="search" onChange={(event) => setSearchInput(event.target.value)}/>
                                                </div>
                                                <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                                                    <button type="submit" className="btn btn-base" onClick={search}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             stroke-width="2" stroke-linecap="round"
                                                             stroke-linejoin="round" className="feather feather-search">
                                                            <circle cx="11" cy="11" r="8"></circle>
                                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/*</form>*/}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    results && (
                        <SearchResults places={results}/>
                    )
                }
            </div>

        </div>
    );
};

export default HomePage;
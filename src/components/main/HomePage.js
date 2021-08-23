import React, {useState} from 'react';
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService"
import {useHistory} from "react-router-dom";
import SearchResults from "../search/SearchResults";
import Button from '@material-ui/core/Button';
import {Checkbox, Collapse} from "@material-ui/core";

const HomePage = (props) => {
    const history = useHistory();
    const [location, setLocation] = useState();
    const [searchInput, setSearchInput] = useState();
    const [results, setResults] = useState();
    // const [showFacilities, setShowFacilities] = useState(false);
    // const [facilities, setFacilities] = useState([]);
    const [placeType, setPlaceType] = useState()
    // const [checked, setChecked] = useState(true);

    // const [facilities, setFacilities] = useState({
    //     Kitchen: false,
    //     TV: false,
    //     Hair_dryer: false,
    //     Dedicated_workspace: false,
    //     Wifi: false,
    //     Washer: false,
    //     Refrigerator: false,
    // })

    const search = () => {
        if (!location && !searchInput && !placeType) {
            AccommodationService.getAllAccommodations().then(r => {setResults(r.data)});
        } else if (location && !searchInput && !placeType) {
            AccommodationService.getByLocation(location).then(r => setResults(r.data));
        } else if (location && placeType) {
            AccommodationService.getByPlaceTypeAndLocation(placeType, location).then(r => setResults(r.data));
        } else if (!location && placeType) {
            AccommodationService.getByPlaceType(placeType).then(r => setResults(r.data));
        }
        console.log(results)
    }

    // const toggleFilters = () => {
    //     setShowFacilities(!showFacilities);
    // }

    // const handleHairDryer = (event) => {
    //     setChecked(event.target.checked);
    // };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 card-margin">
                        <div className="card search-form">
                            <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row no-gutters">
                                                <div className="col-lg-3 col-md-3 col-sm-4 p-0" style={{width: "100px"}}>
                                                    <select className="form-control" id="exampleFormControlSelect1" onClick={(event) => {setPlaceType(event.target.value)}}>
                                                        <option value="" selected disabled hidden>Type</option>
                                                        <option value="Shared">Shared</option>
                                                        <option value="Private">Private</option>
                                                        <option value="Hotels">Hotels</option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-12 p-0" style={{width: "100px"}}>
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
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Collapse in={showFacilities}>*/}
                {/*    <div style={{border: "1px solid black", width: "300px", marginBottom: "20px", left: "-500px"}}>*/}
                {/*        <h5 style={{textAlign:"center"}}>Choose facilities</h5>*/}
                {/*        <Checkbox*/}
                {/*            // checked={checked}*/}
                {/*            onChange={handleHairDryer}*/}
                {/*            inputProps={{ 'aria-label': 'primary checkbox' }}*/}
                {/*        />*/}
                {/*        Hair dryer*/}
                {/*    </div>*/}

                {/*</Collapse>*/}
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
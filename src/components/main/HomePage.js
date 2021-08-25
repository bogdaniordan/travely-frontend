import React, {useState} from 'react';
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService"
import AccommodationCards from "../accommodation/AccommodationCards";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageCarousel from "./ImageCarousel"; // requires a loader


const HomePage = () => {
    const [location, setLocation] = useState();
    const [searchInput, setSearchInput] = useState();
    const [results, setResults] = useState();
    const [placeType, setPlaceType] = useState()


    const search = () => {
        if (!location && !placeType && searchInput) {
            AccommodationService.getByTitleInput(searchInput).then(r => setResults(r.data))
        } else if (!location && !searchInput && !placeType) {
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

    return (
        <div>
            <Navbar />
            <ImageCarousel />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 card-margin">
                        <div className="card search-form">
                            <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row no-gutters">
                                                <div className="col-lg-3 col-md-3 col-sm-4 p-0" style={{width: "100px"}}>
                                                    <select className="form-control" id="exampleFormControlSelect1" onClick={(event) => setPlaceType(event.target.value)}>
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
                <div class="album py-5 bg-light">
                    <div class="container">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" style={{textAlign: "center", justifyContent: "center"}}>
                            {
                                results ? (
                                    <AccommodationCards places={results}/>
                                ) : (<h3 style={{marginTop: "20px", marginBottom: "60px"}}>Where would you like to go...</h3>)
                            }
                        </div>
                    </div>
                </div>

                {/*<div className="container marketing">*/}

                {/*    <div className="row">*/}
                {/*        <div className="col-lg-4">*/}
                {/*            <img alt="Responsive image" className="img-fluid"  src="https://static.amazon.jobs/locations/16/thumbnails/london-thumb.jpg?1617639578"/>*/}
                {/*            <p><a className="btn btn-secondary" href="#">Explore &raquo;</a></p>*/}
                {/*        </div>*/}
                {/*        <div className="col-lg-4">*/}
                {/*            <img alt="Responsive image" className="img-fluid"  src="https://www.worldtravelguide.net/wp-content/uploads/2017/04/Think-India-Mumbai-486332873-Chidanand-M.-copy.jpg"/>*/}
                {/*            <p><a className="btn btn-secondary" href="#">Explore &raquo;</a></p>*/}
                {/*        </div>*/}
                {/*        <div className="col-lg-4">*/}
                {/*            <img alt="Responsive image" className="img-fluid"  src="https://upload.wikimedia.org/wikipedia/commons/9/96/ISH_WC_Boston4.jpg"/>*/}
                {/*            <p><a className="btn btn-secondary" href="#">Explore &raquo;</a></p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>

        </div>
    );
};

export default HomePage;
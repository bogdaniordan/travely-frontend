import React, {useState} from 'react';
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService"
import AccommodationCard from "../accommodation/AccommodationCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../navigation/Footer";
import {Link, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";


const HomePage = () => {
    const [location, setLocation] = useState();
    const [searchInput, setSearchInput] = useState();
    const [results, setResults] = useState();
    const [placeType, setPlaceType] = useState()
    const exploreCities = [["Toronto", "https://image.flaticon.com/icons/png/512/185/185286.png"], ["Paris", "https://image.flaticon.com/icons/png/512/1969/1969369.png"], ["London", "https://image.flaticon.com/icons/png/512/555/555970.png"], ["Mumbai", "https://image.flaticon.com/icons/png/512/1533/1533062.png"]]


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
    }

    const searchByCity = (city) => {
        AccommodationService.getByLocation(city).then(res => setResults(res.data))
    }

    return (
        <div>
            <Navbar title={"Welcome to Travely."} subtitle={"Travel anywhere around the globe with just one click!"}/>
            {/*<ImageCarousel />*/}
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
                                results ? ( results.length > 0 ? (
                                    results.map(
                                        place => <AccommodationCard place={place}/>
                                    )
                                    ) : (<h3 style={{marginTop: "20px", marginBottom: "60px"}}>There are no results for your search...</h3>)
                                ) : (<h3 style={{marginTop: "20px", marginBottom: "60px"}}>Where would you like to go...</h3>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h4 style={{textAlign:'center', marginTop: "100px"}}>
                    Explore famous cities
                </h4>
                <List style={{display: "flex"}}>
                    {
                        exploreCities.map(
                            city => (
                                <Paper elevation={2} style={{margin: "65px"}}>
                                    <ListItem alignItems="center" style={{height: "100px"}}>
                                        <Link onClick={() => searchByCity(city[0])}>

                                            <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={city[1]} style={{height: "70px", width: "70px"}} />
                                            </ListItemAvatar>
                                        </Link>

                                        <ListItemText>
                                            <h4 style={{margin: "10px"}}>{city[0]}</h4>
                                        </ListItemText>
                                    </ListItem>
                                </Paper>
                            )
                        )
                    }
                </List>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import AccommodationService from "../../service/AccommodationService";

const Accommodation = (props) => {
    const id = props.match.params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [accommodation, setAccommodation] = useState();

    useEffect(() => {
        AccommodationService.getById(id).then(response => {
            setAccommodation(response.data);
            console.log(response.data)
            setIsLoading(false);
        })
    }, [])

    if (!isLoading) {
        return (
            <div>
                <Navbar />
                <div class="container">

                    <h1 class="my-4">
                        <small>{accommodation.title}</small>
                    </h1>

                    <div class="row">

                        <div class="col-md-8">
                            <img class="img-fluid" src={accommodation.imageUrls.allImages[0]} alt=""/>
                        </div>

                        <div class="col-md-4">
                            <h3 class="my-3">Project Description</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
                            <h5 class="my-3">Facilities</h5>
                            <ul>
                                {
                                    accommodation.facilities.map(
                                        facility => <li>{facility}</li>

                                    )
                                }
                                {/*<li>Lorem Ipsum</li>*/}
                                {/*<li>Dolor Sit Amet</li>*/}
                                {/*<li>Consectetur</li>*/}
                                {/*<li>Adipiscing Elit</li>*/}
                            </ul>
                            <h4>Address</h4>
                            <p>{accommodation.address}</p>
                            <h6>Host</h6>
                            <p>{accommodation.host.firstName} {accommodation.host.lastName}</p>
                        </div>


                    </div>

                    <h3 class="my-4">Related Projects</h3>

                    <div class="row">
                        <div class="col-md-3 col-sm-6 mb-4">
                            <a href="#">
                                <img class="img-fluid" src={accommodation.imageUrls.allImages[1]} alt=""/>
                            </a>
                        </div>

                        <div class="col-md-3 col-sm-6 mb-4">
                            <a href="#">
                                <img class="img-fluid" src={accommodation.imageUrls.allImages[2]} alt=""/>
                            </a>
                        </div>

                        {/*<div class="col-md-3 col-sm-6 mb-4">*/}
                        {/*    <a href="#">*/}
                        {/*        <img class="img-fluid" src="https://via.placeholder.com/500x300" alt=""/>*/}
                        {/*    </a>*/}
                        {/*</div>*/}

                        {/*<div class="col-md-3 col-sm-6 mb-4">*/}
                        {/*    <a href="#">*/}
                        {/*        <img class="img-fluid" src="https://via.placeholder.com/500x300" alt=""/>*/}
                        {/*    </a>*/}
                        {/*</div>*/}

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

export default Accommodation;
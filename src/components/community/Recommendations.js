import React, {useEffect, useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import RecommendationService from "../../service/RecommendationService";
import AuthService from "../../service/AuthService";
import AccommodationCard from "../accommodation/AccommodationCard";

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        RecommendationService.findAllForCustomer(AuthService.getCurrentUser().id).then(r => setRecommendations(r.data))
    }, [])
    
    return (
        <div className="col-md-3">
            {
                recommendations.map(
                    recommendation => (
                        <div className="card gedf-card">
                            <div className="card-body">
                                <h5 className="card-title">{recommendation.sender.firstName} {recommendation.sender.lastName}</h5>
                                {/*<div>*/}
                                <Avatar style={{margin: "auto"}}/>
                                <br/>
                                {/*</div>*/}
                                <h6 className="card-subtitle mb-2 text-muted">recommended you this</h6>
                                {/*<p className="card-text">Some quick example text to build on the card title and make up*/}
                                {/*    the bulk of the*/}
                                {/*    card's content.</p>*/}
                                {/*<a href="#" className="card-link">Card link</a>*/}
                                {/*<a href="#" className="card-link">Another link</a>*/}
                                <AccommodationCard place={recommendation.accommodation}/>
                            </div>

                        </div>
                    )
                )
            }
        </div>
    );
};

export default Recommendations;
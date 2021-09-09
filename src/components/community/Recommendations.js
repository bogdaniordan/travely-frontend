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
            My recommendations
            {
                recommendations.map(
                    recommendation => (
                        <div className="card gedf-card">
                            <div className="card-body">
                                <h5 className="card-title">{recommendation.sender.firstName} {recommendation.sender.lastName}</h5>
                                <Avatar src={`http://localhost:8080/customers/image/${recommendation.sender.id}/download` ? `http://localhost:8080/customers/image/${recommendation.sender.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} style={{margin: "auto"}}/>
                                <br/>
                                <h6 className="card-subtitle mb-2 text-muted">recommended you this</h6>
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
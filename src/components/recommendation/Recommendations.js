import React, {useEffect, useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import RecommendationService from "../../service/RecommendationService";
import AuthService from "../../service/AuthService";
import AccommodationCard from "../accommodation/AccommodationCard";
import CloseIcon from '@mui/icons-material/Close';
import GroupIcon from '@mui/icons-material/Group';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([])

    useEffect(() => {
        RecommendationService.findAllForCustomer(AuthService.getCurrentUser().id).then(r => setRecommendations(r.data))
    }, [])

    const deleteRecommendation = id => {
        RecommendationService.deleteRecommendation(id).then(res => setRecommendations(recommendations.filter(rec => rec.id !== id)));
    }

    return (
        <div className="col-md-3">
            {
                recommendations.length > 0 ? (
                    <div>
                        <div className="card gedf-card">
                            <div className="h5" id="recommendations-header">My recommendations</div>
                        </div>
                        {
                            recommendations.map(
                                recommendation => (
                                    <div className="card gedf-card">
                                        <div className="card-body">
                                            <CloseIcon style={{float: "right"}} color="error" onClick={() => deleteRecommendation(recommendation.id)}/>
                                            <h5 className="card-title">{recommendation.sender.firstName} {recommendation.sender.lastName} <GroupIcon color="primary"/></h5>
                                            <Avatar src={recommendation.sender.provider !== "local" ? recommendation.sender.picture :
                                                `http://localhost:8080/customers/image/${recommendation.sender.id}/download` ? `http://localhost:8080/customers/image/${recommendation.sender.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} style={{margin: "auto"}}/>
                                            <br/>
                                            <h6 className="card-subtitle mb-2 text-muted">recommended you this</h6>
                                            {
                                                recommendation.message && (
                                                    <p className="card-subtitle mb-2 text-muted">"{recommendation.message}"</p>
                                                )
                                            }
                                            <AccommodationCard place={recommendation.accommodation}/>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                ) : ("You did not receive any recommendations yet.")
            }
        </div>
    );
};

export default Recommendations;
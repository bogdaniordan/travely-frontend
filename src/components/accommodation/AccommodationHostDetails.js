import React, {useEffect, useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import HostService from "../../service/HostService";
import {Tooltip} from "@material-ui/core";
import SmokeFreeIcon from '@mui/icons-material/SmokeFree';
import RecommendationService from "../../service/RecommendationService";

const AccommodationHostDetails = ({accommodation, isBookedAtm, hasFutureBookings, closestFutureBooking}) => {
    const [hostBadges, setHostBadges] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        HostService.getHostBadges(accommodation.host.id).then(res => setHostBadges(res.data));
        RecommendationService.getAllForAccommodation(accommodation.id).then(res => setRecommendations(res.data));
    }, [])

    return (
        <div className="col-md-6 col-sm-6 mb-8">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start" style={{height: "170px"}}>
                    <div className="details-container">
                        <Avatar src={`http://localhost:8080/hosts/image/${accommodation.host.id}/download` ? `http://localhost:8080/hosts/image/${accommodation.host.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} style={{height: "70px", width: "70px", marginBottom: "5px"}} />
                        <h5 className="host-name-header">{accommodation.host.firstName} {accommodation.host.lastName}</h5>
                        <div className="all-badges-container">
                            {
                                hostBadges.map(
                                    badge => (
                                        <div className="badge-container">
                                            <Tooltip title={badge.description}>
                                                <Avatar src={`http://localhost:8080/hosts/image/badge/${badge.picture}/download`} />
                                            </Tooltip>
                                        </div>
                                    )
                                )
                            }
                        </div></div>
                    {
                        accommodation.cleaningStatus === "CLEAN" ? (
                            <h4><span className="blue-colored">Cleanliness: CLEAN</span> <SmokeFreeIcon  style={{marginLeft: "190px"}} /> NO SMOKING</h4>
                        ) : (
                            <h4><span className="red-colored">Cleanliness: DIRTY</span> <SmokeFreeIcon  style={{marginLeft: "190px"}} /> NO SMOKING</h4>
                        )
                    }
                    {
                        isBookedAtm ? (
                            <div className="flexed-container">
                                <h5 >This accommodation is currently booked.</h5>
                                <h6 className="recommendations-number">{recommendations.length} recommendation(s)</h6>
                            </div>
                        ) : (
                            hasFutureBookings ? (
                                <div className="mb-1 text-muted">
                                    Next booking starts on <strong>{moment(closestFutureBooking.checkInDate).subtract(1, 'months').format("DD-MM-YYYY")}</strong> and ends on <strong>{moment(closestFutureBooking.checkoutDate).subtract(1, 'months').format("DD-MM-YYYY")}</strong>.
                                </div>
                            ) : (
                                <div className="flexed-container">
                                    <h5>This accommodation has no future bookings.</h5>
                                    <p className="recommendations-number">{recommendations.length} recommendation(s)</p>
                                </div>
                            )
                        )
                    }
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default AccommodationHostDetails;
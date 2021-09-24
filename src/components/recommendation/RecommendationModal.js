import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import RecommendationService from "../../service/RecommendationService";
import AuthService from "../../service/AuthService";
import {List} from "@material-ui/core";
import AddRecommendationForm from "./AddRecommendationForm";

const RecommendationModal = ({closeModal, accommodation}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        RecommendationService.getUsersWhoCanGetRecommendations(AuthService.getCurrentUser().id, accommodation.id).then(res => setUsers(res.data))
    }, [])

    return (
        <div>
            <Button onClick={closeModal} color="secondary" variant="contained">X</Button>
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-body text-center" >
                        <h4>Recommend {accommodation.title} to other users:</h4>
                        <List>
                            {
                                users.length > 0 ? (
                                    users.map(
                                        user => (
                                            <AddRecommendationForm
                                                users={users}
                                                setUsers={setUsers}
                                                accommodation={accommodation}
                                                user={user}
                                            />
                                        )
                                    )
                                ) : (<h5>No other users to recommend to.</h5>)
                            }
                        </List>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default RecommendationModal;
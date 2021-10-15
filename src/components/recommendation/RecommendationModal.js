import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import RecommendationService from "../../service/RecommendationService";
import AuthService from "../../service/AuthService";
import {List} from "@material-ui/core";
import AddRecommendationForm from "./AddRecommendationForm";
import {useStyles} from "../../styling/js-styling/AuthStyles";

const RecommendationModal = ({closeModal, accommodation}) => {
    const [users, setUsers] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        RecommendationService.getUsersWhoCanGetRecommendations(AuthService.getCurrentUser().id, accommodation.id).then(res => setUsers(res.data))
    }, [])

    return (
        <div>
            <div className="right-align-container">
                <Button onClick={closeModal} className={classes.exitButton} color="secondary" variant="contained">X</Button>
            </div>

            <div className="modal-dialog modal-confirm">
                {
                    users.length > 0 && (
                        <h4>Recommend {accommodation.title} to other users:</h4>
                    )
                }
                <div className="modal-content">
                    <div className="modal-body text-center" >
                        {
                            users.length > 0 ? (
                                <div>
                                    <List>
                                        {
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
                                        }
                                    </List>
                                </div>
                            ) : (
                                <h4>You can't recommend {accommodation.title} to other users.</h4>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RecommendationModal;
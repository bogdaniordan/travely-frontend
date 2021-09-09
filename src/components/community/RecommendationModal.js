import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import RecommendationService from "../../service/RecommendationService";
import AuthService from "../../service/AuthService";
import {List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const RecommendationModal = ({closeModal, accommodation}) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        RecommendationService.getUsersWhoCanGetRecommendations(AuthService.getCurrentUser().id, accommodation.id).then(res => {
            setUsers(res.data)
            console.log(res.data)
        })
    }, [])

    const recommendAccommodation = () => {

    }

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
                                            <Paper elevation={2} style={{margin: "30px", width: "350px"}}>
                                                <ListItem alignItems="center">
                                                    <ListItemAvatar>
                                                        <Avatar alt="Remy Sharp" src={`http://localhost:8080/customers/image/${user.id}/download`} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        key={user.id}
                                                        primary={
                                                            <>
                                                                <h5>{user.firstName} {user.lastName}</h5>
                                                                <input type="text" style={{marginBottom: "10px"}}/>
                                                            </>
                                                        }
                                                        secondary={
                                                            <>

                                                                <small>
                                                                    <Button  variant="contained" color="primary">Recommend</Button>
                                                                </small>
                                                            </>
                                                        }
                                                    />
                                                </ListItem>
                                            </Paper>
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
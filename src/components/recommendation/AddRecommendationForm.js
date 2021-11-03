import React, {useState} from 'react';
import {ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import RecommendationService from "../../service/RecommendationService";
import AuthService from "../../service/AuthService";
import {useStyles} from "../../styling/js-styling/RecommendationStyling";

const AddRecommendationForm = ({users, setUsers, accommodation, user}) => {
    const classes = useStyles();
    const [message, setMessage] = useState("");

    const recommendAccommodation = () => {
        RecommendationService.saveRecommendation(message, AuthService.getCurrentUser().id, user.id, accommodation.id).then(res => setUsers(users.filter(u => u.id !== user.id)))
    }

    return (
        <Paper elevation={2} className={classes.recommendationPaper}>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={user.provider !== "local" ? user.picture : `http://localhost:8080/customers/image/${user.id}/download`} className={classes.recommendationAvatar}/>
                    </ListItemAvatar>
                    <ListItemText
                        key={user.id}
                        primary={
                            <>
                                <h5 className="recommendation-receiver">{user.firstName} {user.lastName}</h5>
                                <textarea
                                    placeholder="Message"
                                    name="message"
                                    className="form-control"
                                    id="recommendation-input"
                                    onChange={e => setMessage(e.target.value)}
                                ></textarea>
                            </>
                        }
                        secondary={
                            <>
                                <small>
                                    <Button variant="contained" color="primary" onClick={recommendAccommodation} className={classes.recommendBtn}>Recommend</Button>
                                </small>
                            </>
                        }
                    />
                </ListItem>
        </Paper>
    );
};

export default AddRecommendationForm;
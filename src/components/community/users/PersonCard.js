import React, {useEffect, useState} from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import {Card, CardActions, CardMedia} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import BookingService from "../../../service/BookingService";
import CustomerService from "../../../service/CustomerService";
import {useStyles} from "../../../styling/js-styling/PersonStyling";
import {useHistory} from "react-router-dom";
import FriendStatus from "./FriendStatus";
import GroupIcon from '@mui/icons-material/Group';

const PersonCard = ({person}) => {
    const classes = useStyles()
    const history = useHistory();
    const [bookings, setBookings] = useState([])
    const [mutualFriends, setMutualFriends] = useState(0);
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        BookingService.getAllByCustomerId(person.id).then(res => setBookings(res.data));
        CustomerService.personIsFriend(person.id).then(res => setIsFriend(res.data))
        CustomerService.getMutualFriends(person.id).then(res => setMutualFriends(res.data.length))
    }, [])

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia onClick={() => history.push(`/user/${person.id}`)} component="img" alt="person" height="140px"
                           image={person.provider !== "local" ? person.picture : person.picture ? `http://localhost:8080/customers/image/${person.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {person.firstName} {person.lastName} {isFriend && <GroupIcon color="primary" />}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div className="flexed-container">
                    <Typography variant="body2" component="p">
                        Trips: {bookings.length}
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.mutualFriends}>
                        {mutualFriends} mutual friend(s)
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className={classes.iconContainer}>
                        <FriendStatus personId={person.id}/>
                    </Typography>
                </div>
            </CardActions>
        </Card>
    );
};

export default PersonCard;
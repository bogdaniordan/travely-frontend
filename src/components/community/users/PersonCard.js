import React, {useEffect, useState} from 'react';
import CardActionArea from "@material-ui/core/CardActionArea";
import {Card, CardActions, CardMedia} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import BookingService from "../../../service/BookingService";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import CustomerService from "../../../service/CustomerService";
import {useStyles} from "../../../styling/js-styling/PersonStyling";
import {useHistory} from "react-router-dom";
import FriendStatus from "./FriendStatus";

const PersonCard = ({person}) => {
    const classes = useStyles()
    const history = useHistory();
    const [bookings, setBookings] = useState([])
    const [isFriend, setIsFriend] = useState(false);
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const [receivedFriendRequest, setReceivedFriendRequest] = useState(false);
    const [mutualFriends, setMutualFriends] = useState(0);

    useEffect(() => {
        BookingService.getAllByCustomerId(person.id).then(res => setBookings(res.data));
        // personIsFriend();
        CustomerService.getMutualFriends(person.id).then(res => setMutualFriends(res.data.length))
        // CustomerService.receivedFriendRequest(person.id).then(res => setReceivedFriendRequest(res.data));
    }, [])

    // const personIsFriend = () => {
    //     // checks if person is friend, if not, check if there is a sent friend request for this person
    //     CustomerService.personIsFriend(person.id).then(res => {
    //         setIsFriend(res.data)
    //         if (!res.data) {
    //             CustomerService.friendRequestSentToUser(person.id).then(res => setFriendRequestSent(res.data))
    //         }
    //     })
    // }
    //
    // const addFriend = () => {
    //     CustomerService.addFriend(person.id).then(response => setFriendRequestSent(true));
    // }
    //
    // const removeFriend = () => {
    //     CustomerService.removeFriend(person.id).then(response => {
    //         setIsFriend(false);
    //         setReceivedFriendRequest(false);
    //         setFriendRequestSent(false);
    //     });
    // }
    //
    // const cancelFriendRequest = () => {
    //     CustomerService.cancelFriendRequest(person.id).then(response => setFriendRequestSent(false));
    // }
    //
    // const acceptFriendRequest = () => {
    //     CustomerService.acceptFriendRequest(person.id).then(response => setIsFriend(true));
    // }
    //
    // const denyFriendRequest = () => {
    //     CustomerService.denyFriendRequest(person.id).then(response => setReceivedFriendRequest(false));
    // }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia onClick={() => history.push(`/user/${person.id}`)} component="img" alt="person" height="140px" image={person.picture ? `http://localhost:8080/customers/image/${person.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {person.firstName} {person.lastName}
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
                        {/*{*/}
                        {/*    isFriend ?*/}
                        {/*        <PersonAddDisabledIcon color="error" onClick={removeFriend}/> : receivedFriendRequest ?*/}
                        {/*            (<div className="flexed-container">*/}
                        {/*                <PersonAddIcon color="success" onClick={acceptFriendRequest} style={{marginRight: "10px"}}/>*/}
                        {/*                <PersonAddDisabledIcon color="error" onClick={denyFriendRequest}/>*/}
                        {/*            </div>)*/}
                        {/*        : friendRequestSent ? <PersonAddDisabledIcon style={{color: "yellow"}} onClick={cancelFriendRequest}/> : < PersonAddIcon color="primary" onClick={addFriend}/>*/}
                        {/*}*/}
                        <FriendStatus personId={person.id}/>
                    </Typography>
                </div>
            </CardActions>
        </Card>
    );
};

export default PersonCard;
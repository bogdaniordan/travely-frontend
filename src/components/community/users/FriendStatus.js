import React, {useEffect, useState} from 'react';
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CustomerService from "../../../service/CustomerService";

const FriendStatus = ({personId}) => {
    const [isFriend, setIsFriend] = useState(false);
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    const [receivedFriendRequest, setReceivedFriendRequest] = useState(false);

    useEffect(() => {
        personIsFriend();
        CustomerService.receivedFriendRequest(personId).then(res => setReceivedFriendRequest(res.data));
    }, [])

    const addFriend = () => {
        CustomerService.addFriend(personId).then(response => setFriendRequestSent(true));
    }

    const removeFriend = () => {
        CustomerService.removeFriend(personId).then(response => {
            setIsFriend(false);
            setReceivedFriendRequest(false);
            setFriendRequestSent(false);
        });
    }

    const personIsFriend = () => {
        // checks if person is friend, if not, check if there is a sent friend request for this person
        CustomerService.personIsFriend(personId).then(res => {
            setIsFriend(res.data)
            if (!res.data) {
                CustomerService.friendRequestSentToUser(personId).then(res => setFriendRequestSent(res.data))
            }
        })
    }

    const cancelFriendRequest = () => {
        CustomerService.cancelFriendRequest(personId).then(response => setFriendRequestSent(false));
    }

    const acceptFriendRequest = () => {
        CustomerService.acceptFriendRequest(personId).then(response => setIsFriend(true));
    }

    const denyFriendRequest = () => {
        CustomerService.denyFriendRequest(personId).then(response => setReceivedFriendRequest(false));
    }

    return (
        <>
            {
                isFriend ?
                    <PersonAddDisabledIcon color="error" onClick={removeFriend}/> : receivedFriendRequest ?
                        (<div className="flexed-container">
                            <PersonAddIcon color="success" onClick={acceptFriendRequest} style={{marginRight: "10px"}}/>
                            <PersonAddDisabledIcon color="error" onClick={denyFriendRequest}/>
                        </div>)
                        : friendRequestSent ? <PersonAddDisabledIcon style={{color: "yellow"}} onClick={cancelFriendRequest}/> : < PersonAddIcon color="primary" onClick={addFriend}/>
            }
        </>
    );
};

export default FriendStatus;
import React, {useEffect, useState} from 'react';
import FriendStatus from "./FriendStatus";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import PostService from "../../../service/PostService";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import CommentIcon from '@mui/icons-material/Comment';
import CommentService from "../../../service/CommentService";
import {Collapse, IconButton} from "@material-ui/core";
import SimplePost from "./SimplePost";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CustomerService from "../../../service/CustomerService";

const UserSocialBar = ({userId, name, customer}) => {
    const history = useHistory();
    const [likedPosts, setLikedPosts] = useState([])
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const [socials, setSocials] = useState([]);
    const [showSocials, setShowSocials] = useState(false);
    const [getNotifications, setGetNotifications] = useState(false);

    useEffect(() => {
        PostService.getPostedPosts(userId).then(res => setPosts(res.data));
        PostService.getLikedPosts(userId).then(res => setLikedPosts(res.data))
        CommentService.getPostedComments(userId).then(res => setComments(res.data))
        CustomerService.userIsInNotificationList(customer.id).then(res => setGetNotifications(res.data))
    }, [])

    const showLikedPosts = () => {
        setShowSocials(!showSocials)
        setSocials(likedPosts);
    }

    const showPostedPosts = () => {
        setShowSocials(!showSocials)
        setSocials(posts);
    }

    const addOrRemoveNotified = () => {
        if (!getNotifications) {
            CustomerService.addPersonToNotifiedList(customer.id).then(res => setGetNotifications(true));
        } else {
            CustomerService.removePersonFromNotified(customer.id).then(res => setGetNotifications(false));
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="reschedule-icons-container">
                        <h5 className="centered">
                            {name}
                            <span className="account-type-container">
                                {
                                    customer.provider === "local" ? <ManageAccountsIcon /> : customer.provider === "facebook" ? <FacebookIcon color="primary" /> :
                                        customer.provider === "google" ? <GoogleIcon color="primary" /> : <GitHubIcon />
                                }
                            </span>
                        </h5>
                        <p className="centered">
                            <FriendStatus personId={userId}/>
                        </p>
                        <p className="centered">
                            {likedPosts.length}<IconButton onClick={showLikedPosts}><ThumbUpIcon color="primary"/></IconButton>
                        </p>
                        <p className="centered">
                            {posts.length}<IconButton onClick={showPostedPosts}><ChatIcon color="primary"/></IconButton>
                        </p>
                        <p className="centered">
                            {comments.length} <CommentIcon color="primary" />
                        </p>
                        <p className="centered">
                            <IconButton color="primary" onClick={addOrRemoveNotified}>{getNotifications ?  <NotificationsActiveIcon/> : <NotificationsNoneIcon />}</IconButton>
                        </p>
                        <p className="centered">
                            <Button variant="contained" color="primary" onClick={() => history.push(`/chat/${userId}`)}>Chat</Button>
                        </p>
                    </div>
                </div>
            </div>
            <Collapse in={showSocials}>
                {
                    socials.map(
                        social => <SimplePost post={social}/>
                    )
                }
            </Collapse>
        </>
    );
};

export default UserSocialBar;
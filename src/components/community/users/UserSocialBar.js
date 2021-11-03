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

const UserSocialBar = ({userId, name}) => {
    const history = useHistory();
    const [likedPosts, setLikedPosts] = useState([])
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const [socials, setSocials] = useState([]);
    const [showSocials, setShowSocials] = useState(false);

    useEffect(() => {
        PostService.getPostedPosts(userId).then(res => setPosts(res.data));
        PostService.getLikedPosts(userId).then(res => setLikedPosts(res.data))
        CommentService.getPostedComments(userId).then(res => setComments(res.data))
    }, [])

    const showLikedPosts = () => {
        setShowSocials(!showSocials)
        setSocials(likedPosts);
    }

    const showPostedPosts = () => {
        setShowSocials(!showSocials)
        setSocials(posts);
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="reschedule-icons-container">
                        <h5 className="centered">{name}</h5>
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
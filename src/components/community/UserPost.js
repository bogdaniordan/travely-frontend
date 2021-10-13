import React, {useEffect, useState} from 'react';
import moment from "moment";
import CommentService from "../../service/CommentService";
import Comment from "./Comment";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PostService from "../../service/PostService";
import {Collapse, Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CloseIcon from '@mui/icons-material/Close';
import AuthService from "../../service/AuthService";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const UserPost = ({post, posts, setPosts}) => {
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const [likesNumber, setLikesNumber] = useState(0);
    const [postIsLiked, setPostIsLiked] = useState(false);
    const [showCommentInput, setShowCommentInput] = useState(false);

    useEffect(() => {
        CommentService.getAllForPost(post.id).then(res => setComments(res.data));
        PostService.getPostLikesNumber(post.id).then(res => setLikesNumber(res.data));
        PostService.postIsLiked(post.id).then(res => setPostIsLiked(res.data));
    }, [])

    const likePost = () => {
        PostService.likePost(post.id).then(res => {
            setLikesNumber(likesNumber + 1);
            setPostIsLiked(true);
        });
    }

    const unLikePost = () => {
        PostService.unLikePost(post.id).then(res => {
            setLikesNumber(likesNumber - 1);
            setPostIsLiked(false);
        })
    }

    const showCommentInputContainer = () => {
        setShowCommentInput(!showCommentInput)
    }


    const leaveComment = () => {
        if (commentInput.length > 0) {
            CommentService.leaveComment(commentInput, post.id).then(res => CommentService.getAllForPost(post.id).then(response => {
                setComments(response.data);
                setCommentInput("");
            }))
        }
    }

    const deletePost = () => {
        PostService.deletePost(post.id).then(res => setPosts(posts.filter(p => p.id !== post.id)));
    }

    return (
        <div className="card gedf-card">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="45" src={post.author.picture ? `http://localhost:8080/customers/image/${post.author.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"}
                                 alt=""/>
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">@{post.author.firstName} {post.author.lastName}</div>
                            {/*<div className="h7 text-muted">Miracles Lee Cross</div>*/}
                        </div>
                    </div>
                    <div className="likes-container">
                        {
                            post.location && <small className="post-location-text">{post.location} <LocationOnIcon /></small>
                        }
                        {likesNumber} <FavoriteIcon />
                    </div>
                </div>
            </div>
            <div className="card-body">
                {
                    post.author.id === AuthService.getCurrentUser().id && (
                        <CloseIcon color="error" style={{float: "right"}} onClick={deletePost}/>
                    )
                }
                <div className="text-muted h7 mb-2"><i className="fa fa-clock-o"></i>{moment(post.time.slice(0, 5)).subtract(1, 'months').format("DD-MM-YYYY, h:mm:ss a")}</div>
                <a className="card-link" href="#">
                    <h5>{post.title}</h5>
                </a>
                <p className="card-text">{post.content}</p>
            </div>
            {
                comments.length > 0 && (
                    <div>
                        <br/>
                        <h4>Comments</h4>
                        {
                            comments.map(
                                comment => (
                                   <Comment comment={comment} comments={comments} setComments={setComments}/>
                                )
                            )
                        }
                    </div>
                )
            }
            <div className="card-footer">
                {
                    postIsLiked ? (
                        <Button variant="outlined" color="primary" onClick={unLikePost} style={{margin: "5px"}}>Unlike</Button>
                    ) : (
                        <Button variant="outlined" color="primary" onClick={likePost} style={{margin: "5px"}}>Like</Button>
                    )
                }
                <Button variant="outlined" color="primary" onClick={showCommentInputContainer}>{!showCommentInput ? "Comment" : "Hide"}</Button>
            </div>
            <Collapse in={showCommentInput}>
                <div className="comments-section">
                    <input type="text" className="form-control" value={commentInput} onChange={e => setCommentInput(e.target.value)} placeholder="Leave a comment"/>
                    <Button variant="outlined" color="primary" onClick={leaveComment}>Submit</Button>
                </div>
            </Collapse>
        </div>
    );
};

export default UserPost;
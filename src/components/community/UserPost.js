import React, {useEffect, useState} from 'react';
import {Chip, Divider} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import CommentService from "../../service/CommentService";
import Comment from "./Comment";

const UserPost = ({post}) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        CommentService.getAllForPost(post.id).then(res => setComments(res.data))
    }, [])

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
                </div>
            </div>
            <div className="card-body">
                <div className="text-muted h7 mb-2"><i className="fa fa-clock-o"></i>{moment(post.time.slice(0, 5)).format("DD-MM-YYYY, h:mm:ss a")}</div>
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
                                   <Comment comment={comment} />
                                )
                            )
                        }
                    </div>
                )
            }
            <div className="card-footer">
                <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
            </div>

        </div>
    );
};

export default UserPost;
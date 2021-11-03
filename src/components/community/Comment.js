import React from 'react';
import {Divider} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import CloseIcon from '@mui/icons-material/Close';
import AuthService from "../../service/AuthService";
import CommentService from "../../service/CommentService";

const Comment = ({comment, comments, setComments}) => {

    const deleteComment = () => {
        CommentService.deleteComment(comment.id).then(res => setComments(comments.filter(com => com.id !== comment.id)));
    }

    return (
        <div>
            <Divider />
            <div className="card-body">
                {
                    comment.author.id === AuthService.getCurrentUser().id && (
                        <CloseIcon style={{float: "right"}} color="error" onClick={deleteComment}/>
                    )
                }
                <div className="text-muted h7 mb-2"><i className="fa fa-clock-o"></i>{moment(comment.time.slice(0, 5)).subtract(1, 'months').format("DD-MM-YYYY, h:mm:ss a")}</div>
                <div className="center-avatar-container" id="comment-container" >
                    <Avatar src={comment.author.provider !== "local" ? comment.author.picture : comment.author.picture ? `http://localhost:8080/customers/image/${comment.author.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} />
                    <p className="card-text" id="comment-text">{comment.content}</p>
                </div>
                <br/>
            </div>
        </div>
    );
};

export default Comment;
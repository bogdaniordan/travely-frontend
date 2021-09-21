import React from 'react';
import {Divider} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";

const Comment = ({comment}) => {
    return (
        <div>
            <Divider  />
            <div className="card-body">
                <div className="text-muted h7 mb-2"><i className="fa fa-clock-o"></i>{moment(comment.time.slice(0, 5)).format("DD-MM-YYYY, h:mm:ss a")}</div>
                <div className="center-avatar-container">
                    <Avatar style={{margin: "auto"}} src={comment.author.picture ? `http://localhost:8080/customers/image/${comment.author.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"} />
                </div>
                <br/>
                <p className="card-text">{comment.content}</p>
            </div>
        </div>
    );
};

export default Comment;
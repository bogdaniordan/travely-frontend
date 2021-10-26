import React from 'react';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";

const SimplePost = ({post}) => {
    return (
        <div className="card gedf-card" id="simple-post-container">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="45" src={post.author.picture ? `http://localhost:8080/customers/image/${post.author.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"}
                                 alt=""/>
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">@{post.author.firstName} {post.author.lastName}</div>
                        </div>
                    </div>
                    <div className="likes-container">
                        {
                            post.location && <small className="post-location-text">{post.location} <LocationOnIcon /></small>
                        }
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="text-muted h7 mb-2"><i className="fa fa-clock-o"></i>{moment(post.time.slice(0, 5)).subtract(1, 'months').format("DD-MM-YYYY, h:mm:ss a")}</div>
                <a className="card-link" href="#">
                    <h5>{post.title}</h5>
                </a>
                <p className="card-text">{post.content}</p>
            </div>
        </div>
    );
};

export default SimplePost;
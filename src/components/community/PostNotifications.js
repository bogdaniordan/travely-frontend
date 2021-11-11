import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import PostService from "../../service/PostService";

const PostNotifications = () => {
    const [postNotifications, setPostNotifications] = useState({});
    const [notificationsLength, setNotificationsLength] = useState(0);

    useEffect(() => {
       PostService.getPostNotifications().then(res => {
           setPostNotifications(res.data)
           setNotificationsLength(Object.keys(res.data).length);
           console.log(res.data)
           console.log(Object.keys(res.data).length) // size of the hashmap
       });
    },[])

    return (
        <>
            {
                notificationsLength && (
                    <div className="card">
                        <div className="card-body">
                            <div className="card">
                                <div className="card-body">
                                    {
                                        Object.keys(postNotifications).map(keyName => (
                                            <>{postNotifications[keyName].length} NEW POST(S) FROM {postNotifications[keyName][0].post.author.firstName}!!!</>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default PostNotifications;
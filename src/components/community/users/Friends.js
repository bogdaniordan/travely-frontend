import React, {useEffect, useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import CustomerService from "../../../service/CustomerService";
import Link from "react-router-dom/Link";
import AuthService from "../../../service/AuthService";


const Friends = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        CustomerService.getFriends(AuthService.getCurrentUser().id).then(res => setFriends(res.data))
    }, [])

    return (
            <li className="list-group-item">
                {
                    friends.length > 0 ? (
                        <div>
                            <h5>Chat with friends</h5>
                            <br/>
                            {
                                friends.map(
                                    user => (
                                        <div className="h5">
                                            <Link to={`/chat/${user.id}`}>
                                                <Avatar src={`http://localhost:8080/customers/image/${user.id}/download`} style={{margin: "auto"}}/>
                                            </Link>
                                            <small>{user.firstName} {user.lastName}</small>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    ) : (
                        <p className="p text-muted">You have don't have any users added as friends.</p>
                    )
                }
            </li>
    );
};

export default Friends;
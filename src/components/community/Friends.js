import React, {useState, useEffect} from 'react';
import Avatar from "@material-ui/core/Avatar";
import CustomerService from "../../service/CustomerService";
import AuthService from "../../service/AuthService";
import Link from "react-router-dom/Link";


const Friends = () => {
    const [otherUsers, setOtherUsers] = useState([]);

    useEffect(() => {
        CustomerService.getAllCustomersExcept(AuthService.getCurrentUser().id).then(res => setOtherUsers(res.data))
    }, [])

    return (
            <li className="list-group-item">
                <h5>Chat with others</h5>
                <br/>
                {
                    otherUsers.map(
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
            </li>
    );
};

export default Friends;
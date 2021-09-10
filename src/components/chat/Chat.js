import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import CustomerService from "../../service/CustomerService";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";

const Chat = (props) => {
    const otherUserId = props.match.params.userId;
    const [otherUser, setOtherUser] = useState({})

    useEffect(() => {
        CustomerService.getCustomerById(otherUserId).then(res => setOtherUser(res.data));
    }, [])

    return (
        <div>
            <Navbar title={"Chat"} subtitle={`Conversation with ${otherUser.firstName} ${otherUser.lastName}`}/>
            <div className="container">
                    <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12 col-12" >
                        <div className="card">
                            <div className="card-header">Chat</div>
                            <div className="card-body height3">
                                <ul className="chat-list">
                                    <li className="in">
                                        <div className="chat-img" style={{border: "1px solid black"}}>
                                            <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                                        </div>
                                        <div className="chat-body" style={{border: "1px solid black"}}>
                                            <div className="chat-message" style={{border: "1px solid black", marginLeft: "auto"}}>
                                                <h5>Jimmy Willams</h5>
                                                <p>Raw denim heard of them tofu master cleanse</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="out">
                                        <div className="chat-img">
                                            <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                        </div>
                                        <div className="chat-body">
                                            <div className="chat-message">
                                                <h5>Serena</h5>
                                                <p>Next level veard</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="in">
                                        <div className="chat-img">
                                            <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                                        </div>
                                        <div className="chat-body">
                                            <div className="chat-message">
                                                <h5 className="name">Jimmy Willams</h5>
                                                <p>Will stumptown scenes coffee viral.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="out">
                                        <div className="chat-img">
                                            <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                        </div>
                                        <div className="chat-body">
                                            <div className="chat-message">
                                                <h5>Serena</h5>
                                                <p>Tofu master best deal</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <input className="form-control" type="text"/>
                            <Button variant="contained" color="primary">Send</Button>
                        </div>
                    </div>
            </div>
            <Footer />
        </div>
    );
};

export default Chat;
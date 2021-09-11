import React, {useEffect, useRef, useState} from 'react';
import Navbar from "../navigation/Navbar";
import CustomerService from "../../service/CustomerService";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatService from "../../service/ChatService";
import AuthService from "../../service/AuthService";

const Chat = (props) => {
    let socket = new SockJS("http://localhost:8080/ws");
    let stompClient = Stomp.over(socket);

    const [connected, setConnected] = useState(false);
    const otherUserId = props.match.params.userId;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState({})

    const send = () => {
        if (connected) {
            const msg = {
                content: message,
                messageSenderId: AuthService.getCurrentUser().id,
                messageReceiverId: otherUserId,
                // sender: { #Todo vezi cu id acolo jos ca nu vede idul cand creezi obiectu
                //     id: AuthService.getCurrentUser().id
                // }
            };
            stompClient.send(`/app/chat/send-message`, {}, JSON.stringify(msg));
            setMessages([...messages, message])
        }
    }

    const connect =()=> {
        socket = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            frame => {
                setConnected(true);
                stompClient.subscribe("/topic/public", tick => {
                });
            },
            error => {
                console.log(error);
                setConnected(false);
            }
        );
    }
    const disconnect =()=> {
        if (stompClient) {
            stompClient.disconnect();
        }
        setConnected(false);
    }


    useEffect(() => {
        CustomerService.getCustomerById(otherUserId).then(res => setOtherUser(res.data))
        ChatService.getMessagesForConversation(AuthService.getCurrentUser().id, otherUserId).then(res => setMessages(res.data));
    }, [])

    return (
        <div>
            <Navbar title={"Chat"} subtitle={`Conversation with ${otherUser.firstName} ${otherUser.lastName}`}/>
                <div className="container">
                    {
                        connected ? (
                            <div>
                                <Button variant="contained" color="primary" disabled>Connect</Button>
                                <Button variant="contained" color="secondary" onClick={disconnect}>Disconnect</Button>
                            </div>
                        ) : (
                            <div>
                                <Button variant="contained" color="primary" onClick={connect}>Connect</Button>
                                <Button variant="contained" color="secondary" disabled>Disconnect</Button>
                            </div>
                        )
                    }
                        {/*<Button variant="contained" color="primary">Connect</Button>*/}
                        {/*<Button variant="contained" color="secondary">Disconnect</Button>*/}
                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12 col-12" >
                            <div className="card">
                                <div className="card-header">Chat</div>
                                <div className="card-body height3">
                                    <ul className="chat-list">
                                        {/*<li className="in">*/}
                                        {/*    <div className="chat-img" style={{border: "1px solid black"}}>*/}
                                        {/*        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="chat-body" style={{border: "1px solid black"}}>*/}
                                        {/*        <div className="chat-message" style={{border: "1px solid black", marginLeft: "auto"}}>*/}
                                        {/*            <h5>Jimmy Willams</h5>*/}
                                        {/*            <p>Raw denim heard of them tofu master cleanse</p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</li>*/}
                                        {/*<li className="out">*/}
                                        {/*    <div className="chat-img">*/}
                                        {/*        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="chat-body">*/}
                                        {/*        <div className="chat-message">*/}
                                        {/*            <h5>Serena</h5>*/}
                                        {/*            <p>Next level veard</p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</li>*/}
                                        {/*<li className="in">*/}
                                        {/*    <div className="chat-img">*/}
                                        {/*        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="chat-body">*/}
                                        {/*        <div className="chat-message">*/}
                                        {/*            <h5 className="name">Jimmy Willams</h5>*/}
                                        {/*            <p>Will stumptown scenes coffee viral.</p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</li>*/}
                                        {/*<li className="out">*/}
                                        {/*    <div className="chat-img">*/}
                                        {/*        <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="chat-body">*/}
                                        {/*        <div className="chat-message">*/}
                                        {/*            <h5>Serena</h5>*/}
                                        {/*            <p>Tofu master best deal</p>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</li>*/}
                                        {
                                            messages.map(
                                                message => (
                                                    <li className={message.sender.id === AuthService.getCurrentUser().id ? "out" : "in"}>
                                                        <div className="chat-img">
                                                            <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                                        </div>
                                                        <div className="chat-body">
                                                            <div className="chat-message">
                                                                <h5>Serena</h5>
                                                                <p>{message.content}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            )
                                        }
                                    </ul>
                                </div>
                                <input className="form-control" type="text" onChange={e => setMessage(e.target.value)}/>
                                <Button variant="contained" color="primary" onClick={send}>Send</Button>
                            </div>
                        </div>
                </div>
            <Footer />
        </div>
    );
};

export default Chat;
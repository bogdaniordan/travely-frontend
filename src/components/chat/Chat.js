import React, {useEffect, useState} from 'react';
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
        if (connected && message.length > 0) {
            const msg = {
                content: message,
                messageSenderId: AuthService.getCurrentUser().id,
                messageReceiverId: otherUserId,
                // sender: {},
                // receiver: {},
                time: new Date(),
                type: "SENT"
            };
            stompClient.send(`/app/chat/send-message`, {}, JSON.stringify(msg));
        }
    }

    const connect = () => {
        socket = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            frame => {
                setConnected(true);
                stompClient.subscribe("/topic/public", function(chatMessage) {
                    console.log(JSON.parse(chatMessage.body))
                    setMessages(messages => [...messages, JSON.parse(chatMessage.body)])
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

    const getFormattedDateAndTime = (time) => {
        if (time instanceof Date) {
            return time.toString();
        }
        return time[0] + "-" + time[1] + "-" + time[2] + " " + time[3] + ":" + time[4] + ":" + time[5];
    }

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
                                        {/*{*/}
                                        {/*    messages.map(*/}
                                        {/*        message => (*/}
                                        {/*            <li className="out">*/}
                                        {/*                <div className="chat-img">*/}
                                        {/*                    <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="chat-body">*/}
                                        {/*                    <div className="chat-message">*/}
                                        {/*                        <h5>Serena</h5>*/}
                                        {/*                        <p>{message.content}</p>*/}
                                        {/*                        /!*<small>{getFormattedDateAndTime(message.time)}</small>*!/*/}
                                        {/*                    </div>*/}
                                        {/*                </div>*/}
                                        {/*            </li>*/}
                                        {/*        )*/}
                                        {/*    )*/}
                                        {/*}*/}
                                        {
                                            messages.map(
                                                message => (
                                                    <li className={(message.sender ? message.sender.id : message.messageSenderId) === AuthService.getCurrentUser().id ? "out" : "in"}>
                                                        <div className="chat-img">
                                                            <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                                                        </div>
                                                        <div className="chat-body">
                                                            <div className="chat-message">
                                                                <h5>Serena</h5>
                                                                <p>{message.content}</p>
                                                                {/*<small>{getFormattedDateAndTime(message.time)}</small>*/}
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
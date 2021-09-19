import React, {useEffect, useRef, useState} from 'react';
import Navbar from "../navigation/Navbar";
import CustomerService from "../../service/CustomerService";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatService from "../../service/ChatService";
import AuthService from "../../service/AuthService";
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";

const ChatPage = (props) => {
    let socket = new SockJS("http://localhost:8080/ws");
    let stompClient = Stomp.over(socket);
    const messagesEndRef = useRef(null)

    const [connected, setConnected] = useState(false);
    const otherUserId = props.match.params.userId;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState({})

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end"})
    }

    const send = () => {
        if (connected && message.length > 0) {
            const msg = {
                content: message,
                messageSenderId: AuthService.getCurrentUser().id,
                messageReceiverId: otherUserId,
                time: new Date(),
                type: "SENT"
            };
            stompClient.send(`/app/chat/send-message`, {}, JSON.stringify(msg));
            setMessage("")
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
                    setMessages(messages => [...messages, JSON.parse(chatMessage.body)])
                    scrollToBottom();
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
        ChatService.getMessagesForConversation(AuthService.getCurrentUser().id, otherUserId).then(res => {
            setMessages(res.data)
            scrollToBottom();
        });
    }, [])

    return (
        <div>
            <Navbar title={"ChatPage"} subtitle={`Conversation with ${otherUser.firstName} ${otherUser.lastName}`}/>
                <div className="container">
                    <h5>You have to connect to be able to send or receive messages.</h5>
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
                    <br/>
                        <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12 col-12" >
                            <div className="card">
                                <div className="card-header">{otherUser.firstName} {otherUser.lastName}</div>
                                <div className="card-body height3" style={{overflow: "auto", height: "600px"}} >
                                    <ul className="chat-list">
                                        {
                                            messages.map(
                                                message => (
                                                    <li className={(message.sender ? message.sender.id : message.messageSenderId) === AuthService.getCurrentUser().id ? "out" : "in"}>
                                                        <div className="chat-img">
                                                            <Avatar alt="Avatar" src={(message.sender ? message.sender.id : message.messageSenderId) === AuthService.getCurrentUser().id ? `http://localhost:8080/customers/image/${AuthService.getCurrentUser().id}/download` : `http://localhost:8080/customers/image/${otherUserId}/download`}/>
                                                        </div>
                                                        <div className="chat-body" >
                                                            <div className="chat-message" style={{width: "300px"}}>
                                                                {/*<h5>Serena</h5>*/}
                                                                <h5>{message.content}</h5>
                                                                {
                                                                    Array.isArray(message.time) ? (
                                                                        <small>{moment(message.time.slice(0, 5)).format("DD-MM-YYYY, h:mm:ss a")}</small>
                                                                    ) : (
                                                                        <small>{moment(message.time).format("DD-MM-YYYY, h:mm:ss a")}</small>
                                                                    )
                                                                }
                                                                <br/>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            )
                                        }
                                        {/*empty div for scrolling to bottom of the chat*/}
                                        <div ref={messagesEndRef}></div>
                                    </ul>
                                </div>
                                <div className="chat-input-container">
                                    <input className="form-control" type="text" value={message} onChange={e => setMessage(e.target.value)}/>
                                    <Button className="chat-send-button" variant="contained" color="primary" onClick={send}>Send</Button>
                                </div>

                            </div>
                        </div>
                </div>
            <Footer />
        </div>
    );
};

export default ChatPage;
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
import {Link} from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import { Scrollbars } from 'react-custom-scrollbars';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const ChatPage = (props) => {
    let socket = new SockJS("http://localhost:8080/ws");
    let stompClient = Stomp.over(socket);
    const messagesEndRef = useRef(null)

    const [isFriend, setIsFriend] = useState(false);
    const [connected, setConnected] = useState(false);
    const otherUserId = props.match.params.userId;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState({})
    const [currentLoggedUser, setCurrentLoggedUser] = useState({});

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
            const markedMessages = markMessagesAsSeen(res.data)
            setMessages(markedMessages)
            scrollToBottom();
        });
        CustomerService.personIsFriend(otherUserId).then(res => setIsFriend(res.data))
        CustomerService.getCustomerById(AuthService.getCurrentUser().id).then(res => setCurrentLoggedUser(res.data))
    }, [])

    const markMessagesAsSeen = messages => {
        messages.forEach(message => {
            if (message.sender.id === parseInt(otherUserId)) {
                message.type = "SEEN";
                ChatService.markMessageAsSeen(message.id)
            }
        })
        return messages;
    }

    return (
        <div>
            <Navbar title={"Chat page"} subtitle={`Conversation with ${otherUser.firstName} ${otherUser.lastName}`}/>
                <div className="container">
                    <Link to={`/profile`} style={{float: "left"}}>Back to profile</Link>
                    <br/>
                    <ChatIcon style={{height: "150px", width: "150px", marginBottom: "50px"}} color="primary"/>
                    {
                        isFriend ? (
                            <h4>You have to connect to be able to send messages to {otherUser.firstName} {otherUser.lastName}.</h4>
                        ) : (
                            <h4>You cannot send or receive messages from {otherUser.firstName} {otherUser.lastName} since he/she is not your friend.</h4>
                        )
                    }
                    <br/>
                    {
                        connected ? (
                            <div>
                                <Button variant="contained" color="primary" disabled style={{marginRight: "10px"}}>Connect</Button>
                                <Button variant="contained" color="secondary" onClick={disconnect}>Disconnect</Button>
                            </div>
                        ) : (
                            <div>
                                <Button variant="contained" color="primary" onClick={connect} style={{marginRight: "10px"}}>Connect</Button>
                                <Button variant="contained" color="secondary" disabled>Disconnect</Button>
                            </div>
                        )
                    }
                    <br/>
                    <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12 col-12" id="chat-container">
                        <div className="card">
                            <div className="card-header">{otherUser.firstName} {otherUser.lastName}</div>
                                <div className="card-body height3" style={{overflow: "auto", height: "600px"}}>
                                    <Scrollbars className="scrollbar">
                                        <ul className="chat-list">
                                            {
                                                messages.map(
                                                    message => (
                                                        <li className={(message.sender ? message.sender.id : message.messageSenderId) === AuthService.getCurrentUser().id ? "out" : "in"}>
                                                            <div className="chat-img">
                                                                <Avatar alt="Avatar" src={(message.sender ? message.sender.id : message.messageSenderId) === AuthService.getCurrentUser().id
                                                                    ? (currentLoggedUser.provider !== "local" ? currentLoggedUser.picture : `http://localhost:8080/customers/image/${AuthService.getCurrentUser().id}/download`) :
                                                                    (otherUser.provider !== "local" ? otherUser.picture : `http://localhost:8080/customers/image/${otherUserId}/download`)}/>
                                                            </div>
                                                            <div className="chat-body" >
                                                                <div className="chat-message" style={{width: "300px"}}>
                                                                    <h5>{message.content}</h5>
                                                                    {
                                                                        Array.isArray(message.time) ? (
                                                                            <small className="message-date">{moment(message.time.slice(0, 5)).subtract(1, 'months').format("DD-MM-YYYY, h:mm:ss a")}</small>
                                                                        ) : (
                                                                            <small className="message-date">{moment(message.time).subtract(1, 'months').format("DD-MM-YYYY, h:mm:ss a")}</small>
                                                                        )
                                                                    }
                                                                    <small className="chat-status">{message.type === "SENT" ? <DoneIcon /> : <DoneAllIcon />}</small>
                                                                    <br/>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                )
                                            }
                                            <div ref={messagesEndRef}></div>
                                        </ul>
                                    </Scrollbars>
                                </div>
                            <div className="chat-input-container">
                                <input className="form-control" type="text" value={message} onChange={e => setMessage(e.target.value)}/>
                                <Button variant="contained" color="primary" onClick={send} startIcon={<SendIcon />} disabled={!isFriend} style={{height: "88%", marginTop: "7px"}}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            <br/>
            <Footer />
        </div>
    );
};

export default ChatPage;
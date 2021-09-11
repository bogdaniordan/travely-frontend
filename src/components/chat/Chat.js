import React, {useEffect, useRef, useState} from 'react';
import Navbar from "../navigation/Navbar";
import CustomerService from "../../service/CustomerService";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import SockJsClient from 'react-stomp';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Chat = (props) => {
    let connected = false;
    let socket = new SockJS("http://localhost:8080/ws");
    let stompClient = Stomp.over(socket);

    const send = () => {
        // // console.log(socket)
        // console.log(stompClient)
        // console.log(stompClient.connect)
        // console.log(stompClient && stompClient.connected)
        if (stompClient) {
            const msg = { content: message, sender: "Me" };
            stompClient.send("/app/chat/sendMessage", {}, JSON.stringify(msg));
        }
    }
    const connect =()=> {
        // socket = new SockJS("http://localhost:8080/ws");
        // stompClient = Stomp.over(socket);
        stompClient.connect(
            {},
            frame => {
                connected = true;
                stompClient.subscribe("/topic/public", tick => {
                });
            },
            error => {
                console.log(error);
                connected = false;
            }
        );
    }
    // const disconnect =()=> {
    //     if (stompClient) {
    //         stompClient.disconnect();
    //     }
    //     connected = false;
    // }
    // const tickleConnection =()=> {
    //     connected ? disconnect() : connect();
    // }

    const otherUserId = props.match.params.userId;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [otherUser, setOtherUser] = useState({})

    useEffect(() => {
        CustomerService.getCustomerById(otherUserId).then(res => setOtherUser(res.data))
        connect();
        // console.log(socket)
        // console.log(stompClient)
        // console.log(stompClient.connect)
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
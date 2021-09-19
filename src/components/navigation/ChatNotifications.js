import React, {useEffect, useState} from 'react';
import {useStyles} from "../../styling/NavbarBadgeStyling";
import {Badge, Popover} from "@material-ui/core";
import Link from "react-router-dom/Link";
import Typography from "@material-ui/core/Typography";
import ChatIcon from '@material-ui/icons/Chat';
import ChatService from "../../service/ChatService";
import AuthService from "../../service/AuthService";

const ChatNotifications = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [chatMessagesPerUser, setChatMessagesPerUser] = useState([]);
    const [notificationsNumber, setNotificationsNumber] = useState(0);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        ChatService.getAsUnseenMessages(AuthService.getCurrentUser().id).then(res => {
            console.log(res.data)
            setChatMessagesPerUser(res.data);
            setNotificationsNumber(res.data.filter(conversation => conversation.length > 0).length)
        })
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setNotificationsNumber(0);
    };

    const markMessagesAsSeen = messages => {
        messages.forEach(message => ChatService.markMessageAsSeen(message.id));
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const presentUnseenMessages = () => {
        if (chatMessagesPerUser.length === 0) {
            return true;
        } else if (chatMessagesPerUser.length > 0) {
            chatMessagesPerUser.forEach(conversation => {
                if (conversation.length > 0) {
                    return false;
                }
            })
        }
        return true;
    }

    return (
        <div className={classes.root}>
            <Badge badgeContent={notificationsNumber} color="primary">
                <Link><ChatIcon color="primary" onClick={handleClick}/></Link>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Typography className={classes.typography}>
                        {
                            presentUnseenMessages() ? (
                                chatMessagesPerUser.map(
                                    chatMessages => (
                                        chatMessages.length > 0 && (
                                            <div>
                                                <p>
                                                    <Link
                                                        to={`/chat/${chatMessages[0].sender.id}`}
                                                        onClick={() => markMessagesAsSeen(chatMessages)}
                                                    >
                                                        <strong>{chatMessages.length} new messages</strong>
                                                    </Link>
                                                </p>
                                                <small>{`- ${chatMessages[0].sender.firstName} ${chatMessages[0].sender.lastName}`}</small>
                                                <br />
                                            </div>
                                        )
                                    )
                                )
                            ) : (
                                "No new messages"
                            )
                        }
                    </Typography>
                </Popover>
            </Badge>
        </div>
    );
};

export default ChatNotifications;
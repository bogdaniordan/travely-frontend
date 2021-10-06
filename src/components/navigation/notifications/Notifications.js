import React, {useEffect, useState} from 'react';
import {Badge, Popover} from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import QuestionService from "../../../service/QuestionService";
import {useStyles} from "../../../styling/js-styling/NavbarBadgeStyling";
import CustomerService from "../../../service/CustomerService";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';

const Notifications = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [notificationsNumber, setNotificationsNumber] = useState(0);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        QuestionService.getAllQuestions().then(res => setQuestions(res.data));
        CustomerService.getAllReceivedFriendRequests().then(res => {
            setFriendRequests(res.data);
            setNotificationsNumber(res.data.length);
        });
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const acceptFriendRequests = id => {
        CustomerService.acceptFriendRequest(id).then(res => {
            // setFriendRequests(friendRequests.filter(fr => fr.id !== id));
            window.location.reload();
        })
    }

    const declineFriendRequest = id => {
        CustomerService.denyFriendRequest(id).then(res => {
            // setFriendRequests(friendRequests.filter(fr => fr.id !== id));
            window.location.reload();
        })
    }

    return (
        <div className={classes.root}>
            <Badge badgeContent={notificationsNumber} color="primary">
                <Link><NotificationsActiveIcon color="primary" onClick={handleClick}/></Link>
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
                        {questions.filter(question => question.response).length > 0
                            ? questions.map((q) =>
                                    q.response && (
                                        <div>
                                            <small>
                                                <Link
                                                    to={`/questions/${q.host.id}`}
                                                >
                                                    <strong>{q.response}</strong>
                                                </Link>
                                            </small>
                                            <small>{` - ${q.host.firstName} ${q.host.lastName}`}</small>
                                        </div>
                                    )
                            )
                            : "No responses"}
                    </Typography>
                    <hr className="mb-4"/>
                    <Typography className={classes.typography}>
                        {friendRequests.length > 0
                            ? friendRequests.map((request) =>
                                <div>
                                    <p>
                                        {request.sender.firstName} {request.sender.lastName}
                                    </p>
                                    <small></small>
                                    <div>
                                        <small>
                                            <PersonAddIcon color="success" onClick={() => acceptFriendRequests(request.sender.id)} />{" "}<PersonAddDisabledIcon color="error" onClick={() => declineFriendRequest(request.sender.id)} />
                                        </small>
                                    </div>
                                    <br />
                                </div>
                            )
                            : "No friend requests"}
                    </Typography>
                </Popover>
            </Badge>
        </div>
    );
};

export default Notifications;
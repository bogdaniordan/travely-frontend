import React, {useEffect, useState} from 'react';
import {Badge, Popover} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import QuestionService from "../../service/QuestionService";
import {useStyles} from "../../styling/NavbarBadgeStyling";

const Notifications = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [questions, setQuestions] = useState([]);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        QuestionService.getAllQuestions().then(res => setQuestions(res.data));
    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <Badge badgeContent={0} color="primary">
                <Button variant="contained" style={{backgroundColor: "#212529"}}><NotificationsActiveIcon color="primary" onClick={handleClick}/></Button>
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
                                            <p>
                                                <Link
                                                    to={`/question/${q.id}`}
                                                >
                                                    <strong>{q.response}</strong>
                                                </Link>
                                            </p>
                                            <small>{`- ${q.author}`}</small>
                                            <br />
                                        </div>
                                    )
                            )
                            : "No responses"}
                    </Typography>
                </Popover>
            </Badge>
        </div>
    );
};

export default Notifications;
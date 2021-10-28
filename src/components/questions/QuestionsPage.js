import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import QuestionService from "../../service/QuestionService";
import AuthService from "../../service/AuthService";
import HostService from "../../service/HostService";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import ErrorIcon from '@mui/icons-material/Error';
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useStyles} from "../../styling/js-styling/IconsStyling";

const QuestionsPage = (props) => {
    const classes = useStyles();
    const hostId = props.match.params.hostId;
    const [questions, setQuestions] = useState([]);
    const [host, setHost] = useState({})

    useEffect(() => {
        QuestionService.getAllForHost(AuthService.getCurrentUser().id, hostId).then(res => setQuestions(res.data));
        HostService.getHostById(hostId).then(res => setHost(res.data))
    }, [])

    const deleteQuestion = id => {
        QuestionService.deleteQuestion(id).then(res => setQuestions(questions.filter(question => question.id !== id)));
    }

    return (
        <div>
            <Navbar title={"Questions"} subtitle={`View your questions with ${host.firstName} ${host.lastName}`}/>
            {
                questions.length > 0 ? (
                    <div>
                        <h4>Your question timeline with {host.firstName} {host.lastName} - {questions.length} question(s) asked</h4>
                        <br/>
                        <div className="container" id="car-rentals-container">
                            <Link to={`/profile`} style={{float: "left"}}>Back to profile</Link>
                            <br/>
                            <br/>
                            <div className="timeline">
                                {
                                    questions.map(
                                        (question, index) => (
                                            <div className="timeline-row">
                                                <div className="timeline-time">{moment(question.date).format("DD-MMM-YYYY")}</div>
                                                <div className="timeline-dot fb-bg"></div>
                                                <div className="timeline-content">
                                                    {
                                                        index % 2 === 1 ? (
                                                            <Avatar src={question.response ? `http://localhost:8080/hosts/image/${host.id}/download` : "https://www.clipartmax.com/png/middle/158-1589466_pause-time-load-wait-ui-process-comments-logo-snapchat-noir.png"} className={classes.questionRightAvatar}/>
                                                        ) : (
                                                            <Avatar src={question.response ? `http://localhost:8080/hosts/image/${host.id}/download` : "https://www.clipartmax.com/png/middle/158-1589466_pause-time-load-wait-ui-process-comments-logo-snapchat-noir.png"} className={classes.questionLeftAvatar}/>
                                                        )
                                                    }
                                                    <h4>Q: {question.text} <Button onClick={() => deleteQuestion(question.id)}><DeleteForeverIcon color="error" /></Button></h4>
                                                    {
                                                        question.response ? (
                                                            <p>A: {question.response}</p>
                                                        ) : (
                                                            <p>No response yet.</p>
                                                        )
                                                    }
                                                    <div className="">
                                                        <span className="badge badge-light">{question.seen ? "SEEN" : question.solved ? "SEEN" : "NOT SEEN"}</span>
                                                        <span className="badge badge-light">{question.solved ? "SOLVED" : "PENDING"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container" id="questions-error-container">
                        <Link to={`/profile`} className={classes.backLink}>Back to profile</Link>
                        <br/>
                        <ErrorIcon color="error" className={classes.errorIcon}/>
                        <h3 className="questions-error">You did not ask {host.firstName} {host.lastName} any questions yet.</h3>
                    </div>
                )
            }
            <Footer />
        </div>
    );
};

export default QuestionsPage;
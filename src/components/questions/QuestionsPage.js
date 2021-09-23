import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import QuestionService from "../../service/QuestionService";
import AuthService from "../../service/AuthService";
import HostService from "../../service/HostService";
import {useStyles, StyledTableRow, StyledTableCell} from "../../styling/QuestionsTableStyling";
import { Link } from "react-router-dom";

const QuestionsPage = (props) => {
    const classes = useStyles();
    const hostId = props.match.params.hostId;
    const [questions, setQuestions] = useState([]);
    const [host, setHost] = useState({})

    useEffect(() => {
        QuestionService.getAllForHost(AuthService.getCurrentUser().id, hostId).then(res => setQuestions(res.data));
        HostService.getHostById(hostId).then(res => setHost(res.data))
    }, [])

    const getFormattedDate = (date) => {
        return date[0] + "-" + date[1] + "-" + date[2];
    }

    return (
        <div>
            <Navbar title={"Questions"} subtitle={`View your questions with ${host.firstName} ${host.lastName}`}/>
            <Link to={`/profile`} style={{float: "left"}}>Back to profile</Link>
            <br/>
            <br/>
            <div className="container" style={{justifyContent: "center", height: "400px"}}>
                {
                    questions.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="caption table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Question</StyledTableCell>
                                        <StyledTableCell align="right" >Date</StyledTableCell>
                                        <StyledTableCell align="right" >Seen</StyledTableCell>
                                        <StyledTableCell align="right" >Status</StyledTableCell>
                                        <StyledTableCell align="right">Response</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {questions.map((question) => (
                                        <StyledTableRow key={question.id}>
                                            <TableCell component="th" scope="row">
                                                {question.text}
                                            </TableCell>
                                            <StyledTableCell align="right">{getFormattedDate(question.date)}</StyledTableCell>
                                            <StyledTableCell align="right">{question.seen ? "seen" : "not seen"}</StyledTableCell>
                                            <StyledTableCell align="right">{question.solved ? "solved" : "pending"}</StyledTableCell>
                                            <StyledTableCell align="right">{question.response}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (<h3>There are no questions at the moment.</h3>)
                }
            </div>
            <Footer />
        </div>
    );
};

export default QuestionsPage;
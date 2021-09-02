import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const QuestionsPage = (props) => {
    const hostId = props.match.params.hostId;
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        QuestionService.getAllForHost(AuthService.getCurrentUser().id, hostId).then(res => setQuestions(res.data))
    }, [])

    const getFormattedDate = (date) => {
        return date[0] + "-" + date[1] + "-" + date[2];
    }

    return (
        <div>
            <Navbar title={"My questions"}/>
            {/*<h4 style={{marginTop: "20px", marginBottom: "20px"}}>My questions</h4>*/}
            <div className="container" style={{justifyContent: "center"}}>

            <TableContainer component={Paper}>
                <Table style={{minWidth: "650px"}} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{backgroundColor: "black", color: "white"}}>Question</TableCell>
                            <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Date</TableCell>
                            <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Seen</TableCell>
                            <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Status</TableCell>
                            <TableCell align="right" style={{backgroundColor: "black", color: "white"}}>Response</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((question) => (
                            <TableRow key={question.id}>
                                <TableCell component="th" scope="row">
                                    {question.text}
                                </TableCell>
                                <TableCell align="right">{getFormattedDate(question.date)}</TableCell>
                                <TableCell align="right">{question.seen ? "seen" : "not seen"}</TableCell>
                                <TableCell align="right">{question.solved ? "solved" : "pending"}</TableCell>
                                <TableCell align="right">{question.response}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            <Footer />
        </div>
    );
};

export default QuestionsPage;
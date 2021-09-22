import React, {useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import QuestionService from "../../service/QuestionService";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const QuestionForm = () => {
    const location = useLocation();
    const booking = location.state.booking;
    const history = useHistory();

    const [question, setQuestion] = useState();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const submitQuestion = e => {
        e.preventDefault();
        if (question) {
            const author = booking.customer.firstName + " " + booking.customer.lastName
            QuestionService.saveQuestion(question, author, booking.customer.id, booking.host.id).then(
                res => {
                    setMessage("Question added. Redirecting to profile page...");
                    setSuccessful(true);
                    setTimeout(() => {
                        history.push("/profile");
                    }, 2000);
                },
                error => {
                    setMessage("Something went wrong. Could not add the question.");
                    setSuccessful(false);
                }
            )
        }
    }

    return (
        <div>
            <Navbar title={"Leave a question"}/>
            <div className="container" style={{height: "300px"}}>
                <div className="contact-image">
                    <LiveHelpIcon style={{margin: "auto", height: "100px", width: "100px"}} color="primary"/>
                </div>
                <br/>
                <form method="post" onSubmit={submitQuestion}>
                    <h4 style={{color: "black"}}>Drop {booking.host.firstName} {booking.host.lastName} a question</h4>
                    <br/>
                    <div className="row">
                        {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                        <div className="col-md-12">
                            <div className="form-group">
                                <textarea name="txtMsg" className="form-control" placeholder="Your question *"
                                          style={{width: "75%", height: "150px", margin: "auto"}} required onChange={(event) => setQuestion(event.target.value)}></textarea>
                            </div>
                            <br/>
                            <div className="form-group">
                                <Button type="submit" variant="contained" color="primary" value="Send question">Submit</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default QuestionForm;
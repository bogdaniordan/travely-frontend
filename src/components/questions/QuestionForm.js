import React, {useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import Navbar from "../navigation/Navbar";
import Footer from "../navigation/Footer";
import Button from "@material-ui/core/Button";
import QuestionService from "../../service/QuestionService";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import {Link} from "react-router-dom";

const QuestionForm = () => {
    const location = useLocation();
    const booking = location.state.booking;
    const history = useHistory();
    const [question, setQuestion] = useState();

    const submitQuestion = e => {
        e.preventDefault();
        if (question) {
            const author = booking.customer.firstName + " " + booking.customer.lastName
            QuestionService.saveQuestion(question, author, booking.customer.id, booking.host.id).then(res => history.push("/profile"))
        }
    }

    return (
        <div>
            <Navbar title={"Leave a question"}/>
            <div className="container" id="car-rentals-container">
                <Link to="/profile" style={{float: "left"}}>Back to profile</Link>
                <br/>
                <br/>
                <div className="contact-image">
                    <LiveHelpIcon style={{margin: "auto", height: "100px", width: "100px", marginBottom: "50px"}} color="primary"/>
                </div>
                <br/>
                <form method="post" onSubmit={submitQuestion}>
                    <h4 className="leave-question-header">Have a question about your reservation? You can ask {booking.host.firstName} {booking.host.lastName} anything.</h4>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <textarea name="txtMsg" className="form-control" placeholder="Your question *"
                                          id="textarea-leave-question" required onChange={(event) => setQuestion(event.target.value)}></textarea>
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
import React, {useEffect, useState} from 'react';
import PersonCard from "./PersonCard";
import Navbar from "../../navigation/Navbar";
import Footer from "../../navigation/Footer";
import CustomerService from "../../../service/CustomerService";
import AuthService from "../../../service/AuthService";
import {Link} from "react-router-dom";
import FindInPageIcon from '@mui/icons-material/FindInPage';

const PeoplePage = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        CustomerService.getAllCustomersExcept(AuthService.getCurrentUser().id).then(res => setPeople(res.data))
    }, [])

    const getAllPeople = () => {
        CustomerService.getAllCustomersExcept(AuthService.getCurrentUser().id).then(res => setPeople(res.data))
    }

    const filterPeople = e => {
        if (e.target.value === "allPeople") {
            getAllPeople();
        } else if (e.target.value === "friends") {
            CustomerService.getFriends().then(res => setPeople(res.data));
        } else {
            CustomerService.getSuggestedPeople().then(res => setPeople(res.data))
        }
    }

    return (
        <div>
            <Navbar title="People" subtitle="Interact with people of Travely"/>
            <div className="container" id="people-container">
                <Link to={`/community`} style={{float: "left", marginBottom: "20px"}}>Back to community</Link>
                <br/>
                <div className="people-filter-container">
                    <p>Filter people</p>
                    <select className="form-select" aria-label="Default select example" id="people-filter" onChange={filterPeople}>
                        <option value="allPeople">All people</option>
                        <option value="friends">Friends</option>
                        <option value="notFriends">Not friends</option>
                    </select>
                </div>
                <br/>
                {/*<div className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>*/}

                {
                    people.length > 0 ? (
                        <div id="people-grid">
                            {
                                people.map(
                                    person => <PersonCard person={person} />
                                )
                            }
                        </div>
                    ) : (
                        <div className="no-people-container">
                            <FindInPageIcon color="error" style={{width: "100px", height: "100px", marginBottom: "20px"}}/>
                            <h4>No people found for the applied filter.</h4>
                        </div>
                    )
                }
                {/*<div id="people-grid">*/}

                {/*</div>*/}
            </div>
            <br/>
            <Footer />
        </div>
    );
};

export default PeoplePage;
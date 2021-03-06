import React, {useEffect, useState} from 'react';
import PersonCard from "./PersonCard";
import Navbar from "../../navigation/Navbar";
import Footer from "../../navigation/Footer";
import CustomerService from "../../../service/CustomerService";
import AuthService from "../../../service/AuthService";
import {Link} from "react-router-dom";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import {useStyles} from "../../../styling/js-styling/DatePickerWindowStyling";

const PeoplePage = () => {
    const classes = useStyles();
    const [people, setPeople] = useState([]);

    useEffect(() => {
        CustomerService.getAllCustomersExcept(AuthService.getCurrentUser().id).then(res => {
            clearPeopleState();
            setPeople(res.data)
        })
    }, [])

    const getAllPeople = () => {
        CustomerService.getAllCustomersExcept(AuthService.getCurrentUser().id).then(res => setPeople(res.data))
    }

    const getFriends = () => {
        CustomerService.getFriends(AuthService.getCurrentUser().id).then(res => {
            clearPeopleState();
            setPeople(res.data)
        });
    }

    const getNonFriends = () => {
        CustomerService.getSuggestedPeople().then(res => {
            clearPeopleState();
            setPeople(res.data)
        })
    }

    const clearPeopleState = () => {
        setPeople([])
    }

    const filterPeople = e => {
        if (e.target.value === "allPeople") {
            getAllPeople();
        } else if (e.target.value === "friends") {
            getFriends();
        } else {
           getNonFriends();
        }
    }

    return (
        <div>
            <Navbar title="People" subtitle="Interact with people of Travely"/>
            <div className="container" id="people-container">
                <Link to={`/community`} className={classes.backToCommunity}>Back to community</Link>
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
                            <FindInPageIcon color="error" className={classes.noPeople}/>
                            <h4>No people found for the applied filter.</h4>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    );
};

export default PeoplePage;
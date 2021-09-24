import React, {useEffect, useState} from 'react';
import PersonCard from "./PersonCard";
import Navbar from "../../navigation/Navbar";
import Footer from "../../navigation/Footer";
import CustomerService from "../../../service/CustomerService";
import AuthService from "../../../service/AuthService";
import {Link} from "react-router-dom";

const PeoplePage = () => {
    const [people, setPeople] = useState([[]])

    useEffect(() => {
        CustomerService.getAllCustomersExcept(AuthService.getCurrentUser().id).then(res => setPeople(res.data))
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container">
                <Link to={`/community`} style={{float: "left", marginBottom: "20px"}}>Back to community</Link>
            </div>
            <div className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px', gridAutoRows: 'minMax(100px, auto)'}}>
                    {
                        people.map(person => <PersonCard person={person} />)
                    }
                </div>
            <Footer />
        </div>
    );
};

export default PeoplePage;
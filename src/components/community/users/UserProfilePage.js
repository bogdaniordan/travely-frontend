import React, {useEffect, useState} from 'react';
import Navbar from "../../navigation/Navbar";
import Footer from "../../navigation/Footer";
import CustomerService from "../../../service/CustomerService";
import cover from "./cover_photo.jpg"
import Avatar from "@material-ui/core/Avatar";
import StatsBar from "../../customer/StatsBar";

const UserProfilePage = (props) => {
    const userId = props.match.params.userId;
    const [user, setUser] = useState({})

    useEffect(() => {
        CustomerService.getCustomerById(userId).then(res => setUser(res.data))
    }, [])

    return (
        <div>
            <Navbar title={user.firstName + " " + user.lastName} />
            <div className="container">
                <Avatar src={`http://localhost:8080/customers/image/${userId}/download`} style={{width: "150px", height: "150px", position: "absolute", marginLeft: "150px", marginTop: "175px", zIndex: 2}}/>
                <img src={cover} style={{width: "100%", height: "250px", marginBottom: "100px"}} alt="cover"/>
                <div className="card">
                    <div className="card-body">

                    </div>
                </div>
                <StatsBar />
            </div>
            <Footer />
        </div>
    );
};

export default UserProfilePage;
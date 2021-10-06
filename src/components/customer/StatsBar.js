import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import BookingService from "../../service/BookingService";
import AuthService from "../../service/AuthService";
import CustomerService from "../../service/CustomerService";

const StatsBar = () => {
    const [numberOfBookedNights, setNumberOfBookedNights] = useState(0)
    const [amountSpent, setAmountSpent] = useState(0);
    const [trips, setTrips] = useState(0);
    const [friends, setFriends] = useState(0);

    useEffect(() => {
        BookingService.getNumberOfBookedNights().then(res => setNumberOfBookedNights(res.data))
        BookingService.getAllByCustomerId(AuthService.getCurrentUser().id).then(res => {
            setTrips(res.data.length)
            res.data.forEach(booking => setAmountSpent(amountSpent + booking.price))
        })
        CustomerService.getFriends().then(res => setFriends(res.data.length))
    }, [])

    return (
        <div>
            <div className="row container d-flex justify-content-center" style={{height: "auto", margin: "0 auto"}}>
                <div className="col-xl-6 col-md-12" style={{width: "1200px"}}>
                    <div className="card user-card-full">
                        <div className="row m-l-0 m-r-0">
                            <h5>View stats</h5>
                            <br/>
                            <br/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="m-b-10 f-w-600">Trips</p>
                                    <h6 className="text-muted f-w-400">{trips}</h6>
                                </div>

                                <div className="col-sm-3">
                                    <p className="m-b-10 f-w-600">Nights booked</p>
                                    <h6 className="text-muted f-w-400">{numberOfBookedNights}</h6>
                                </div>
                                <div className="col-sm-3">
                                    <p className="m-b-10 f-w-600">Amount spent</p>
                                    <h6 className="text-muted f-w-400">{amountSpent}</h6>
                                </div>
                                <div className="col-sm-3">
                                    <p className="m-b-10 f-w-600">Friends</p>
                                    <h6 className="text-muted f-w-400">{friends}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsBar;
import React from 'react';
import Button from "@material-ui/core/Button";
import InfoIcon from '@mui/icons-material/Info';
import {Paper} from "@material-ui/core";
import {useStyles} from "../../styling/js-styling/QuestionsTableStyling";

const CarExtras = ({totalPrice, setTotalPrice, childSeatNumber, setChildSeatNumber, babySeatNumber, setBabySeatNumber, gps, setGps, setNotes}) => {
    const classes = useStyles();

    const addChildSeat = () => {
        setChildSeatNumber(childSeatNumber + 1);
        setTotalPrice(totalPrice + 30);
    }

    const removeChildSeat = () => {
        setChildSeatNumber(childSeatNumber - 1);
        setTotalPrice(totalPrice - 30);
    }

    const addBabySeat = () => {
        setBabySeatNumber(babySeatNumber + 1);
        setTotalPrice(totalPrice + 20);
    }

    const removeBabySeat = () => {
        setBabySeatNumber(babySeatNumber - 1);
        setTotalPrice(totalPrice - 20);
    }

    const removeGps = () => {
        setGps(gps - 1);
        setTotalPrice(totalPrice - 50);
    }

    const addGps = () => {
        setGps(gps + 1);
        setTotalPrice(totalPrice + 50);
    }

    return (
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <h5>Extra car features</h5>
                    <p><InfoIcon className={classes.infoIcon}/> Please note: Your own car insurance does not cover hire cars.</p>
                    <div className="card" id="car-extras-card">
                        <div className="card-body" id="car-extras-body">
                            <div className="car-extras-value">
                                <h5>Child seat</h5>
                                <small>$30 per rental</small>
                            </div>
                            <div className="car-extras-button-container">
                                <div className="car-buttons-container">
                                    <h4 className="car-extras-value-number">{childSeatNumber}</h4>
                                    <Button color="secondary" variant="outlined" disabled={childSeatNumber === 0} onClick={removeChildSeat} className={classes.minusButton}>-</Button>
                                    <Button color="primary" variant="outlined" disabled={childSeatNumber === 2} onClick={addChildSeat}>+</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" id="car-extras-card">
                        <div className="card-body" id="car-extras-body">
                            <div className="car-extras-value">
                                <h5>Baby seat</h5>
                                <small>$20 per rental</small>
                            </div>
                            <div className="car-extras-button-container">
                                <div className="car-buttons-container">
                                    <h4 className="car-extras-value-number">{babySeatNumber}</h4>
                                    <Button color="secondary" variant="outlined" disabled={babySeatNumber === 0} onClick={removeBabySeat} className={classes.minusButton}>-</Button>
                                    <Button color="primary" variant="outlined" disabled={babySeatNumber === 2} onClick={addBabySeat}>+</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card" id="car-extras-card">
                        <div className="card-body" id="car-extras-body">
                            <div className="car-extras-value">
                                <h5>GPS</h5>
                                <small>$50 per rental</small>
                            </div>
                            <div className="car-extras-button-container">
                                <div className="car-buttons-container">
                                    <h4 className="car-extras-value-number">{gps}</h4>
                                    <Button color="secondary" variant="outlined" disabled={gps === 0} onClick={removeGps} className={classes.minusButton}>-</Button>
                                    <Button color="primary" variant="outlined" disabled={gps === 1} onClick={addGps}>+</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <Paper elevation={2} className={classes.paper}>
                        <br/>
                        <h5 className="notes-header">Notes</h5>
                        <br/>
                        <br/>
                        <textarea className="form-control" id="notes-input" onChange={e => setNotes(e.target.value)} placeholder="Enter any car booking notes">
                        </textarea>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default CarExtras;
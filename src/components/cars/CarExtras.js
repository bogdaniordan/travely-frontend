import React from 'react';
import Button from "@material-ui/core/Button";
import InfoIcon from '@mui/icons-material/Info';

const CarExtras = ({childSeatNumber, setChildSeatNumber, babySeatNumber, setBabySeatNumber, gps, setGps}) => {
    return (
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <h5>Payment and extras</h5>
                    <p><InfoIcon style={{color: "orange"}}/> Please note: Your own car insurance does not cover hire cars.</p>
                    <div className="card" id="car-extras-card">
                        <div className="card-body" id="car-extras-body">
                            <div className="car-extras-value">
                                <h5>Child seat</h5>
                                <small>$30 per rental</small>
                            </div>
                            <div className="car-extras-button-container">
                                <div className="car-buttons-container">
                                    <h4 className="car-extras-value-number">{childSeatNumber}</h4>
                                    <Button color="secondary" variant="outlined" disabled={childSeatNumber === 0} onClick={() => setChildSeatNumber(childSeatNumber - 1)} style={{marginRight: "10px"}}>-</Button>
                                    <Button color="primary" variant="outlined" disabled={childSeatNumber === 2} onClick={() => setChildSeatNumber(childSeatNumber + 1)}>+</Button>
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
                                    <Button color="secondary" variant="outlined" disabled={babySeatNumber === 0} onClick={() => setBabySeatNumber(babySeatNumber - 1)} style={{marginRight: "10px"}}>-</Button>
                                    <Button color="primary" variant="outlined" disabled={babySeatNumber === 2} onClick={() => setBabySeatNumber(babySeatNumber + 1)}>+</Button>
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
                                    <Button color="secondary" variant="outlined" disabled={gps === 0} onClick={() => setGps(gps - 1)} style={{marginRight: "10px"}}>-</Button>
                                    <Button color="primary" variant="outlined" disabled={gps === 1} onClick={() => setGps(gps + 1)}>+</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarExtras;
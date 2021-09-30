import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TextField, Tooltip} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import HostService from "../../service/HostService";
import {useStyles} from "../../styling/DatePickerWindowStyling";
import BookingService from "../../service/BookingService";

const BookingCard = ({customer, accommodation}) => {
    const classes = useStyles();
    const history = useHistory();
    const [checkinDate, setCheckinDate] = useState();
    const [checkoutDate, setCheckoutDate] = useState();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [hostBadges, setHostBadges] = useState([]);

    useEffect(() => {
        HostService.getHostBadges(accommodation.host.id).then(res => setHostBadges(res.data))
    }, [])

    const bookAccommodation = (checkInDate, checkoutDate, startingDate, endingDate) => {
        if (startingDate < endingDate && startingDate >= new Date()) {
            history.push({
                pathname: "/payment",
                state: {
                    booking: {
                        checkInDate: checkinDate,
                        checkoutDate: checkoutDate
                    },
                    accommodation: accommodation,
                    customer: customer
                }
            }, )
        } else {
            if (startingDate < new Date()) {
                setMessage("You cannot book current day or a date in the past.");
            } else {
                setMessage("Check-in needs to be before check-out date.");
            }
        }
    }

    const submitForm = e => {
        e.preventDefault();
        const startingDate = new Date(checkinDate);
        const endingDate = new Date(checkoutDate);
        // if checkout date is after arriving date and arriving date is later than today and if there is a booking between those dates...
        BookingService.accommodationCanBeBooked(startingDate, endingDate, accommodation.id).then(
            res => {
                if (res.data) {
                    bookAccommodation(checkinDate, checkoutDate, startingDate, endingDate)
                } else {
                    setMessage("Accommodation is already booked between those dates.");
                }
            })
    }

    return (
        <>
            <Card className={classes.root} onSubmit={submitForm}>
                <CardActionArea>
                    <CardContent align="center">
                        <Avatar style={{height: "80px", width: "80px", marginBottom: "5px"}} src={`http://localhost:8080/hosts/image/${accommodation.host.id}/download` ? `http://localhost:8080/hosts/image/${accommodation.host.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"}/>
                        <Typography gutterBottom variant="h6" component="h5">
                            {accommodation.host.firstName} {accommodation.host.lastName}
                        </Typography>
                        <div style={{display: "flex"}}>
                            {
                                hostBadges.map(
                                    badge => (
                                        <div style={{margin: "5px"}}>
                                            <small>{badge.name}</small>
                                            <Tooltip title={badge.description}>
                                                <Avatar style={{margin: "15px", height: "50px", width: "50px"}} src={`http://localhost:8080/hosts/image/badge/${badge.picture}/download`} />
                                            </Tooltip>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </CardContent>
                </CardActionArea>
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
                <CardActions>
                    <form className={classes.container}>
                        <Typography variant="body2" component="p">
                            Choose your check in and check out dates.
                        </Typography>
                        <br/>
                        <TextField
                            id="date"
                            label="Check-in"
                            type="date"
                            className={classes.textField}
                            required
                            InputLabelProps={{shrink: true}}
                            onChange={(event) => setCheckinDate(event.target.value)}
                        />
                        <TextField
                            id="date"
                            label="Check-out"
                            type="date"
                            className={classes.textField}
                            required
                            onChange={(event) => setCheckoutDate(event.target.value)}
                            InputLabelProps={{shrink: true}}

                        />
                        <br/>
                        <br/>
                        <Button size="large" type="submit" color="primary" variant="contained" style={{marginTop: "10px"}}>
                            BOOK
                        </Button>
                    </form>
                </CardActions>
            </Card>
        </>
    );
};

export default BookingCard;
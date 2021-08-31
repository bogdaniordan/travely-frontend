import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        // borderRadius: "25px",
        border: "0.5px solid black",
    },
    container: {
        // display: 'flex',
        flexWrap: 'wrap',
        textAlign: "middle"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
        margin: "10px"
    },
}));

const BookingCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [checkinDate, setCheckinDate] = useState();
    const [checkoutDate, setCheckoutDate] = useState();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const submitForm = e => {
        e.preventDefault();

        const startingDate = new Date(checkinDate);
        const endingDate = new Date(checkoutDate);
        // if checkout date is after arriving date and arriving date is later than today...
        if (startingDate < endingDate && startingDate >= new Date()) {
            setSuccessful(true);
            setMessage("Dates are available. Redirecting to payment page...");
            setTimeout(() => {
                history.push({
                    pathname: "/payment",
                    state: {
                        booking: {
                            checkInDate: checkinDate,
                            checkoutDate: checkoutDate
                        },
                        accommodation: props.accommodation,
                        customer: props.customer
                    }
                }, )
            },2500)
        } else {
            if (startingDate < new Date()) {
                setMessage("You cannot book a date in the past.");
            } else {
                setMessage("Check-in needs to be before check-out date.");
            }
        }
    }

    return (
        <>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Host"
                        height="140"
                        image="https://storage.googleapis.com/afs-prod/media/00acf28012674823a28e4f8bc1b462f8/800.jpeg"
                        title="Host"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h4">
                            {props.accommodation.host.firstName} {props.accommodation.host.lastName}
                        </Typography>

                    </CardContent>
                </CardActionArea>
            </Card>
            <br/>
            <Card className={classes.root} onSubmit={submitForm}>
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
                <br/>
                <CardActions>
                    <form className={classes.container}>
                        <Typography variant="body2" component="p">
                            Choose your dates and the number of guests for this reservation.
                        </Typography>
                        <TextField
                            id="date"
                            label="Check-in"
                            type="date"
                            className={classes.textField}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => setCheckinDate(event.target.value)}
                        />
                        <TextField
                            id="date"
                            label="Check-out"
                            type="date"
                            className={classes.textField}
                            required
                            onChange={(event) => setCheckoutDate(event.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br/>
                        <Button size="large" type="submit" color="primary" variant="contained" style={{marginTop: "10px"}}>
                            BOOK
                        </Button>
                    </form>
                </CardActions>
                <CardActions style={{alignItems: "center"}}>
                </CardActions>
            </Card>
        </>
    );
};

export default BookingCard;
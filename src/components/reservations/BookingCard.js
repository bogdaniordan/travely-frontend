import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import {useStyles} from "../../styling/js-styling/DatePickerWindowStyling";
import BookingService from "../../service/BookingService";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DateRange from "react-date-range/dist/components/DateRange";
import moment from "moment";
import {convertDates} from "../../utils/CityCoordinates";

const BookingCard = ({customer, accommodation}) => {
    const classes = useStyles();
    const history = useHistory();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [disabledDates, setDisabledDates] = useState([]);


    useEffect(() => {
        BookingService.getBookedDatesForAccommodation(accommodation.id).then(res => {
            setDisabledDates(convertDates(res.data))
        })
    }, [])


    const bookAccommodation = () => {
        if (!dates[0].endDate) {
            setShowErrorMessage(true);
        } else {
            history.push({
                pathname: "/payment",
                state: {
                    booking: {
                        checkInDate: dates[0].startDate.toString(),
                        checkoutDate: dates[0].endDate.toString()
                    },
                    accommodation: accommodation,
                    customer: customer
                }
            }, )
        }
    }

    return (
        <>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent align="center">
                        <Typography gutterBottom variant="h6" component="h5">
                            Enter your booking dates
                        </Typography>
                        <small>Note: Canceling your reservation is <span className="green-text">FREE.</span></small>
                        {
                            showErrorMessage && (
                                <Typography gutterBottom variant="h5" component="h4" className={classes.errorText}>
                                    Booking dates are missing!
                                </Typography>
                            )
                        }
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <form className={classes.container}>
                        <DateRange
                            // editableDateInputs={true}
                            onChange={item => {
                                setDates([item.selection])
                                setShowErrorMessage(false);
                            }}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            disabledDates={disabledDates}
                            minDate={new Date()}
                        />
                        <Button size="large" color="primary" variant="contained" className={classes.bookingButton} onClick={bookAccommodation}>
                            Reserve
                        </Button>
                    </form>
                </CardActions>
            </Card>
        </>
    );
};

export default BookingCard;
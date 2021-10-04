import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import {useStyles} from "../../styling/DatePickerWindowStyling";
import BookingService from "../../service/BookingService";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DateRange from "react-date-range/dist/components/DateRange";
import moment from "moment";

const BookingCard = ({customer, accommodation}) => {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [disabledDates, setDisabledDates] = useState([]);


    useEffect(() => {
        getBookedDates();
    }, [])

    const getBookedDates = () => {
        BookingService.getBookedDatesForAccommodation(accommodation.id).then(res => {
            let dates = [];
            res.data.forEach( date => {
                const converted = new Date(moment(date).format("YYYY-MM-DD"));
                converted.setMonth(converted.getMonth() - 1)
                dates.push(converted)
            });
            setDisabledDates(dates);
        })
    }

    const bookAccommodation = () => {
        history.push({
            pathname: "/payment",
            state: {
                booking: {
                    checkInDate: state[0].startDate.toString(),
                    checkoutDate: state[0].endDate.toString()
                },
                accommodation: accommodation,
                customer: customer
            }
        }, )
    }

    const submitForm = e => {
        e.preventDefault();
        bookAccommodation()

    }

    return (
        <>
            <Card className={classes.root} onSubmit={submitForm}>
                <CardActionArea>
                    <CardContent align="center">
                        <Typography gutterBottom variant="h6" component="h5">
                            Enter your booking dates
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <form className={classes.container}>
                        <DateRange
                            // editableDateInputs={true}
                            onChange={item => setState([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                            disabledDates={disabledDates}
                            minDate={new Date()}
                        />
                        <Button size="large" type="submit" color="primary" variant="contained" style={{marginTop: "10px"}}>
                            Reserve
                        </Button>
                    </form>
                </CardActions>
            </Card>
        </>
    );
};

export default BookingCard;
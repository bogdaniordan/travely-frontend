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
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DateRange from "react-date-range/dist/components/DateRange";
import moment from "moment";

const BookingCard = ({customer, accommodation}) => {
    const classes = useStyles();
    const history = useHistory();
    // const [message, setMessage] = useState("");
    // const [successful, setSuccessful] = useState(false);
    const [hostBadges, setHostBadges] = useState([]);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [disabledDates, setDisabledDates] = useState([]);


    useEffect(() => {
        HostService.getHostBadges(accommodation.host.id).then(res => setHostBadges(res.data));
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
        // const startingDate = moment(state[0].startDate).format("YYYY-MM-DD");
        // const endingDate = moment(state[0].endDate).format("YYYY-MM-DD");
        // BookingService.accommodationCanBeBooked(startingDate, endingDate, accommodation.id).then(
        //     res => {
        //         if (res.data) {
                    bookAccommodation()
                // } else {
                //     setMessage("Accommodation is already booked between those dates.");
                // }
            // })
    }

    return (
        <>
            <Card className={classes.root} onSubmit={submitForm}>
                <CardActionArea>
                    <CardContent align="center">
                        {/*<Avatar style={{height: "80px", width: "80px", marginBottom: "5px"}} src={`http://localhost:8080/hosts/image/${accommodation.host.id}/download` ? `http://localhost:8080/hosts/image/${accommodation.host.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"}/>*/}
                        {/*<Typography gutterBottom variant="h6" component="h5">*/}
                        {/*    {accommodation.host.firstName} {accommodation.host.lastName}*/}
                        {/*</Typography>*/}
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
                {/*{message && (*/}
                {/*    <div className="form-group">*/}
                {/*        <div*/}
                {/*            className={*/}
                {/*                successful ? "alert alert-success" : "alert alert-danger"*/}
                {/*            }*/}
                {/*            role="alert"*/}
                {/*        >*/}
                {/*            {message}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
                <CardActions>
                    <form className={classes.container}>
                        {/*<Typography variant="body2" component="p">*/}
                        {/*    Choose your check in and check out dates.*/}
                        {/*</Typography>*/}
                        {/*<br/>*/}
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
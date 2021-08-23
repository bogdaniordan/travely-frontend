import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        borderRadius: "25px",
        border: "1px solid black",
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
    const [checkinDate, setCheckinDate] = useState();
    const [checkoutDate, setCheckoutDate] = useState();

    const book = () => {

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
                        <Typography variant="body2" color="textSecondary" component="p">
                            Choose your dates and the number of guests for this reservation.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <br/>
            <Card className={classes.root}>
                <br/>
                <CardActions>
                    <form className={classes.container}>
                        <TextField
                            id="date"
                            label="Check-in"
                            type="date"
                            // defaultValue="2017-05-24"
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
                            // defaultValue="2017-05-24"
                            className={classes.textField}
                            required
                            onChange={(event) => setCheckoutDate(event.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br/>
                        {/*<InputLabel id="demo-simple-select-helper-label">Number of guests</InputLabel>*/}
                        {/*<Select*/}
                        {/*    label="Number of guests"*/}
                        {/*        required*/}
                        {/*        style={{width: "100px"}}*/}
                        {/*    >*/}
                        {/*        <MenuItem value="">*/}
                        {/*            <em></em>*/}
                        {/*            {props.capacity.map(number => <MenuItem value={number}>{number}</MenuItem>)}*/}
                        {/*        </MenuItem>*/}
                        {/*    </Select>*/}
                        {/*<br/>*/}
                        <Button size="large" color="primary" variant="contained" type="submit" style={{marginTop: "10px"}} onClick={book}>
                            BOOK
                        </Button>
                    </form>
                </CardActions>
                <CardActions style={{alignItems: "center"}}>

                    {/*<Button size="small" color="primary">*/}
                    {/*    Learn More*/}
                    {/*</Button>*/}
                </CardActions>
            </Card>
        </>
    );
};

export default BookingCard;
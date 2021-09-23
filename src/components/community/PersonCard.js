import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Card, CardActions, CardMedia} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import BookingService from "../../service/BookingService";
import AuthService from "../../service/AuthService";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        flex: "1 0 33%",
        margin: "5px",
    },
});

const PersonCard = ({person}) => {
    const classes = useStyles();
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        BookingService.getAllByCustomerId(person.id).then(res => setBookings(res.data));
    }, [])



    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="person"
                    height="140px"
                    image={person.picture ? `http://localhost:8080/customers/image/${person.id}/download` : "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {person.firstName} {person.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        friends or add friend
                    </Typography>
                    <Typography variant="body2" component="p">
                        Trips: {bookings.length}
                    </Typography>
                    <Typography variant="body2" component="p">
                        mutual friends number
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/*<IconButton aria-label="delete">*/}
                {/*    <DeleteIcon />*/}
                {/*</IconButton>*/}
            </CardActions>
        </Card>
    );
};

export default PersonCard;
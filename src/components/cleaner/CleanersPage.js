import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";
import {Link, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CleanerService from "../../service/CleanerService";
import Typography from "@material-ui/core/Typography"
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}));

const CleanersPage = () => {
    const classes = useStyles();
    const [cleaners, setCleaners] = useState([]);

    useEffect(() => {
        CleanerService.findAllCleaners().then(res => setCleaners(res.data))
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container" >
                <List style={{display: "flex"}}>
                    {
                        cleaners.map(
                            cleaner => (
                                <Paper elevation={2} style={{margin: "45px", width: "300px"}}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="http://cdn.onlinewebfonts.com/svg/img_507212.png" />
                                    </ListItemAvatar>
                                    {/*<Link*/}
                                    {/*    // to={`/customers/${question.customer.id}/questions/${question.id}`}*/}
                                    {/*>*/}
                                        <ListItemText
                                            key={cleaner.id}
                                            primary={
                                                <>
                                                    <p>cleaner.name</p>
                                                    {/*<small><Button variant="contained" color="primary">HIRE</Button></small>*/}
                                                </>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        <small key={cleaner.id}>
                                                            {/*<Link*/}
                                                            {/*    to={`/customers/${cleaner.id}`}*/}
                                                            {/*    key={cleaner.id}*/}
                                                            {/*>*/}
                                                                {cleaner.experience}
                                                            {/*</Link>*/}
                                                        </small>
                                                    </Typography>
                                                    {" - "}
                                                    {cleaner.hired ? "hired" : "free"}
                                                </React.Fragment>
                                            }
                                        />
                                    {/*</Link>*/}
                                </ListItem>
                                </Paper>
                            )
                        )
                    }

                </List>
            </div>
        </div>
    );
};

export default CleanersPage;
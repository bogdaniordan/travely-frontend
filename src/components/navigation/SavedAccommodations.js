import React, {useState, useEffect} from 'react';
import {useStyles} from "../../styling/NavbarBadgeStyling";
import Button from "@material-ui/core/Button";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import {Badge, Popover} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Link from "react-router-dom/Link";
import AccommodationService from "../../service/AccommodationService";
import AuthService from "../../service/AuthService";

const SavedAccommodations = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [savedAccommodations, setSavedAccommodations] = useState([]);

    useEffect(() => {
        AccommodationService.getAllSavedAccommodations(AuthService.getCurrentUser().id).then(res => setSavedAccommodations(res.data));
    }, [])

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <Badge badgeContent={0} color="primary">
                <Link><BookmarksIcon color="primary" onClick={handleClick}/></Link>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Typography className={classes.typography}>
                        {
                            savedAccommodations.length > 0 ? (
                                savedAccommodations.map(
                                    accommodation => (
                                        <div>
                                            <p>
                                                <Link
                                                    to={`/accommodation/${accommodation.id}`}
                                                >
                                                    <strong>{accommodation.title}</strong>
                                                </Link>
                                                <br/>
                                                 - <small>{accommodation.location}</small>
                                            </p>
                                            <br />
                                        </div>
                                    )
                                )
                            ) : ("No saved accommodations")
                        }
                    </Typography>
                </Popover>
            </Badge>
        </div>
    );
};

export default SavedAccommodations;
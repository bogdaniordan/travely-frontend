import React, {useState} from 'react';
import {useStyles} from "../../styling/NavbarBadgeStyling";

const SavedAccommodations = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [questions, setQuestions] = useState([]);

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

        </div>
    );
};

export default SavedAccommodations;
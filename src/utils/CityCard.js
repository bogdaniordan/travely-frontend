import React, {useEffect, useState} from 'react';
import {Link, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AccommodationService from "../service/AccommodationService";
import {useStyles} from "../styling/js-styling/AuthStyles";

const CityCard = ({searchByCity, city}) => {
    const classes = useStyles();
    const [propertiesNumber, setPropertiesNumber] = useState(0);

    useEffect(() => {
        AccommodationService.getByLocation(city[0]).then(res => setPropertiesNumber(res.data.length))
    }, [])

    return (
        <Paper elevation={2} className={classes.cityCardPaper}>
            <ListItem alignItems="center" className={classes.cityCardListItem}>
                <Link onClick={() => searchByCity(city[0])}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={city[1]} className={classes.cityCardAvatar} />
                    </ListItemAvatar>
                </Link>
                <ListItemText>
                    <h4 className="city-name-header">{city[0]}</h4>
                    <small id="properties-font" className="right-floated">{propertiesNumber} propertie(s)</small>
                </ListItemText>
            </ListItem>
        </Paper>
    );
};

export default CityCard;
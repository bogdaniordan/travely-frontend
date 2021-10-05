import React, {useEffect, useState} from 'react';
import {Link, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AccommodationService from "../service/AccommodationService";

const CityCard = ({searchByCity, city}) => {
    const [propertiesNumber, setPropertiesNumber] = useState(0);

    useEffect(() => {
        AccommodationService.getByLocation(city[0]).then(res => setPropertiesNumber(res.data.length))
    }, [])

    return (
        <Paper elevation={2} style={{margin: "60px"}}>
            <ListItem alignItems="center" style={{height: "120px"}}>
                <Link onClick={() => searchByCity(city[0])}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={city[1]} style={{height: "70px", width: "70px"}} />
                    </ListItemAvatar>
                </Link>

                <ListItemText>
                    <h4 className="city-name-header">{city[0]}</h4>
                    <small className="right-floated">{propertiesNumber} properties</small>
                </ListItemText>
            </ListItem>
        </Paper>
    );
};

export default CityCard;
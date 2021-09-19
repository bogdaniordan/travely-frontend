import React from 'react';
import {Link, List, ListItem, ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const FamousCityBar = ({searchByCity}) => {
    const exploreCities = [["Toronto", "https://image.flaticon.com/icons/png/512/185/185286.png"], ["Paris", "https://image.flaticon.com/icons/png/512/1969/1969369.png"], ["London", "https://image.flaticon.com/icons/png/512/555/555970.png"], ["Mumbai", "https://image.flaticon.com/icons/png/512/1533/1533062.png"]]

    return (
        <div className="container">
            <h4 style={{textAlign:'center', marginTop: "100px"}}>
                Explore famous cities
            </h4>
            <List style={{display: "flex"}}>
                {
                    exploreCities.map(
                        city => (
                            <Paper elevation={2} style={{margin: "60px"}}>
                                <ListItem alignItems="center" style={{height: "100px"}}>
                                    <Link onClick={() => searchByCity(city[0])}>

                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={city[1]} style={{height: "70px", width: "70px"}} />
                                        </ListItemAvatar>
                                    </Link>

                                    <ListItemText>
                                        <h4 style={{margin: "10px"}}>{city[0]}</h4>
                                    </ListItemText>
                                </ListItem>
                            </Paper>
                        )
                    )
                }
            </List>
        </div>
    );
};

export default FamousCityBar;
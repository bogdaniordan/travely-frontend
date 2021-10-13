import React from 'react';
import {List} from "@material-ui/core";
import CityCard from "./CityCard";

const FamousCityBar = ({searchByCity}) => {
    const exploreCities = [["Toronto", "https://image.flaticon.com/icons/png/512/185/185286.png"], ["Paris", "https://image.flaticon.com/icons/png/512/1969/1969369.png"], ["London", "https://image.flaticon.com/icons/png/512/555/555970.png"], ["Mumbai", "https://image.flaticon.com/icons/png/512/1533/1533062.png"]]

    return (
        <div className="container">
            {/*<div className="testimonials-clean">*/}
                <br/>
                <h4 className="explore-header">
                    Explore famous cities
                </h4>
                <List style={{display: "flex"}}>
                    {
                        exploreCities.map(
                            city => <CityCard searchByCity={searchByCity} city={city}/>
                        )
                    }
                </List>
            {/*</div>*/}
        </div>
    );
};

export default FamousCityBar;
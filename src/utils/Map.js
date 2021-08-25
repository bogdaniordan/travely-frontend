import React from "react";
import {
    GoogleMap,
    Marker,
    withScriptjs,
    withGoogleMap,
} from "react-google-maps";

const Map = withScriptjs(
    withGoogleMap((props) => {
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: props.lat, lng: props.lng }}
            >
                <Marker position={{ lat: props.lat, lng: props.lng }} />
            </GoogleMap>
        );
    })
);

export default Map;

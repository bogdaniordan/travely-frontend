import React, {useEffect} from 'react';
import Navbar from "../navigation/Navbar";
import {useLocation} from "react-router-dom";

const SearchResults = () => {
    const searchResults = useLocation().state.results;

    useEffect(() => {
        console.log(searchResults)
    })

    return (
        <div>
            <Navbar />
        </div>
    );
};

export default SearchResults;
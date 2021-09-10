import React, {useEffect, useState} from 'react';
import Navbar from "../navigation/Navbar";

const Chat = (props) => {
    const [otherUser, setOtherUser] = useState({})

    return (
        <div>
            <Navbar />
        </div>
    );
};

export default Chat;
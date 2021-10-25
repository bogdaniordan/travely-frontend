import React, {useState} from 'react';

const UserSocialBar = ({userId}) => {
    const [likedPosts, setLikedPosts] = useState([])
    const [posts, setPosts] = useState([]);

    return (
        <div className="card">
            <div className="card-body">
                <div className="reschedule-icons-container">
                    <p style={{margin: "auto"}}>liked posts</p>
                    <p style={{margin: "auto"}}>posts</p>
                    <p style={{margin: "auto"}}>chat</p>
                    <p style={{margin: "auto"}}>friends/not friends</p>
                </div>
            </div>
        </div>
    );
};

export default UserSocialBar;
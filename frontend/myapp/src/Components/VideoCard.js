import React from 'react'
import './VideoCard.css';
import BasicImage from '../photo/basic.png'; 

const VideoCard = ({ user }) => {
    //useState
    //useRef
    console.log(user)
    return (
        <div style={{width:'200px', height:'200px'}}>
            {user.profile_picture ? (
                 <img src={`${user.profile_picture}`} alt="profile" />
            ) : (
                <img src={BasicImage} alt="profile" />
            )}
           
        </div>
    )
}

export default VideoCard;
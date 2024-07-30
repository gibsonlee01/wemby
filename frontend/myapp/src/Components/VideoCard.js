import React, { Fragment } from 'react';
import './VideoCard.css';
import BasicImage from '../photo/basic.png'; 
import { Col } from 'reactstrap';

const VideoCard = ({ user }) => {
    return (
        <Fragment>
            <Col style={{ padding: '10px', backgroundColor: 'white' }}>
                <div style={{
                    border: '2px solid black', // 테두리 설정
                    padding: '10px', // 내부 여백
                    margin: '10px 0', // 요소 간격 추가
                    backgroundColor: 'white',
                    borderRadius: '10px' // 모서리 둥글게 설정 (선택사항)
                }}>
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        backgroundColor: 'white',
                        padding: '20px' // 내부 여백 추가
                    }}>
                        <h1>{user.name}</h1>
                    </div>
                    <div className="videoCard" style={{
                        width: '400px', 
                        height: '400px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                    }}>
                        {user.profile_picture ? (
                            <img src={`${user.profile_picture}`} alt="profile" />
                        ) : (
                            <img src={BasicImage} alt="profile" />
                        )}
                    </div>
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        backgroundColor: 'white',
                        padding: '20px' // 내부 여백 추가
                    }}>
                        <h1>{user.instagram_id}</h1>
                    </div>
                </div>
            </Col>
        </Fragment>
    );
}

export default VideoCard;

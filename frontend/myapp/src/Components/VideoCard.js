import React, { Fragment } from 'react';
import './VideoCard.css';
import BasicImage from '../photo/basic.png'; 
import { Col } from 'reactstrap';
import { useState } from 'react';
import ProfileImage from '../photo/profile.png';

const VideoCard = ({ user }) => {

    const [isBlurred, setIsBlurred] = useState(true);

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    // 모바일인지 여부에 따라 링크를 설정
    const instagramLink = isMobileDevice()
        ? `instagram://user?username=${user.instagram_id}`
        : `https://www.instagram.com/${user.instagram_id}`;


     // Instagram ID를 반으로 나누기
    const halfIndex = Math.ceil(user.instagram_id.length / 2);
    const visiblePart = user.instagram_id.slice(0, halfIndex);
    const blurredPart = user.instagram_id.slice(halfIndex);

    const handleLinkClick = (e) => {
        if (isBlurred) {
            e.preventDefault(); // 기본 동작을 막아 페이지 리로드를 방지
        }
    };


    return (
        <Fragment>
            <Col style={{ padding: '10px', backgroundColor: 'white' }}>
                    <div style={{
                        border: '2px solid black', // 테두리 설정
                        padding: '10px', // 내부 여백
                        margin: '10px 0', // 요소 간격 추가
                        backgroundColor: 'black', //
                        borderRadius: '10px' // 모서리 둥글게 설정 (선택사항)
                    }}>
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'flex-start', 
                        // padding: '3px' // 내부 여백 추가
                        paddingBottom: '8px'
                    }}>
                        <img src = {ProfileImage} alt="profile" style={{ width: '40px', height: '40px', borderRadius: '100%', backgroundColor:'white', padding:'1%' }} />
                        
                        <div style={{
                            display: 'flex', 
                            flexDirection: 'column', 
                            marginLeft: '10px',
                            gap: '5px', // 간격을 조정하기 위한 gap 속성
                        }}>
                            <h1 style={{ 
                                fontSize: '24px', 
                                color: 'white', 
                                margin: '0', // 요소 간의 간격을 좁히기 위해 margin 제거
                                padding: '0', // 필요에 따라 padding도 제거
                            }}>
                                {user.name}
                            </h1>
                            
                            <a
                                href={isBlurred ? '#' : instagramLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ 
                                    textDecoration: 'none', 
                                    color: 'inherit',
                                    margin: '0', // 요소 간의 간격을 좁히기 위해 margin 제거
                                    padding: '0', // 필요에 따라 padding도 제거
                                }}
                                onClick={handleLinkClick}
                            >
                                <h1 style={{ 
                                    color: 'white', 
                                    fontSize: '10px', 
                                    margin: '0', // 요소 간의 간격을 좁히기 위해 margin 제거
                                    padding: '0', // 필요에 따라 padding도 제거
                                }}>
                                    {visiblePart}
                                    <span className={isBlurred ? 'blurred-text' : ''}>{blurredPart}</span>
                                </h1>
                            </a>
                        </div>

                    </div>
            
                    <div className="videoCard" style={{
                        width: '400px', 
                        height: '400px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        borderRadius: '1%',
                    }}>
                        {user.profile_picture ? (
                            <img src={`${user.profile_picture}`} alt="profile" />
                        ) : (
                            <img src={BasicImage} alt="profile" />
                        )}
                    </div>
                    {/* <div>
                        <h1 style={{ color: 'white', fontSize: '16px', margin: '0', padding: '0' }}>
                            {user.description}
                        </h1>
                    </div> */}
                    <div style={{
                            position: 'absolute', 
                            bottom: '190px', // 버튼을 사진의 아래쪽에 배치
                            left: '50%', // 가로 중앙에 맞추기
                            transform: 'translateX(-50%)', // 가로 중앙 정렬
                            backgroundColor: 'rgba(0, 0, 0, 0.7)', // 반투명 검은색 배경
                            padding: '10px 20px', // 버튼 내부 여백
                            borderRadius: '5px', // 버튼 모서리 둥글게
                            width: '77%', // 버튼 양옆 길이 늘리기
                            textAlign: 'center' // 버튼 텍스트 가운데 정렬
                        }}>
                            <button style={{
                                background: 'none', // 버튼 배경 없애기
                                border: 'none', // 버튼 테두리 없애기
                                color: 'white', // 텍스트 색상
                                fontSize: '16px', // 텍스트 크기
                                cursor: 'pointer'
                            }} onClick={() => setIsBlurred(false)}>
                                See Whole!
                            </button>
                        </div>
                </div>
            </Col>
        </Fragment>
    );
}

export default VideoCard;

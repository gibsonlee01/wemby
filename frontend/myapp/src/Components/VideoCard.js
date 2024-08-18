import React, { Fragment } from 'react';
import './VideoCard.css';
import BasicImage from '../photo/basic.png'; 
import { Row } from 'reactstrap';
import { useState } from 'react';
import ProfileImage from '../photo/profile.png';
import Swal from 'sweetalert2';
import axios from 'axios';

const VideoCard = ({ user }) => {
    console.log(user)

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
        // if (isBlurred) {
        //     e.preventDefault(); // 기본 동작을 막아 페이지 리로드를 방지
        // }
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post('/api/kakaopay/ready', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            console.log("Response Data:", data);  // 응답 데이터 출력

            if(isMobileDevice()){
                if(data.next_redirect_mobile_url){
                    window.location.href = data.next_redirect_mobile_url;
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: '결제 오류',
                        text: '결제 페이지로 이동할 수 없습니다.',
                    });
                }
            }else{
                if (data.next_redirect_pc_url) {
                    window.location.href = data.next_redirect_pc_url;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '결제 오류',
                        text: '결제 페이지로 이동할 수 없습니다.',
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '결제 오류',
                text: '결제 준비 중 오류가 발생했습니다.',
            });
        }
    };


    return (
        <Fragment>
            <Row style={{width:'100%', minHeight:'300px' }}>
                {user.profile_picture ? (
                    <Row
                       style={{
                           padding: '10px', // 내부 여백
                           margin: '20px',
                           borderRadius: '10px', // 모서리 둥글게 설정
                           minHeight: '300px',
                           backgroundImage: `url(${user.profile_picture})`, // 배경 이미지 설정
                           backgroundSize: 'cover', // 이미지 크기 조절 (cover로 설정 시 전체를 덮음)
                           backgroundPosition: 'center', // 이미지 중앙에 위치
                           backgroundRepeat: 'no-repeat', // 이미지 반복 안 함
                           display: 'flex', // 콘텐츠 정렬을 위해 flexbox 사용
                           aspectRatio:'9/12'
                       }}
                   >
                       {/* <img src={`${user.profile_picture}`} alt="profile" /> */}
                   </Row>
                ) : (
                    <Row style={{
                        // border: '2px solid black', // 테두리 설정
                        padding: '10px', // 내부 여백
                        margin:'20px',
                        background: 'linear-gradient(to right, #DB4455, #F0939E)', 
                        borderRadius: '10px', // 모서리 둥글게 설정 (선택사항)
                        minHeight:'300px'
                    }}>
                           <button style={{
                                background: 'none', // 버튼 배경 없애기
                                border: 'none', // 버튼 테두리 없애기
                                color: 'white', // 텍스트 색상
                                fontSize: '16px', // 텍스트 크기
                                cursor: 'pointer'
                            }} onClick={() => Swal.fire({
                                icon: "info",
                                title: "결제 요청",
                                text: "아이디를 보시려면 1000원이 부과됩니다.",
                                showCancelButton: true,
                                confirmButtonText: "결제",
                                cancelButtonText: "취소",
                            }).then((result) => {
                                if(result.isConfirmed){
                                    //결제 창 url 
                                    // window.location.href = "https://kapi.kakao.com/v1/payment/ready";
                                    handlePayment();
                                }
                            })}>
                                See Whole!
                            </button>

                            <a
                                href={instagramLink}
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

        
                    </Row>
                )}
            </Row>
        </Fragment>
    );
}

export default VideoCard;

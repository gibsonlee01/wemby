import React, { Fragment } from 'react';
import './VideoCard.css';
import { Row } from 'reactstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie'; // 쿠키 라이브러리 추가
import { API_LIKES } from '../constants';
import Heart from "react-heart"
import InstagramIcon from '../photo/dm.svg';
import getRandomColor from '../views/function/function'

const VideoCard = ({ user }) => {
    console.log(user)

    const [isBlurred, setIsBlurred] = useState(true);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(user.likes); // 좋아요 수를 상태로 관리
    const [backgroundColor, setBackgroundColor] = useState(getRandomColor());



    useEffect(() => {
        const paymentStatus = Cookies.get(`paymentStatus${user.id}`);
        const cookieLiked = Cookies.get(`liked${user.id}`);
        if (paymentStatus === 'success') {
            setIsBlurred(false);
        }
        if (cookieLiked === 'true') {
            setLiked(true);
        }
        setBackgroundColor(getRandomColor());


    }, []);

    useEffect(() => {    
    }, [liked]);

    const isMobileDevice = () => {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

    const handleLikeClick = async (e) => {
        const newLikedStatus = !liked;
        setLiked(newLikedStatus);
        Cookies.set(`liked${user.id}`, newLikedStatus); // 쿠키에 결제 완료 상태 저장

        // 좋아요 증가 또는 감소 값 결정
        const likeChange = newLikedStatus ? 1 : -1;
    
        // 전송할 데이터 준비
        const formData = new FormData();
        formData.append('likeChange', likeChange);
        formData.append('user_id', user.id)
    
        try {
          const response = await axios.post(API_LIKES, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response.data)
          const newLikesCount = response.data.likes; // 서버에서 좋아요 수를 반환해야 함
          setLikes(newLikesCount); // 상태 업데이트

    
        } catch (error) {
          console.error('error', error);

        }

      };


    // 모바일인지 여부에 따라 링크를 설정
    const instagramLink = isMobileDevice()
        ? `instagram://user?username=${user.instagram_id}`
        : `https://www.instagram.com/${user.instagram_id}`;


     // Instagram ID를 반으로 나누기
    // const halfIndex = Math.ceil(user.instagram_id.length / 2);
    // const visiblePart = user.instagram_id.slice(0, halfIndex);
    // const blurredPart = user.instagram_id.slice(halfIndex);
    // 인스타그램 아이디의 절반만 보여줌 (나머지는 공백)
    const halfIndex = Math.ceil(user.instagram_id.length / 2); // 절반 기준
    const visiblePart = user.instagram_id.slice(0, halfIndex); // 절반만 보여줌
    const blurredPart = 'ℳ'.repeat(user.instagram_id.length - halfIndex); // 공백으로 나머지 숨김


    const handleLinkClick = (e) => {
        if (isBlurred) {
            e.preventDefault(); // 기본 동작을 막아 페이지 리로드를 방지
        } else {
            window.open(instagramLink);
        }
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post('/api/kakaopay/ready', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = response.data;
            localStorage.setItem('userId', user.id); // tid를 저장해둠
            localStorage.setItem('tid', data.tid); // tid를 저장해둠
            console.log("Response Tid:", data.tid);  // 응답 데이터 출력

            if(isMobileDevice()){
                if(data.next_redirect_mobile_url){
                    window.location.href = data.next_redirect_mobile_url
                }else {
                    Swal.fire({
                        icon: 'error',
                        title: '결제 오류',
                        text: '결제 페이지로 이동할 수 없습니다.',
                    });
                }
            }else{
                if (data.next_redirect_pc_url) {
                    window.location.href = data.next_redirect_pc_url
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

    const renderButton = () => {
        if (!isBlurred) {
            return (
                <button style={{
                    background: '#4CAF50', // 성공 버튼 색상
                    border: 'none',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: '10px'
                }} onClick={handleLinkClick}>
                <span>프로필 바로가기</span>
                    <img 
                        src={InstagramIcon} 
                        alt="Instagram Icon" 
                        style={{ width: '17px', height: '17px', filter: 'invert(1)'  }} 
                    />
                </button>         
            );
        } else {
            return (
                <button style={{
                    background: '#efecec', // 버튼 배경 없애기
                    border: 'none', // 버튼 테두리 없애기
                    color: '#707070', // 텍스트 색상
                    fontSize: '16px', // 텍스트 크기
                    fontWeight: '800',
                    cursor: 'pointer',
                    width: '100%',
                    borderRadius: '10px'
                }} onClick={() => Swal.fire({
                    icon: "info",
                    title: "결제 요청",
                    text: "인스타그램 프로필로 이동하려면 1,000원의 결제가 필요합니다.",
                    showCancelButton: true,
                    confirmButtonText: "결제",
                    cancelButtonText: "취소",
                }).then((result) => {
                    if (result.isConfirmed) {
                        handlePayment();
                    }
                })}>
                    저요👋
                </button>
            );
        }
    };

    return (
        <Fragment>
            <Row style={{width:'100%', minHeight:'300px', backgroundColor:"white"}}>
                {user.profile_picture ? (
                    <Row
                       style={{
                           padding: '10px', // 내부 여백
                           margin: '20px',
                           borderRadius: '10px', // 모서리 둥글게 설정
                           minHeight: '300px',
                           backgroundImage: `
                           url(${user.profile_picture}) /* 실제 이미지 */
                         `,
                            backgroundSize: 'cover', // 이미지 크기 조절 (cover로 설정 시 전체를 덮음)
                           backgroundPosition: 'center', // 이미지 중앙에 위치
                           backgroundRepeat: 'no-repeat', // 이미지 반복 안 함
                           display: 'flex', // 콘텐츠 정렬을 위해 flexbox 사용
                           aspectRatio:'9/12',
                           flexDirection:'column'
                       }}
                   >
                          <Row style={{display:'flex', flex:"1", flexDirection:'Col'}}>
                            <Row style={{ display:'flex', flex:'1', alignItems:'center'}}>
                            <div style={{
                                display: 'flex', 
                                flexDirection: 'column', 
                                marginLeft: '10px',
                                gap: '5px', // 간격을 조정하기 위한 gap 속성
                            }}>
                                <h1 style={{ 
                                    fontSize: '24px', 
                                    color: 'black', 
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
                                    <h1 style={{ color: 'black', fontSize: '10px', margin: '0', padding: '0' }}>
                                        @{visiblePart}
                                        <span style = {{ 
                                        filter: isBlurred ? 'blur(2px)' : 'none',
                                        color: isBlurred ? 'rgba(0, 0, 0, 0.3)' : 'inherit',
                                        transition: 'filter 0.3s ease',
                                        }}>
                                        {isBlurred ? blurredPart : user.instagram_id.slice(halfIndex)}</span> 
                                    </h1>

                                </a>
                            </div>
                            </Row>
                            <Row style={{ display:'flex', flex:'1', justifyContent:'flex-end', alignItems:'center'}}>
                                    <div style={{paddingTop:'5px'}}>
                                        <Heart style={{width:'30px', backgroudColor:'white'}} activeColor={"#ff3737"} inactiveColor={"white"} isActive={liked} onClick={handleLikeClick}/>
                                        <div style={{textAlign:'center', fontWeight:'600', color:'white'}}>{likes}</div>
                                    </div>
                            </Row>

                        </Row>
                
                    <Row style={{display:'flex', flex:"7", alignItems:'center', justifyContent:'center'}}>
                    <div style={{
                        color: 'black',        // 글씨 색상을 흰색으로 설정
                        fontWeight: 'bold',    // 글씨를 두껍게 설정
                        fontSize: '30px',      // 필요에 따라 글씨 크기 설정
                        padding: '10px'        // 필요에 따라 여백 설정
                    }}>
                        {user.bio}
                    </div>
                    </Row>
                    <Row style={{display:'flex', flex:"1"}}>
                        {renderButton()}
                    </Row>

                   </Row>
                ) : (
                    <Row style={{
                        // border: '2px solid black', // 테두리 설정
                        padding: '10px', // 내부 여백
                        margin:'20px',
                        background: backgroundColor, 
                        borderRadius: '10px', // 모서리 둥글게 설정 (선택사항)
                        minHeight:'300px',
                        display:'flex',
                        flexDirection:'column'
                    }}>
                        <Row style={{display:'flex', flex:"1", flexDirection:'Col'}}>
                            <Row style={{ display:'flex', flex:'1', alignItems:'center'}}>
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
                                    <h1 style={{ color: 'black', fontSize: '10px', margin: '0', padding: '0' }}>
                                        @{visiblePart}
                                        <span style = {{ 
                                        filter: isBlurred ? 'blur(2px)' : 'none',
                                        color: isBlurred ? 'rgba(0, 0, 0, 0.3)' : 'inherit',
                                        transition: 'filter 0.3s ease',
                                        }}>
                                        {isBlurred ? blurredPart : user.instagram_id.slice(halfIndex)}</span> 
                                    </h1>

                                </a>
                            </div>
                            </Row>
                            <Row style={{ display:'flex', flex:'1', justifyContent:'flex-end', alignItems:'center'}}>
                                    <div style={{paddingTop:'5px'}}>
                                        <Heart style={{width:'30px', backgroudColor:'white'}} activeColor={"#ff3737"} inactiveColor={"white"} isActive={liked} onClick={handleLikeClick}/>
                                        <div style={{textAlign:'center', fontWeight:'600', color:'white'}}>{likes}</div>
                                    </div>
                            </Row>

                        </Row>
                        <Row style={{display:'flex', flex:"7", alignItems:'center', justifyContent:'center'}}>
                            <div style={{
                                color: 'black',        // 글씨 색상을 흰색으로 설정
                                fontWeight: 'bold',    // 글씨를 두껍게 설정
                                fontSize: '35px',      // 필요에 따라 글씨 크기 설정
                                padding: '10px',      // 필요에 따라 여백 설정
                            }}>
                                {user.bio}
                            </div>
                        </Row>
                        <Row style={{display:'flex', flex:"1"}}>
                            {renderButton()} {/* 버튼 렌더링 */}
                        </Row>
                    </Row>
                )}
            </Row>
        </Fragment>
    );
}

export default VideoCard;
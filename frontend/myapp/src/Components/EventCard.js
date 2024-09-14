import React, { Fragment } from 'react';
import { Row } from 'reactstrap';
import airpod from '../photo/starbucks.png'; 
import { Avatar } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const EventCard = () => {
    const navigate = useNavigate()
   
    const onClick = () => {
        Swal.fire({
            icon: 'success',
            title: '이벤트',
            text: '축제 기간 동안 가장 많은 좋아요를 받은 분께 웸비가 스타벅스 상품권(10만원)을 드려요!(인스타 아이디를 정확히 기재 해주세요)',
            confirmButtonText: '참여하기',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/register')
            }
        });
    }


    return (
        <Fragment>
            <Row 
                onClick={onClick}  // 클릭 이벤트 추가
                style={{
                    padding: '10px',
                    margin:'20px',
                    backgroundImage: `url(${airpod})`, // 이미지 배경 설정
                    backgroundSize: 'cover', // 이미지 크기 설정 (cover는 요소 크기에 맞게 조정)
                    backgroundPosition: 'center', // 이미지 가운데 정렬
                    borderRadius: '10px',
                    minHeight:'200px',
                    display:'flex',
                    flexDirection:'column',
                    cursor: 'pointer',    // 버튼처럼 보이게 커서 추가
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // 약간의 그림자 추가로 버튼 느낌 강화
                    transition: 'transform 0.2s',  // 클릭 시 약간의 애니메이션 추가
                    animation: 'bounce 2s infinite', // 애니메이션 추가

                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'} // 클릭 시 살짝 눌리는 효과
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}  // 클릭 해제 시 원래대로
            >
                <Row style={{display:'flex', flex:"1", alignItems:'center', justifyContent:'flex-start'}}>
                    <div style={{
                        color: 'white',        
                        fontWeight: 'bold',    
                        fontSize: '20px',      
                        padding: '10px'        
                    }}>
                    </div>
                </Row>
                <Row 
                    style={{
                        display:'flex', 
                        flex:"7", 
                        alignItems:'center', 
                        justifyContent:'center',
                    }}
                >
                </Row>
                <Row style={{display:'flex', flex:"2", alignItems:'center', justifyContent:'center'}}>
                </Row>
            </Row>

            <style>
            {`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0); // 기본 위치
                    }
                    40% {
                        transform: translateY(-20px); // 위로 튐
                    }
                    60% {
                        transform: translateY(-10px); // 다시 위로 튐
                    }
                }
            `}
            </style>
        </Fragment>
    );
}

export default EventCard;

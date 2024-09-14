import React, { Fragment } from 'react';
import { Row } from 'reactstrap';
import BasicImage from '../photo/plusWhite.svg'; 
import { Avatar } from 'antd';

const PlusCard = () => {
    return (
        <Fragment>
            <Row 
                onClick={() => alert('Row 클릭!')}  // 클릭 이벤트 추가
                style={{
                    padding: '10px',
                    margin:'20px',
                    background: '#4298ff',
                    borderRadius: '10px',
                    minHeight:'110px',
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
                </Row>
                <Row 
                    style={{
                        display:'flex', 
                        flex:"7", 
                        alignItems:'center', 
                        justifyContent:'center',
                    }}
                >
                    <Avatar 
                        src={BasicImage} 
                        size={130} 
                    />
                </Row>
                <Row style={{display:'flex', flex:"2", alignItems:'center', justifyContent:'center'}}>
                    <div style={{
                        color: 'white',        
                        fontWeight: 'bold',    
                        fontSize: '20px',      
                        padding: '10px'        
                    }}>
                        나도 등록하기
                    </div>
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

export default PlusCard;

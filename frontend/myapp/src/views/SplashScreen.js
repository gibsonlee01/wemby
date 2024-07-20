import { Row } from 'reactstrap';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Locale } from '../constants';
import React, { useEffect } from 'react';

const SplashScreen = () => {
  const navigate = useNavigate();

  //후에 user에 몇 명있는지를 파악해서 x명 미만이면 register로 넘기고 아니면 list page로
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/register'); // 이동하고 싶은 경로로 변경
    }, 1500); 

    return () => clearTimeout(timer); // 클린업
  }, [navigate]);

  return (
    <Fragment>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'linear-gradient(to right, #FF2B70, #FF586A)' // 배경 그라디언트 추가
      }}>
        <Row style={{ flex: '30%', display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
          <div style={{ fontWeight: '800', fontSize: '25px' }}>
          </div>
        </Row>
        <Row style={{ flex: '30%', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
          <div style={{
            width: "70%",
            backgroundColor: 'white', // 배경색을 흰색으로 설정
            padding: '10px', // 패딩 추가
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 추가
          }}>
            <div style={{
              background: 'linear-gradient(to right, #FF2B70, #FF586A)', // 그라디언트 색상
              WebkitBackgroundClip: 'text', // 텍스트 클립
              WebkitTextFillColor: 'transparent', // 텍스트 색상 투명
              fontWeight: '800',
              fontSize: '25px',
            }}>
              {Locale}에서 <br /> 같이 놀 친구찾기
            </div>
          </div>
        </Row>
        <Row style={{ flex: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
            <div style={{
                fontWeight: '800',
                fontSize: '50px',
                color:'white'
              }}>
                wemby
            </div>
            <div style={{
              width: "50%",
              backgroundColor: 'white', // 배경색을 흰색으로 설정
              padding: '10px', // 패딩 추가
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 추가,
              textAlign:'center',
              marginTop:'10%'
            }}>
              <div style={{
                background: 'linear-gradient(to right, #FF2B70, #FF586A)', // 그라디언트 색상
                WebkitBackgroundClip: 'text', // 텍스트 클립
                WebkitTextFillColor: 'transparent', // 텍스트 색상 투명
                fontWeight: '800',
                fontSize: '25px',
              }}>
                {Locale}
              </div>
            </div>
        </Row>
      </div>
    </Fragment>
  );
}

export default SplashScreen;

import { Row } from 'reactstrap';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Locale } from '../constants';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie'; // 쿠키 라이브러리 추가

const SplashScreen = () => {
  const navigate = useNavigate();
  const visit = Cookies.get('visit');
  const url = visit === 'yes' ? '/list' : '/register'; // 삼항 연산자로 url 결정

  console.log(url); // 디버깅을 위한 로그

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(url);
    }, 1500);

    return () => clearTimeout(timer); // 클린업
  }, [navigate, url]); // navigate와 url을 의존성 배열에 추가
  
  return (
    <Fragment>
      <Row style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
        <Row style={{minWidth:'400px'}}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width:'100%',
            height: '100vh',
            background: 'linear-gradient(to right, #FF2B70, #FF586A)', // 배경 그라디언트 추가
            // borderRadius:'20px'
          }}>
            <Row style={{ flex: '15%', display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
              <div style={{ fontWeight: '800', fontSize: '25px' }}>
              </div>
            </Row>
            <Row style={{ flex: '25%', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
              <div style={{
                width: "60%",
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
            <Row style={{ flex: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
                <div style={{
                    fontWeight: '800',
                    fontSize: '50px',
                    color:'white'
                  }}>
                    wemby
                </div>
                <div style={{
                  width: "60%",
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
          </Row>  
        </Row>
    </Fragment>
  );
}

export default SplashScreen;

import { Button, Row } from 'reactstrap';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.
import { ROUTE_QUESTION } from '../constants';

const SplashScreen = () => {
  const navigate = useNavigate(); // useNavigate를 사용합니다.

  const ButtonClick = () => {
    navigate(`${ROUTE_QUESTION}/1`); // 이동하고 싶은 경로를 넣어줍니다.
  }

  return (
    <Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Row style={{ flex: '20%', display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
          <div style={{ fontWeight: '800', fontSize: '25px' }}>
            당신의 여행 스타일은?
          </div>
        </Row>
        <Row style={{ flex: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src='https://www.shinailbo.co.kr/news/photo/202108/1450050_648674_1419.jpg' width='300px' height='300px' alt='Icon' />
        </Row>
        <Row style={{ flex: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            color='primary'
            style={{ backgroundColor: '#99CCFF', borderRadius: '15px', border: '3px solid #99CCFF', fontWeight: '800', width: '70%', height: '50px' // 버튼의 고정 너비 설정
          }}
            onClick={ButtonClick}
          >
            스타일 검사하러 가기
          </Button>
        </Row>
      </div>
    </Fragment>
  );
}

export default SplashScreen;

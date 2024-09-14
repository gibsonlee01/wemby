// import { Row } from 'reactstrap';
import { Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Locale } from '../constants';
import React, { useEffect , useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios  from 'axios';
import { API_GETALLUSERS } from '../constants';
import './css/List.css';
import { Row, Button } from 'reactstrap';
import  VideoCard  from '../Components/VideoCard';
import  PlusCard  from '../Components/PlusCard';

import { GridLoader } from 'react-spinners';

const List = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [waitingforData, setWaitingforData] = useState(null);
  //현재 젠더
  const [currentbar, setCurrntbar] = useState('M');

  const location = useLocation();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // currentbar을 쿼리 스트링으로 추가하여 요청
        const response = await axios.get(`${API_GETALLUSERS}?gender=${currentbar}`);
        setUsers(response.data);
        setLoading(false);
      } catch (err) { 
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();

    // 5초마다 자동으로 데이터를 가져오는 타이머 설정
    const intervalId = setInterval(fetchUsers, 30000); // 30초마다 요청

    // 컴포넌트 언마운트 시 인터벌을 클리어하여 메모리 누수 방지
    return () => clearInterval(intervalId);
    
  }, [currentbar]); // currentbar이 변경될 때마다 이 effect가 실행됨

  useEffect(() => {
    if (users.length > 0) {  // 유저 목록이 로드된 후에 실행
      const params = new URLSearchParams(location.search);
      const userId = params.get('userId');
      console.log(`userId: ${userId}`);

      if (userId) {
        const element = document.getElementById(userId);
        if (element) {
          console.log("Scrolling to element");
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.log("Element not found");
        }
      }
    }
  }, [users, location.search]);



  const handleMenClick = () => {
    // men 버튼 클릭 시 실행할 로직 추가
    // console.log("Men 버튼 클릭됨");
    setCurrntbar('M');
  };

  const handleWomenClick = () => {
    // women 버튼 클릭 시 실행할 로직 추가
    // console.log('W');
    setCurrntbar('W');
  };

  // console.log(users);
  if (loading) return <Fragment>Loading...</Fragment>;
  if (error) return <Fragment>Error: {error.message}</Fragment>;

  return (
    <Fragment>
      <Row style = {{ display : 'flex', justifyContent:'center', alignItems : 'center', backgroundColor : 'white'}}>
        <Row style = {{ minWidth : '400px', backgroundColor:'white'}}>
          <Row style={{ 
            width:'400px',
            position: 'fixed', 
            top: 0, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            zIndex: 1000, 
            backgroundColor: 'white', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            // padding: '20px 0',
            paddingTop: '20px',
            borderBottom: '3px solid #e0e0e0',
            borderRadius:'15px'
          }}>
            <Row style = {{ display: 'flex', backgroundColor:'white', marginLeft:'3%'}}>
             
              <Button 
                style={{ 
                  marginRight: '5%', 
                  fontWeight: '550', 
                  fontSize: '20px', 
                  color: currentbar === 'M' ? '#FF586A' : 'gray',
                  backgroundColor: 'transparent', 
                  border: 'none',
                  marginRight:'1%',
                  marginLeft:'12%',
                  paddingBottom:'10px',
                  borderBottom: currentbar === 'M' ? '3px solid #FF586A' : 'none', // 상태에 따른 borderBottom
                }} 
                onClick={handleMenClick}
              >
                <div style = {{  borderBottom: currentbar === 'M' ? '#FF586A' : 'none' }}>
                  Men
                </div>
              </Button>
             
              <div style = {{ backgroundColor:'white' }}>
              <Button 
                style={{ 
                  fontWeight: '550', 
                  fontSize: '20px', 
                  color: currentbar === 'M' ? 'gray' : '#FF586A',
                  backgroundColor: 'transparent', 
                  border: 'none',
                  paddingBottom:'10px',
                  borderBottom: currentbar === 'M' ? 'none' : '3px solid #FF586A' // 상태에 따른 borderBottom
                }} 
                onClick={handleWomenClick}
              >
                <div style = {{ borderBottom: currentbar === 'M' ? 'none' : '#FF586A' }}>
                  Women
                </div>
              </Button>
              </div>
            </Row>
          </Row>
          {/* 고정된 메뉴바 아래에 빈 공간 추가 */}
            
          
          <Row style = {{ backgroundColor:'white', height:'80px' }}></Row>

          {/* 유저가 5명 미만일 때 메시지 표시 */}
          {users.length < 2 ? (
            // console.log( `users.length : ${users.length}`),
            <Row style = {{ flexDirection:'column', display:'flex', alignItems:'center', justifyContent:'center', height:'70vh' }}>
              <div style={{ textAlign: 'center', marginTop: '20px', marginBottom:'10%', fontSize: 20, fontWeight: 600 }}>곧 시작됩니다. 조금만 기다려 주세요!</div>
              <Row style = {{ flexDirection:'column', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <GridLoader size = '40px'/>
              </Row>
            </Row>
          ) : (
            // 유저가 5명 이상일 때 리스트 표시
            <div className="video-Container">
                <div className="plusCard" key={`plus-0`}>
                  <PlusCard />
                </div>
              {users.map((user, index) => (
                <React.Fragment key={user.id}>
                  <div className="videoCard" id={user.id}>
                    <VideoCard user={user} />
                  </div>
                  {index % 5 === 4 && ( 
                    <div className="plusCard" key={`plus-${index}`}>
                      <PlusCard />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </Row>
      </Row>
    </Fragment>
  );
}

export default List;


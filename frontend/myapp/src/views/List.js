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
import { BiUser } from "react-icons/bi";
import { set } from 'react-hook-form';
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
            width:'100%',
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
            borderBottom: '1px solid #e0e0e0',
          }}>
            <Row style = {{ display: 'flex', backgroundColor:'white', marginLeft:'3%'}}>
             
              <Button 
                style={{ 
                  marginRight: '5%', 
                  fontWeight: '550', 
                  fontSize: '20px', 
                  color: currentbar === 'M' ? 'black' : 'gray',
                  backgroundColor: 'transparent', 
                  border: 'none',
                  marginRight:'1%',
                  marginLeft:'12%',
                  paddingBottom:'10px',
                  borderBottom: currentbar === 'M' ? '3px solid black' : 'none' // 상태에 따른 borderBottom
                }} 
                onClick={handleMenClick}
              >
                <div style = {{  borderBottom: currentbar === 'M' ? 'black' : 'none' }}>
                  Men
                </div>
              </Button>
             
              <div style = {{ backgroundColor:'white' }}>
              <Button 
                style={{ 
                  fontWeight: '550', 
                  fontSize: '20px', 
                  color: currentbar === 'M' ? 'gray' : 'black',
                  backgroundColor: 'transparent', 
                  border: 'none',
                  paddingBottom:'10px',
                  borderBottom: currentbar === 'M' ? 'none' : '3px solid black' // 상태에 따른 borderBottom
                }} 
                onClick={handleWomenClick}
              >
                <div style = {{ borderBottom: currentbar === 'M' ? 'none' : 'black' }}>
                  Women
                </div>
              </Button>
              </div>
            </Row>


            {/* <div style={{  color: 'black', display: 'flex', alignItems: 'center', marginRight:'7%', paddingBottom: '10px'}}>
              <BiUser size='30' />
            </div> */}
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
              {users.map((user) => (
                <div className="videoCard" key={user.id} id={user.id}>
                  <VideoCard user={user} />
                </div>
              ))}
            </div>
          )}
        </Row>
      </Row>
    </Fragment>
  );
}

export default List;


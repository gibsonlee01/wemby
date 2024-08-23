// import { Row } from 'reactstrap';
import { Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Locale } from '../constants';
import React, { useEffect , useState } from 'react';
import axios  from 'axios';
import { API_GETALLUSERS } from '../constants';
import './css/List.css';
import { Row, Button } from 'reactstrap';
import  VideoCard  from '../Components/VideoCard';
import { BiUser } from "react-icons/bi";
import { set } from 'react-hook-form';

const List = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //현재 젠더
  const [currentbar, setCurrntbar] = useState('M');

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get(API_GETALLUSERS);
  //       setUsers(response.data);
  //       setLoading(false);
  //     } catch (err) { 
  //       setError(err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
    
  // }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // currentbar을 쿼리 파라미터로 추가하여 요청
        const response = await axios.get(`${API_GETALLUSERS}?gender=${currentbar}`);
        setUsers(response.data);
        setLoading(false);
      } catch (err) { 
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
    
  }, [currentbar]); // currentbar이 변경될 때마다 이 effect가 실행됨



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
            borderBottom: '1px solid #e0e0e0',
          }}>
            <Row style = {{ display: 'flex', backgroundColor:'white'}}>
             
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


            <div style={{  color: 'black', display: 'flex', alignItems: 'center', marginRight:'7%', paddingBottom: '10px'}}>
              <BiUser size='30' />
            </div>
          </Row>
          {/* 고정된 메뉴바 아래에 빈 공간 추가 */}
            
          
          <Row style = {{ backgroundColor:'white', height:'80px' }}></Row>
          
          <div class="video-Container">
          {users.map((user) => (
            <div class="videoCard" key={user.id}>
            <VideoCard
              // profile_picture={user.profile_picture}
              user={user}
            />
            </div>
          ))}
          </div>
        </Row>
      </Row>
    </Fragment>
  );
}

export default List;


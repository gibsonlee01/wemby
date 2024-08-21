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
import { CgGenderMale, CgGenderFemale } from "react-icons/cg";
import { BiUser } from "react-icons/bi";

const List = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_GETALLUSERS);
        setUsers(response.data);
        setLoading(false);
      } catch (err) { 
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
    
  }, []);

  const handleMenClick = () => {
    // men 버튼 클릭 시 실행할 로직 추가
    console.log("Men 버튼 클릭됨");
  };

  const handleWomenClick = () => {
    // women 버튼 클릭 시 실행할 로직 추가
    console.log("Women 버튼 클릭됨");
  };

  // console.log(users);
  if (loading) return <Fragment>Loading...</Fragment>;
  if (error) return <Fragment>Error: {error.message}</Fragment>;

  return (
    <Fragment>
      <Row style = {{ display : 'flex', justifyContent:'center', alignItems : 'center', backgroundColor : 'white'}}>
        <Row style = {{ minWidth : '400px', backgroundColor:'white'}}>
          <Row style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1000, 
            backgroundColor: '#333', 
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'center', 
            padding: '10px 0' 
          }}>
            <Button 
              style={{ 
                marginRight: '5%', 
                fontWeight: '550', 
                fontSize: '20px', 
                color: 'white', 
                backgroundColor: 'transparent', 
                border: 'none' 
              }} 
              onClick={handleMenClick}
            >
              Men
            </Button>
            <Button 
              style={{ 
                fontWeight: '550', 
                fontSize: '20px', 
                color: 'white', 
                backgroundColor: 'transparent', 
                border: 'none' 
              }} 
              onClick={handleWomenClick}
            >
              Women
            </Button>
            <div style={{ color: 'white', marginLeft: '5%', display: 'flex', alignItems: 'center' }}>
              <BiUser size='30' />
            </div>
          </Row>
          {/* 고정된 메뉴바 아래에 빈 공간 추가 */}
            
          
          <Row style = {{ backgroundColor:'white', height:'50px' }}></Row>
          
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


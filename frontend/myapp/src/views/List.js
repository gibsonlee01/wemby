// import { Row } from 'reactstrap';
import { Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Locale } from '../constants';
import React, { useEffect , useState } from 'react';
import axios  from 'axios';
import { API_GETALLUSERS } from '../constants';
import './css/List.css';
import { Row } from 'reactstrap';
import  VideoCard  from '../Components/VideoCard';

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

  console.log(users);
  if (loading) return <Fragment>Loading...</Fragment>;
  if (error) return <Fragment>Error: {error.message}</Fragment>;

  return (
    <Fragment>
      <Row  style = {{ display : 'flex', justifyContent:'center', alignItems : 'center', backgroundColor : 'green'}}>
        <Row style = {{ minWidth : '400px', backgroundColor:'white' }}>
          <div>
          {users.map((user) => (
            <div key={user.id}>
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


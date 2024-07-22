// import { Row } from 'reactstrap';
import { Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Locale } from '../constants';
import React, { useEffect , useState } from 'react';
import axios  from 'axios';
import { API_GETALLUSERS } from '../constants';

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


  if (loading) return <Fragment>Loading...</Fragment>;
  if (error) return <Fragment>Error: {error.message}</Fragment>;

  return (
    <Fragment>
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <div className="row">
            <div className="col">
                {user.profile_picture ? (
                  <img src={`/backend/project/${user.profile_picture}`} alt="profile" />
                    
                ) : (
                  // <img src="default-profile.png" alt="default profile" />
                  console.log('default profile')
                )}
            </div>
            <div className="col">
              <div>{user.name}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Fragment>
  );
}

export default List;

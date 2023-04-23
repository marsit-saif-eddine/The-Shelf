

import React, { Fragment } from 'react';
import Avatar from './Avatar';
import { isUserLoggedIn } from '@utils'

function Avatars({ users }) {
    const [userData, setUserData] = useState(null)



    useEffect(() => {
        if (isUserLoggedIn() !== null) {
          setUserData(JSON.parse(localStorage.getItem('userData')));
        }
      }, []);
    console.log(userData);
  return (
    <>
      {users.map((userData) => (
        <Fragment key={userData.name}>
          <Avatar
            className='pull-up'
            img={userData.image}
            id={userData.name.toLowerCase().split(' ').join('-')}
            imgHeight='26'
            imgWidth='26'
          >
            {userData.name.charAt(0)}
          </Avatar>
        </Fragment>
      ))}
    </>
  );
}

export default Avatars;






// ** Reactstrap Imports
import { Card, CardBody, Row, Col,Button } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import { Award } from 'react-feather'

import classnames from 'classnames'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';


const ProfileLatestPhotos = ({ data }) => {
  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setShowForm(true)
  };
  const [events, setQuizzes] = useState([]);
  const [userData, setUserData] = useState(null)
  useEffect(() => {
 
    setUserData(JSON.parse(localStorage.getItem('userData')));
  
}, []);
const userid = useParams().id



useEffect(() => {
    if (userid !== null) {
        fetch(`http://localhost:5000/events?userconnected=${userid}`)
        .then(response => response.json())
        .then(data => setQuizzes(data))
        .catch(error => console.log(error));
    }
    console.log(events)
  }, [userid]);


  return (

    <Card>
         <Link to="/apps/events" className='btn btn-link'>
  Show More
</Link>
    <CardBody className='profile-suggestion'>
      <h5 className='mb-0'>My Latest Events</h5>
      <br />
      {events.slice(0, 3).map((event, index) => (
        <div
          key={event._id}
          className={classnames('d-flex justify-content-start align-items-center', {
            'mt-2': index === 0,
            'mt-1': index !== 0
          })}
        >
          <div className='profile-user-info'>
          <div className="img-container">
        <img
          src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`}
          alt={event.name}
          loading="lazy"
          style={{ width: '50%', height: '30%', borderRadius: '10px' }}
          
          />
      </div>
            <h6 className='mb-0'>{event.name}</h6>
            <br />
            <small className='text-muted'>{new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</small>
            <br />
            <small className='text-muted'>{event.location}</small>
          </div>
          <div className='ms-auto'>
          
          </div>
        </div>
      ))}
    </CardBody>
  </Card>
);
};


export default ProfileLatestPhotos

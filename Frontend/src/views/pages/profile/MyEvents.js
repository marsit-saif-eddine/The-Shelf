// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Demo Components
import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestPhotos from './ProfileLatestQuizzes'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'
import { useParams } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import classnames from 'classnames'
import Event from "../../apps/Events/event"
import { isUserLoggedIn } from '@utils'

// ** Styles
//import '@styles/react/pages/page-profile.scss'

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null)
  const { id } = useParams();

  useEffect(() => {
 
    setUserData(JSON.parse(localStorage.getItem('userData')));
  
}, []);
useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    }
  }, []);
  const userid = useParams().id


  useEffect(() => {
    if (userData !== null) {
      fetch(`http://localhost:5000/events?userconnected=${userData.id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data); // Log the response data to the console

            setEvents(data);
          }
        )
        .catch(error => console.log(error));
    }
  }, [userData]);
  

 

  console.log(events); // Log the events to the console

  return (
  
    <div className="containers">
    <Row>
    {events.map((event, index) => (
                  <Col md={4} >
 
          <Event key={event._id} events={event} />
       </Col>  
        ))}
       </Row>
       </div>
   
  )
 
}

export default MyEvents

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
import Quiz from "../../apps/quiz/quiz"

// ** Styles
//import '@styles/react/pages/page-profile.scss'

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [userData, setUserData] = useState(null)
  useEffect(() => {
 
    setUserData(JSON.parse(localStorage.getItem('userData')));
  
}, []);
const userid = useParams().id
var user = JSON.parse(localStorage.getItem('userData'));
var userId = user.id;
const approved="approved";


useEffect(() => {
    if (userid !== null) {
      fetch(`http://localhost:5000/quiz/allquiz?userconnected=${userId}&status=${approved}`)
        .then(response => response.json())
        .then(data => setQuizzes(data))
        .catch(error => console.log(error));
    }
    console.log(quizzes)
  }, [userid]);



  return (
  
    <div className="containers">
    <Row>
        {quizzes.map((quiz, index) => (
          <Col md={4} >
 
          <Quiz key={quiz._id} quiz={quiz} />
       </Col> 
        ))}
       </Row>
       </div>
   
  )
 
}

export default MyQuizzes

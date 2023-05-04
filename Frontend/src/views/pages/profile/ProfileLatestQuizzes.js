// ** Reactstrap Imports
import { Card, CardBody, Row, Col,Button } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import { Award } from 'react-feather'

import classnames from 'classnames'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import {  NavItem, NavLink } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'


const ProfileLatestPhotos = ({ data, selectedUser }) => {
  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setShowForm(true)
  };
  const [quizzes, setQuizzes] = useState([]);
  const [userData, setUserData] = useState(null)
  useEffect(() => {
 
    setUserData(JSON.parse(localStorage.getItem('userData')));

}, []);
const userid = useParams().id
console.log("latest id"+ userid)
const approved="approved";
const [maxQuizzes, setMaxQuizzes] = useState(3);
const filteredQuizzes = quizzes.slice(0, maxQuizzes);

useEffect(() => {
    if (userid !== null) {
      fetch(`http://localhost:5000/quiz/allquiz?userconnected=${userid}&status=${approved}`)
        .then(response => response.json())
        .then(data => setQuizzes(data))
        .catch(error => console.log(error));
    }
    console.log(quizzes)
  }, [userid]);

  
  const store = useSelector(state => state.users)

console.log("ggg"+ store.selectedUser._id)

  return (
    <Card>
      <CardBody className='profile-suggestion'>
        <h5 className='mb-0'> My Latest Quizzes</h5>
        <br></br>
        {filteredQuizzes.map((quiz, index) => (
         
    // <Card key={quiz._id} value={quiz._id}>
     <div
         key={quiz._id } value={quiz._id}
          className={classnames('d-flex justify-content-start align-items-center', {
            'mt-2': index === 0,
            'mt-1': index !== 0
          })}
        >
      <div className='profile-user-info'>
        
            <h6 className='mb-0'>{quiz.quizName}</h6>
            <small className='text-muted'>{quiz.bookName}</small>
          </div>
          <div className='ms-auto'>
          <Link to={`/quiz/${quiz._id}`}>  
            <Button className='btn-icon' color='primary' size='sm'>
              <Award size={14} />
            </Button>
            </Link>
          </div>
          </div>
    // </Card>
    ))}
    <br></br>

    <NavLink href={`/pages/profile/myquizzes/${store.selectedUser._id}`} className='fw-bold' >
    <span className='d-none d-md-block'>view all</span>
      </NavLink>


   
      </CardBody>
    </Card>
  )
 
}

export default ProfileLatestPhotos

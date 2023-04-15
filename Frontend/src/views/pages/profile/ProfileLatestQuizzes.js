// ** Reactstrap Imports
import { Card, CardBody, Row, Col,Button } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import { Award } from 'react-feather'

import classnames from 'classnames'
import { useParams } from 'react-router-dom'

const ProfileLatestPhotos = ({ data }) => {
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
const approved="approved";

useEffect(() => {
    if (userid !== null) {
      fetch(`http://localhost:5000/quiz/allquiz?userconnected=${userid}&status=${approved}`)
        .then(response => response.json())
        .then(data => setQuizzes(data))
        .catch(error => console.log(error));
    }
    console.log(quizzes)
  }, [userid]);

/////// fetch book name /////

// const [bookName, setBookName] = useState('');

// const handleBookChange = (event) => {
//   setBookId(event.target.value);
// }

// useEffect(() => {
  
//   // Fetch the book details using the bookId
//   if (quiz.book_id !== '') {
//     fetch(`http://localhost:5000/book/${quiz.book_id}`)
//       .then(response => response.json())
//       .then(data => setBookName(data.name))
//       .catch(error => console.log(error));
//   } else {
//     setBookName('');
//   }
// }, [quiz.book_id]);
// /////////

  return (
    <Card>
      <CardBody className='profile-suggestion'>
        <h5 className='mb-0'> My Latest Quizzes</h5>
        <br></br>
        {quizzes.map((quiz, index) => (
         
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
            <Button className='btn-icon' color='primary' size='sm'>
              <Award size={14} />
            </Button>
          </div>
          </div>
    // </Card>
    ))}
    
      </CardBody>
    </Card>
  )
 
}

export default ProfileLatestPhotos

// // ** React Imports
// import { Fragment, useState, useEffect } from 'react'

// // ** Third Party Components
// import axios from 'axios'

// // ** Custom Components
// import UILoader from '@components/ui-loader'
// import Breadcrumbs from '@components/breadcrumbs'

// // ** Reactstrap Imports
// import { Row, Col, Button, Input } from 'reactstrap'

// // ** Demo Components
// // import ProfilePoll from './ProfilePolls'
// // import ProfileAbout from './ProfileAbout'
// // import ProfilePosts from './ProfilePosts'
// // import ProfileHeader from './ProfileHeader'
// // import ProfileTwitterFeeds from './ProfileTwitterFeeds'
// // import ProfileLatestPhotos from './ProfileLatestQuizzes'
// // import ProfileSuggestedPages from './ProfileSuggestedPages'
// // import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'
// import { useParams } from 'react-router-dom'
// import { Card, CardBody,
//   CardTitle,
//   CardHeader, } from 'reactstrap'
// import classnames from 'classnames'
// import Quiz from "../../apps/quiz/quiz"
// import QuizCreate from "../../apps/quiz/quizCreate"
// // ** Styles
// //import '@styles/react/pages/page-profile.scss'

// const MyQuizzes = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [userData, setUserData] = useState(null)
//   useEffect(() => {
 
//     setUserData(JSON.parse(localStorage.getItem('userData')));
  
// }, []);
// const userid = useParams().id
// var user = JSON.parse(localStorage.getItem('userData'));
// var userId = user.id;
// const approved="approved";

// useEffect(() => {
//     if (userid !== null) {
//       fetch(`http://localhost:5000/quiz/allquiz?userconnected=${userId}&status=${approved}`)
//         .then(response => response.json())
//         .then(data => setQuizzes(data))
//         .catch(error => console.log(error));
//     }
//     console.log(quizzes)
//   }, [userid]);

//   const [show, setShow] = useState(false)

// /////////search
// const [searchQuery, setSearchQuery] = useState('');
// const [filteredData, setFilteredData] = useState(quizzes);

// const handleSearch = (event) => {
//   const query = event.target.value;

//   setSearchQuery(query);
// };
// // const filteredQuizData = quizzes.filter(
// //     (quiz) =>
// //       quiz.quizName.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       quiz.book_id.toLowerCase().includes(searchQuery.toLowerCase()) 

// //   );


// ///////////////////

//   return (
  
// <div>
//                  <QuizCreate/>
//         {quizzes.map((quiz, index) => (
//           <Col md={4} >
 
//           <Quiz key={quiz._id} quiz={quiz} />
          
//        </Col> 
//         ))}
   
//    </div>
//   )
 
// }

// export default MyQuizzes

import { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle,CardImg, Col, Row, DropdownMenu, DropdownItem } from "reactstrap";
import QuizDisplay from "./quizDisplay";
import img from "@src/assets/images/icons/result.png"
import { Link } from 'react-router-dom';
import { Trash2 } from "react-feather";
import Swal from 'sweetalert2';
import axios from "axios";
import { useParams } from 'react-router-dom';
import medal from '@src/assets/images/illustration/badge.svg'

function QuizScore ({quiz}) {


  const [Quizs, setQuizs] = useState([])
  const[change,setChange]=useState(false)
  var user = JSON.parse(localStorage.getItem('userData'));
  //console.log("your user id is :"+user.id);
  var userId = user._id;
console.log("userid:"+ userId);
console.log("creatorid:"+ quiz.user_id)






    return (
    
//       <Card style={{ width: "28rem" }}  border="secondary">
//         <CardHeader>
//           {/* <CardTitle>
//           {quiz.quizName}
//           </CardTitle> */}
       
//           <CardImg
//           variant="top"
//           src={img}
//           alt="Product Img"
//           height={200}
//         />
//         </CardHeader>
//     <CardBody>
// <CardText> {quiz.quiz_status} </CardText> 
// <Link to={`/quiz/${quiz._id}`}>  
// <Button className='round' color='primary' outline>Take quiz</Button>

// </Link>  
// <div className="d-flex justify-content-end justify-content-sm-end align-items-end mb-2 col-sm-12">

//   {userId  === quiz.user_id && (
// <Trash2 size={14} className='me-50' onClick={() => Delete(quiz._id)} />
// )}
// </div> 
//  </CardBody>
//     </Card>

     
//       );
      <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Congratulations 🎉 {quiz.creator}!</h5>
        <CardText className='font-small-3'>You finished this quiz</CardText>
        <CardText className='font-small-3'>{quiz.quizName}</CardText>

        <h3 className='mb-75 mt-2 pt-50'>
          <p>
            5/5
            {quiz.submissions.score}
          </p>
        </h3>
        <Link to={`/quiz/${quiz._id}`}>  
        <Button className='round' color='primary' outline>Take quiz</Button> 
         </Link>
        <img className='congratulation-medal' src={medal} alt='Medal Pic' />
      </CardBody>
    </Card>
 )  
} 
    export default QuizScore;


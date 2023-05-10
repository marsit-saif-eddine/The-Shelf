import { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle,CardImg, Col, Row, DropdownMenu, DropdownItem } from "reactstrap";
import QuizDisplay from "./quizDisplay";
import img from "@src/assets/images/icons/quiz.jpg"
import { Link } from 'react-router-dom';
import { Trash2 } from "react-feather";
import Swal from 'sweetalert2';
import axios from "axios";
import { useParams } from 'react-router-dom';

function Quiz ({quiz}) {


  const [Quizs, setQuizs] = useState([])
  const[change,setChange]=useState(false)
  var user = JSON.parse(localStorage.getItem('userData'));
  //console.log("your user id is :"+user.id);
  var userId = user._id;
console.log("userconnectedid:"+ userId);
console.log("creatorid:"+ quiz.user_id)



const Delete = (id) => {
  Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
  axios.delete(`http://localhost:5000/quiz/delete/${id}`)
  .then(() => {
    // Remove the deleted quiz from the quizzes array
    const updatedQuizs = Quizs.filter((quiz) => quiz.id !== id);
    setQuizs(updatedQuizs);
    setChange(true)
  });
}
});
}


    return (
    
      <Card style={{ width: "28rem" }}  border="secondary">
        <CardHeader>
          <CardTitle>
          {quiz.quizName}
          </CardTitle>
       
          <CardImg
          variant="top"
          src={img}
          alt="Product Img"
          height={200}
        />
        </CardHeader>
    <CardBody>
<CardText> {quiz.quizDescription} </CardText> 
<Link to={`/quiz/${quiz._id}`}>  
<Button className='round' color='primary' outline>Take quiz</Button>

</Link>  
<div className="d-flex justify-content-end justify-content-sm-end align-items-end mb-2 col-sm-12">

  {userId  === quiz.user_id && (
<Trash2 size={14} className='me-50' onClick={() => Delete(quiz._id)} />
)}
</div> 
 </CardBody>
    </Card>

     
      );
    }
    
    export default Quiz;


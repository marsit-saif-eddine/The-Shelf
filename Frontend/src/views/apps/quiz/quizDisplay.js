import React from "react"
import { Fragment, useState, useEffect } from 'react'
import {
    Row,
    Col,
    Container,
    Modal,
    Card,
    Input,
    Label,
    Button,
    CardBody,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    ModalBody, ModalHeader ,
    Form,
    CardText,
    Accordion,
    
  } from 'reactstrap'
import axios from "axios"
import Quiz from "./quiz"
import {  useSelector } from "react-redux";

import { useParams } from 'react-router-dom'

//////////////  this is the quizzes of each profile ////////////////
function QuizDisplay () {


const [Quizs, setQuizs] = useState([])
const[change,setChange]=useState(false)

// const approved="approved";
//   useEffect(() => {
//     axios.get(`/quiz/allquiz?status=${approved}`)
//       .then(response => setQuizs(response.data))
//       .catch(error => console.error(error));
//       console.log(Quizs)
//       setChange(false)

//   }, [change]);
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
      .then(data => setQuizs(data))
      .catch(error => console.log(error));
  }
  console.log(Quizs)
}, [userid]);

const [show, setShow] = useState(false)

//const history = useHistory();

// function navigate_to(quizname){
//   var qname=quizname.split(".");
//   history.push("/"+qname[0])
// }
return (


  <div id='knowledge-base-search'>
  <Card
    className='knowledge-base-bg'
    style={{
      backgroundImage: `url(${require('@src/assets/images/banner/banner.png').default})`
    }}
  >
    <CardBody className='text-center'>
      <h2 className='text-primary'>Welcome to your quizzes { user.username}</h2>
      <CardText className='mb-2'>
         <span className='fw-bolder'>here you will find all the quizzes that you created and the admins approved</span>
      </CardText>
      </CardBody>
      </Card>
  <div className="containers">
    <Row>
    {Quizs.map(quiz => (
        <Col md={4} >
 
   <Quiz key={quiz._id} quiz={quiz} />
</Col> 
    ))}
          </Row>       

          </div>
 </div>

  );
}

export default QuizDisplay 
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
import QuizNav from "./myQuizNav"
import { io } from "socket.io-client"
//////////////  this is the quizzes of each profile ////////////////


function QuizDisplay () {


const [Quizs, setQuizs] = useState([])
const[change,setChange]=useState(false)

// useEffect(() => {
//   const socket = io("http://localhost:5000");
//   socket.on("me", (msg) => {
//     console.log("sockeet msg test " + msg);
//   });
  
 
// }, []);
// const socket = io('http://localhost:5000');

// socket.on('quizApproved', (quiz) => {
//   // display a notification to the user
//   console.log(`Quiz ${quiz._id} has been approved`);
// });




const [userData, setUserData] = useState(null)
useEffect(() => {

  setUserData(JSON.parse(localStorage.getItem('userData')));

}, []);

const store = useSelector(state => state.users)
// console.log("sss  "+ store.selectedUser)
const userid = useParams().id
var user = JSON.parse(localStorage.getItem('userData'));
var userId = user._id;
const approved="approved";

useEffect(() => {
  if (userid !== null) {
    fetch(`http://localhost:5000/quiz/allquiz?userconnected=${userid}&status=${approved}`)
      .then(response => response.json())
      .then(data => setQuizs(data))
      .catch(error => console.log(error));
  }
  console.log(Quizs)
}, [userid]);

const [show, setShow] = useState(false)



return (


  <div id='knowledge-base-search'>
  <Card
    className='knowledge-base-bg'
    style={{
      backgroundImage: `url(${require('@src/assets/images/banner/banner.png').default})`
    }}
  >
    <CardBody className='text-center'>
      <h2 className='text-primary'>Welcome to  { store.selectedUser }  quizzes </h2>
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
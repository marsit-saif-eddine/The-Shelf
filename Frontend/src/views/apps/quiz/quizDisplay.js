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
    Accordion,
    
  } from 'reactstrap'
import axios from "axios"
import Quiz from "./quiz"
import {  useSelector } from "react-redux";



function QuizDisplay () {


              const [Quizs, setQuizs] = useState([])

  useEffect(() => {
    axios.get(`/quiz/allquiz`)
      .then(response => setQuizs(response.data))
      .catch(error => console.error(error));
      console.log(Quizs)

  }, []);

//const history = useHistory();

// function navigate_to(quizname){
//   var qname=quizname.split(".");
//   history.push("/"+qname[0])
// }
return (
  <div className="containers">
    <Row>
    {Quizs.map(quiz => (
        <Col md={4} >
 
   <Quiz key={quiz._id} quiz={quiz} />
</Col> 
    ))}
          </Row>       

          </div>
 

  );
}

export default QuizDisplay 
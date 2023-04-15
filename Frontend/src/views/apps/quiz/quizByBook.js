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
import { useParams } from 'react-router-dom';

import { Award } from 'react-feather'

import classnames from 'classnames'


//function QuizByBook(){
  const QuizByBook  = props => {
        // ** Props
 // ** fetch related quizzes
//  const getBook = async (req, res) => {
    
//       const bookId = req.params.book_id;
//  }
  const [quizzes, setQuizzes] = useState([]);

  //const { productId } = useParams();
  const params = useParams();
  console.log(params); // Check the console to see what `params` contains
  const productId = params.id;
  const approved="approved";

useEffect(() => {
    if (productId !== null) {
        fetch(`http://localhost:5000/quiz/allquiz?book=${productId}&status=${approved}`)
        .then(response => response.json())
        .then(data => setQuizzes(data))
        .catch(error => console.log(error));
        console.log("bookID:  "+productId)
        
    }
    console.log(quizzes)
  }, [productId]);



  //////

return(

<div className="containers">
    <Row>
    {quizzes.map(quiz => (
        <Col md={4} >
 
   <Quiz key={quiz._id} quiz={quiz} />
</Col> 
    ))}
          </Row>       

          </div>

)
}
export default QuizByBook; 
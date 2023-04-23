

import React from "react"
import { Fragment, useState, useEffect } from 'react'
import "./quiz.css"
import axios from "axios"
import {
    Row,
    Col,
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
  import { useForm, Controller } from 'react-hook-form'
  import { toast , ToastContainer} from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css';
  import Select from 'react-select'

  import QuizIcon from '@mui/icons-material/Quiz'
  import SearchIcon  from '@mui/icons-material/Search'
  import { IconButton, Radio   } from '@mui/material'
  import CheckBoxIcon from '@mui/icons-material/CheckBox'
  import CloseIcon from '@mui/icons-material/Close'
  import DeleteIcon from '@mui/icons-material/Delete'
  import SubjectIcon from '@mui/icons-material/Subject'
  import ContentCopyIcon from '@mui/icons-material/ContentCopy'
  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
  import VpnKeyIcon from '@mui/icons-material/VpnKey'
import { AccordionDetails, AccordionSummary, FormControl, FormControlLabel, MenuItem, Typography } from "@mui/material"
import { color, fontSize } from "@mui/system"
import QuizDisplay from "./quizDisplay"
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';




function questiond(props){
  

const [quiz,setQuiz]= useState([]);


const [score, setScore] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/quiz/${id}`)
      //  .then(response => console.log(response.data))
      .then(response => setQuiz(response.data.quiz))

        .catch(error => console.error(error));
  
      }, [id]);
 
    
 //////////////submit////////




const submitQuiz = (answers) => {
  let score = 0;
  const totalPoints = quiz.questions.reduce((acc, question) => {
    return acc + question.points;
  }, 0);

  quiz.questions.forEach((question, index) => {
    const userAnswer = answers["question_" + index];
    if (question.questionType === "checkbox") {
      const correctAnswers = question.options.filter((option) => option.answer);
      const userAnswers = userAnswer ? userAnswer.split(",") : [];
      const isCorrect = correctAnswers.every((option) =>
        userAnswers.includes(option.optionText)
      );
      if (isCorrect) {
        score += question.points;
      }
    } else if (question.questionType === "radio") {
      const correctAnswer = question.answerkey;
      if (userAnswer === correctAnswer) {
        score += question.points;
      }
    } else if (question.questionType === "text") {
      const correctAnswer = question.answerkey;
      if (userAnswer === correctAnswer) {
        score += question.points;
      }
    }
  });

  axios
    .post(`http://localhost:5000/quiz/${quiz._id}/submit`, { answers, score })
    .then((response) => {
      // Show the user's score to the user
      const userScore = response.data.score;
      Swal.fire({
        title: 'Quiz Submitted!',
        text: `Your score is ${userScore} out of ${totalPoints} points.`,
  
        icon: "success",
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      console.error(error);
    });
};


////

const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const answers = {};
  formData.forEach((value, key) => {
    const [prefix, questionIndex] = key.split('_');
    if (prefix === 'question') {
      answers[questionIndex] = value;
    }
  });
  submitQuiz(answers);   

};
if (!quiz) {
  return <div>Loading...</div>;
}



 ///////////////
return (
 
<Card>
  <CardHeader>
    <CardTitle >
      <Row>
      <Col sm='12' className='mb-1'>
        <h1>{quiz.quizName}</h1>
        <p>{quiz.quizDescription}</p>
      </Col>
      </Row>
    </CardTitle>
  </CardHeader>
  <div className="submitform">
    <CardBody>
      <Form onSubmit={handleSubmit}>
        {quiz.questions?.map((question, index) => (
          <div key={question._id.$oid}>
            <Row>
              <Col sm='12' className='mb-3'>
                <h2>Question {index + 1}</h2>
                <p>{question.questionText}</p>
                {question.options?.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <input
                      type={question.questionType}
                      name={"question_" + index}
                      value={option.optionText}
                      id={"question_" + index + "_option_" + optionIndex}
                    />
                    <label htmlFor={"question_" + index + "_option_" + optionIndex}>
                      {option?.optionText}
                    </label>
                  </div>
                ))}
              </Col>
            </Row>
          </div>
        ))}
        <Row>
          <Col lg={12} md={6}>
            <Button.Ripple block color='primary' type="submit">
              Submit
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </div>
</Card>

);
}

    export default questiond
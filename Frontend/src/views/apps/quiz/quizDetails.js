

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





function questiond(props){
  

const [quiz,setQuiz]= useState([]);



    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/quiz/${id}`)
      //  .then(response => console.log(response.data))
      .then(response => setQuiz(response.data.quiz))

        .catch(error => console.error(error));
  
      }, [id]);
 
      const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Process the user's answers and submit them to the database using an API call
      };
    
      if (!quiz) {
        return <div>Loading...</div>;
      }
 
return (
 
 
 <div>
      <h1>{quiz.quizName}</h1>
      <p>{quiz.quizDescription}</p>
      <form onSubmit={handleSubmit}>
        {quiz.questions?.map((question, index) => (
          <div key={question._id.$oid}>
            <h2>Question {index + 1}</h2>
            <p>{question.questionText}</p>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type={question.questionType}
                  name={"question_" + index}
                  value={option.optionText}
                  id={"question_" + index + "_option_" + optionIndex}
                />
                <label htmlFor={"question_" + index + "_option_" + optionIndex}>
                  {option.optionText}
                </label>
              </div>
            ))}
          </div>
        ))}
        <Button type="submit">Submit</Button>
       </form>
    </div>
);
}

    export default questiond
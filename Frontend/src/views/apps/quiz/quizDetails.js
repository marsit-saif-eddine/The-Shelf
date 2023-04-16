

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





function questiond(){
  

// const [quiz,setQuiz]= useState(
//   [{  quizName:"quiz name",
//       quizdesc:"quizdesc",
//       book_id:"",
//       questions:[
//         {questionText :"Question"},
//       {  questionType:"radio"},
//        { options:[
    
           
//             {optionText:""},
//             {optionText:""}
        
//     ]},
//     ],
//     answer:false,
//     answerkey:"",
//     points:0,
//     open:true,
//     required: false
// }]
// )
const [quiz,setQuiz]= useState([]);



    const { id } = useParams();
    useEffect(() => {
        axios.get(`/quiz/${id}`)
        .then(response => console.log(response.data.quiz))
        .then(response => setQuiz(response.data.quiz))

        .catch(error => console.error(error));
  
      }, []);
 
 
 
return (
    <div className="containers">
 
 
   <div >
   <h1> name :{quiz._id}</h1>
   <h1>{quiz.quizDescription}</h1>

   </div>
 
</div>
);
}

    export default questiond
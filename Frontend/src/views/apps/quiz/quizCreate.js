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
//import MenuIcon from "@mui/icons-material"


function quizCreate(){

    const [show, setShow] = useState(false)
  
    const [questions, setQuestions]= useState(
    [{ questionText :"Question",
    questionType:"radio",
    options:[

       
            {optionText:""},
            {optionText:""}
        
    ],
    answer:false,
    answerkey:"",
    points:0,
    open:true,
    required: false
}]
)


const [quizname,setQuizname]=useState("quiz name")
const [quizdesc,setQuizdesc]=useState("quiz desc")
const [selectedBookId, setSelectedBookId] = useState("book id here");


function changeQuestion(text, i){
var newQuestion =[...questions];
newQuestion[i].questionText=text;
setQuestions(newQuestion);
console.log(newQuestion)
}


function changeOptionValue(text, i, j){
    var optionsQuestion=[...questions];
    optionsQuestion[i].options[j].optionText=text;
    setQuestions(optionsQuestion);
    console.log(optionsQuestion)
}
function addQuestionType(i,type){
    let qs=[...questions];
    console.log(type)
    qs[i].questionType=type;
    setQuestions(qs);
}

function removeOption(i,j){
    var removeOptionQuestion =[...questions];
    if(removeOptionQuestion[i].options.length >1){
        removeOptionQuestion[i].options.splice(j,1);
        setQuestions(removeOptionQuestion)
        console.log(i+"__"+j);
    }
}
function addOption(i){
    var optionOfQuestion =[...questions];
    if(optionOfQuestion[i].options.length < 5 ){
        optionOfQuestion[i].options.push({optionText:"option"+(optionOfQuestion[i].options.length +1)})
    } else{
        console.log("max 5 options");

    }
    setQuestions(optionOfQuestion)
}

function copyQuestion(i){
    // expandCloseAll()
    let qs = [...questions]
    var newQuestion =qs[i]
    setQuestions([...questions,newQuestion])
}

function deleteuestion(i){
    let qs =[...questions];
    if(questions.length > 1){
qs.splice(i,1);
}
setQuestions(qs)
}

function addMoreQuestionField(){
    setQuestions([...questions,
    {questionText:"Question",questionType:"radio",options:[{ optinText:"option 1"}], open : true }]);
}

function setOptionAnswer(ans,qno){
    var Questions=[...questions];
    Questions[qno].answerKey=ans;
    setQuestions(Questions)
    console.log(" right answer is "+qno+" "+ans)
}

function setOptionPoints(points,qno){
    var Questions=[...questions];
    Questions[qno].points=points;

    setQuestions(Questions)
    console.log("question points =" +qno+" "+points)

}

function doneAnswer(i){
    var answerofQuestion =[...questions];
    answerofQuestion[i].answer= !answerofQuestion[i].answer;
    setQuestions(answerofQuestion)
}

function addAnswer(i){
    var answerofQuestion =[...questions];
    answerofQuestion[i].answer= !answerofQuestion[i].answer;
    setQuestions(answerofQuestion)
}

///////////// toast success  ////////////
const [saved, setSaved] = useState(false);


 ////////////////// save quiz /////////////////////
function commitToDb(){
    axios.post(`http://localhost:5000/quiz/addquiz`,{
      quizName:quizname,  
      quizDescription: quizdesc,
      questions:questions,
      book_id:selectedBookId,
      user_id:userId,
      method: 'POST',
    
    })
    if (!quizname) {
        setNameError('Name is required');
      }
    setSaved(true);
      
    toast.success('Quiz created successfully!');

    }

   
/////// show book in select /////////////
const [books, setBooks] = useState([])
    useEffect(() => {
        axios.get(`/book/books`)
          .then(response => setBooks(response.data.books))
          .catch(error => console.error(error));
          console.log(books)
    
      }, []);



      function handleSelectChange(event) {
        setSelectedBookId(event.target.value);
      }
      const [nameError, setNameError] = useState('');

      function handleSubmit(event) {
        event.preventDefault();
        if (quizname === '') {
            setNameError('Please enter your quiz title');
          }
        // submit quiz data with selectedBookId
      }


      ///////////// current user id/////////////////
     // const [userId, setUserId] = useState(null);
     const userId = localStorage.getItem("userId");
     console.log("current user id is "+userId); // current user ID
    //   useEffect(() => {
    //     const token = localStorage.getItem('token');
    
    //     if (token) {
    //       const decodedToken = jwtDecode(token);
    //       setUserId(decodedToken.sub);
    //     } else {
    //       setUserId(null);
    //     }
    //   }, []);
      /////////


function questionUI(){
    return questions.map((ques,i)=>(
        <Accordion expanded={ques.open} className={ques.open ? 'add_border':""}>

            {/* 
<AccordionSummary elevation={1} >
{ questions[i].open ? (
    <div className="saved-ques">
    <Typography > {i+1}. {questions[i].questionText}</Typography>
    {ques.options.map((op, j)=>(
    <div key={j}>
        <div style={{display:'flex',}}>
    <FormControlLabel control={
    <input type={ques.questionType} required={ques.type} /> 
    } 
    label={ 
    <Typography>
        <h1>11</h1>
    {ques.options[j].optionText }
    </Typography> 
    } />
    </div>
    </div>
))
    }
</div>
):""}
</AccordionSummary> */}

<div className="ques-box" >
    {!questions[i].answer? (
<AccordionDetails className="add-ques">
    <div className="add-ques-top">
    <Input type="text" className="question" placeholder="question" value={ques.questionText}  onChange={(e)=>{changeQuestion(e.target.value, i)}} ></Input>
    <select className="select" style={{fontSize:"13px"}}>
        <option id="text" value="text" onClick={()=>{addQuestionType(i,"text")}}> <SubjectIcon />paragraph</option>
        <option id="checkbox" value="checkbox"  onClick={()=>{addQuestionType(i,"check")}}><CheckBoxIcon checked />unique choice</option>
        <option id="radio" value="radio" onClick={()=>{addQuestionType(i,"radio")}}><Radio checked />multiple choice</option>

    </select>
    {!ques.answer ? (
    <div className="ques-edit">

    <AddCircleOutlineIcon  onClick={addMoreQuestionField} />
 </div>): ""}
    </div>

    {ques.options.map((op, j)=>(
        <div className="add-ques-body " key={j}>
            {
                (ques.questionType!="text") ?
                <Input type={ques.questionType}  style={{marginRight:"10px"}}/> :
                <ShortTextIcon />            
            }
            <div className="ques-input"> 
                <Input type="text" className="text-input" placeholder="option1" value={ques.options[j].optionText}  onChange={(e)=> {changeOptionValue(e.target.value,i,j)}}></Input>
            </div>


<IconButton aria-label="delete">
    <CloseIcon onClick={()=>{removeOption(i,j)}} />
</IconButton>
        </div>
    ))}

{ques.options.length < 5 ? (
    <div className="add-ques-body"  style={{display:"flex", flexDirection:"row"}}>
<FormControlLabel disabled control={
    (ques.questionType!="text") ?
    <Input type={ques.questionType} inputProps={{ 'aria-label': 'secondary checkbox'}} style={{marginLeft:"10px", marginRight:"10px"}} disabled /> :
<ShortTextIcon />
} label={
<div  className="add-option">
<Button  size="small" onClick={()=> {addOption(i)}} > add option</Button>
   </div>
}/>
</div> 
):""}



  






<div className="add-footer">
   
    <div className="add-ques-bottom-left">
<Button size="small" style={{textTransform:'none', fontSize:"13px", fontWeight:"600"}} onClick={()=> {addAnswer(i)}}>
    Answer Key
</Button>



<IconButton aria-label="copy" onClick={()=>{copyQuestion(i)}} >
    <ContentCopyIcon/>
</IconButton>


<IconButton aria-label="delete" onClick={()=>{deleteuestion(i)}}>
    <DeleteIcon/>
</IconButton>
</div>


    </div>


</AccordionDetails>):(
 
<AccordionDetails className="add-ques">


    <div className="top-jeader">
        choose correct answer
    </div>
    <div>
<div className="add-ques-top">
    <Input type="text" placeholder="question" value={ques.questionText} disabled />
    <Input type="number" placeholder="points" min="0" step="1"  onChange={(e)=>{setOptionPoints(e.target.value,i)}} />

</div>
{ques.options.map((op,j)=>(
  <div className="add-ques-body" key={j} >
    <div key={j}>
        <div>
            <div>
            <label onClick={()=>{setOptionAnswer(ques.options[j].optionText,i)}}>
        {(ques.questionText!="text") ?
    
    <Input 
    type={ques.questionType}
    name={ques.questionText}
    value="option3"
/> : <ShortTextIcon />}
{ques.options[j].optionText}
</label>
</div>
</div>
        </div>
        </div> 
))}


<div className="add-ques-body">
<Button size="small" style={{textTransform:'none', fontSize:"13px", fontWeight:"600"}}>
add answer feedback </Button>
</div>
<div>
    <Button variant="outlined"  onClick={()=>{doneAnswer(i)}}>Done</Button>
</div>
    </div>
</AccordionDetails>)}
</div>
        </Accordion>
        
    ))
}
return(
  
<Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Search</CardTitle>
       
       
         
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
               <SearchIcon/>
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
             // value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
                 </Col>
               

                 
                 </CardHeader>
                 </Card>

                 <Card>
                    <CardHeader>New quiz </CardHeader>
                    <CardBody>
                    <Row>
                    <Col>
                    <Button color='primary' onClick={() => setShow(true)}>
                        Add new Quiz</Button>
                    </Col>
                 </Row>
                    </CardBody>
                 </Card>

                
                    
                


                 <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Create a new QUIZ</h1>
            <p>you can create your own questions from here</p>
          </div>
          <Form  onSubmit={handleSubmit}>
            <Card>
            <Row className='gy-1 pt-75'>
            <label>
        User ID:{userId}
        {/* <input type="text" value={userId || ''} disabled /> */}
      </label>
             <Input type="text" className="quiz-title" placeholder="enter your quiz title here" onChange={(e)=>{setQuizname(e.target.value)}} required></Input>
             {nameError && <span>{nameError}</span>}
             <Input type="text" className="quiz-desc" placeholder="enter your quiz desrpition here" onChange={(e)=>{setQuizdesc(e.target.value)}}></Input>
             {/* <form onSubmit={handleSubmit}> */}
                <Row>
                    <label> choose the book this quiz is about : </label>
             <select name="book_id"  value={selectedBookId} onChange={handleSelectChange} className="select">
  <option value="">Select a book</option>
  {books.map((book) => (
    <option key={book.id} value={book.id}>
      {book.name}
    </option>
  ))}
</select>
</Row>
{/* </form> */}
            </Row>
            </Card>
            <Card>
{questionUI()}
<Button onClick={commitToDb }> SAVE</Button>
{saved}
      <ToastContainer />
            </Card>
          </Form>
        </ModalBody>
      </Modal>


                 </Fragment>
                
   
)
}

export default quizCreate 
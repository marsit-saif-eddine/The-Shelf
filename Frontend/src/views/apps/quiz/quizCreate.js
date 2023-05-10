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


///////// state variables  ///////////

    const [show, setShow] = useState(false)

    const [quizname,setQuizname]=useState("quiz name")

    const [quizdesc,setQuizdesc]=useState("quiz desc")

    const [selectedBookId, setSelectedBookId] = useState("");

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
const [saved, setSaved] = useState(false);

const [books, setBooks] = useState([])

const [quizNameError, setQuizNameError] = useState('');
const [quizDescError, setDescError] = useState('');
const [quizQuestionError, setQuestionError] = useState('');
const [quizOptionError, setQuizoptionError] = useState('');
const [answerkeyError, setAnswerkeyError] = useState('');
const [pointsError, setPointsError] = useState('');

//const [quizNameError, setQuizNameError] = useState('');


const [submitted, setSubmitted] = useState(false);

//////////// functions ///////////

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
    Questions[qno].answerkey=ans;
    setQuestions(Questions)
    console.log(" right answer is " +ans)
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




 
var user = JSON.parse(localStorage.getItem('userData'));
//console.log("your user id is :"+user.id);
var userId = user._id;
var userName = user.username;
var userpic = user.avatar;
/////// show book in select /////////////
    useEffect(() => {
        axios.get(`/book/books`)
          .then(response => {console.log(response.data) ; setBooks(response.data)})
          .catch(error => console.error(error));
          console.log("booook"+ books)
    
      }, []);



 

    function handleSelectChange(event) {

        if (event && event.target && event.target.value) {
            console.log("selectedBookId:", event.target.value);

          setSelectedBookId(event.target.value);
          console.log('selectedBookId updated to:', selectedBookId);

        }
      }


////validators///////


  

const validateQuizName = () => {
    if (quizname.length < 3) {
        setQuizNameError('Quiz name must be at least 3 characters long');
      
    } else {
      setQuizNameError('');
    }
  };
  const validateQuizDesc = () => {
    if (quizdesc.length < 6) {
        setDescError('Quiz description must be at least 6 characters long');
      
    } else {
        setDescError('');
    }
  };
  const validateQuizQuestion = () => {
    if (questions.length < 2) {
        setQuestionError('please enter at least 2 questions');
      
    } else {
        setQuestionError('');
    }
  };

//   const validateAnswerKey = () => {
//     if (questions.length < 2) {
//         setQuestionError('please enter at least 2 questions');
      
//     } else {
//         setQuestionError('');
//     }
//   };



  useEffect(() => {
    validateQuizName();
    validateQuizDesc();
    validateQuizQuestion();
  }, [quizname, quizdesc,quizQuestionError, setQuizNameError, setDescError,setQuestionError]);

  useEffect(() => {
    if (submitted && !quizNameError && !quizDescError && !quizQuestionError) {
      commitToDb();
    }
  }, [submitted, quizNameError, quizDescError,quizQuestionError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateQuizName();
    validateQuizDesc();
    validateQuizQuestion();
    if (quizNameError || quizDescError || quizQuestionError) {
        
      return;
    }
    setSubmitted(true);
  
  };

////////////////////
////////////////// save quiz /////////////////////


 
function commitToDb(){
    if (quizNameError || quizDescError ) {
console.log("errrrrooo");
        return;
      }
      if (!quizname || !quizdesc) {
        setQuizNameError('Quiz name is required');
        setDescError('Quiz description is required');
        return;
      }
    
      axios.post(`http://localhost:5000/quiz/addquiz`, {
        quizName: quizname,
        quizDescription: quizdesc,
        questions: questions,
        book_id: selectedBookId,
        user_id: userId,
        creator: userName,
        creator_pic: userpic,
        method: 'POST',
      })
      .then(() => {
        setSaved(true);
        toast.success('Quiz created successfully!', {
            onClose: () => {
              setShow(false);
            }
          });
          
        //setShow(false);
      })
      .catch(error => {
        console.error(error);
        toast.error('Failed to create quiz');
      });
    }
//
  ////////////////
  const booksOptions = [
    {
      label: 'books',
      options: [
       // { value: '', label: '' }, // add a blank option
        ...books.map((book) => ({ value: book._id, label: book.name }))
      ]
    }
  ];

//////////


function questionUI(){
    return questions.map((ques,i)=>(
        <Accordion expanded={ques.open} className={ques.open ? 'add_border':""}>


<div className="ques-box" >
    {!questions[i].answer? (
<AccordionDetails className="add-ques">
    <br></br>
    <div className="add-ques-top">
    <Input type="text" className="question" placeholder="question" value={ques.questionText}  onChange={(e)=>{changeQuestion(e.target.value, i)}} ></Input>
    {/* {quizQuestionError && <div className="error">{quizQuestionError}</div>} */}
                <div class="col-md-3 mb-1">
    <select className="select2 form-select" style={{fontSize:"13px"}}>
        <option id="text" value="text" onClick={()=>{addQuestionType(i,"text")}}> <SubjectIcon />paragraph</option>
        <option id="checkbox" value="checkbox"  onClick={()=>{addQuestionType(i,"check")}}><CheckBoxIcon checked />unique choice</option>
        <option id="radio" value="radio" onClick={()=>{addQuestionType(i,"radio")}}><Radio checked />multiple choice</option>

    </select>
    </div>
  
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

<p class="warning"> Please don't forget to add the answer key and the points</p>

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
{/* <Button size="small" style={{textTransform:'none', fontSize:"13px", fontWeight:"600"}}>
add answer feedback </Button> */}
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
    

                 
           
                 
                    <Row>
                    <Col >
                    <Button  className='add-new-user' color='primary' onClick={() => setShow(true)}>
                        Add new Quiz</Button>
                    </Col>
                 </Row>
                   
                
                 <Card>  
                 <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Create a new QUIZ</h1>
            <p>hello, you can create your own questions from here</p>
          </div>
          {submitted && quizNameError && <div className="error">{quizNameError}</div>}

          <Form onSubmit={handleSubmit} >
            
            <Row className='gy-1 pt-75'>
            
             <Input type="text" className="quiz-title" placeholder="enter your quiz title here" onChange={(e) => setQuizname(e.target.value)} required></Input>
             {quizNameError && <div className="error">{quizNameError}</div>}
             <Input type="text" className="quiz-desc" placeholder="enter your quiz desrpition here" onChange={(e)=>{setQuizdesc(e.target.value)}}></Input>
             {quizDescError && <div className="error">{quizDescError}</div>}

          <br></br>
                <Row>
                <Col className='mt-2' md='12' sm='12' >
                <div class="col-md-6 mb-1">
                    <label> choose the book this quiz is about : </label>
             <select name="book_id" value={selectedBookId} onChange={handleSelectChange} className="select2 form-select">
  {books.map((book) => (
    <option key={book._id} value={book._id}>
      {book.name}
    </option>
  ))}
</select>
</div>
</Col>
          {/* <Col className='mb-1' md='6' sm='12'>
            <Label className='form-label'>Grouped Select</Label>
            <Select
            value={selectedBookId} 
        // onChange={handleSelectChange}
            onChange={()=>handleSelectChange()}
            options={booksOptions}
              isClearable={false}
             
              className='react-select'
              classNamePrefix='select'
            />
          </Col> */}
</Row>

            </Row>
           
          
{questionUI()}
<Col lg={12} md={6}>
<Button  color="primary" onClick={commitToDb }> SAVE</Button>
</Col>
{saved}

<br></br>
      <ToastContainer />
         
          </Form>
        </ModalBody>
      </Modal>
      </Card>


                 </Fragment>
                
   
)
}

export default quizCreate 
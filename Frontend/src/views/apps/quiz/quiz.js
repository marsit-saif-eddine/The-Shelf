import { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle,CardImg, Col, Row, DropdownMenu, DropdownItem } from "reactstrap";
import QuizDisplay from "./quizDisplay";
import img from "@src/assets/images/icons/quiz.jpg"

function Quiz ({quiz}) {



//   function navigate_to(quiz){
//     var qname=quiz.split(".");
//     history.push("/"+qname[0])
//   }



    return (
     

      <Card style={{ width: "28rem" }}  border="secondary">
        <CardHeader>
          <CardTitle>
          {quiz.questionName}
          </CardTitle>
       
          <CardImg
          variant="top"
          src={img}
          alt="Product Img"
          height={200}
        />
        </CardHeader>
    <CardBody>
<CardText> {quiz.questionDescription} </CardText>   
<a href="#" className="btn btn-outline-primary" onClick={()=>{navigate_to(quiz)}}>Take Quiz</a>     
 </CardBody>
    </Card>

     
      );
    }
    
    export default Quiz;
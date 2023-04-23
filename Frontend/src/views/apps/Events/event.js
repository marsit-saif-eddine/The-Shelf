import { useState } from "react";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle,CardImg, Col, Row, DropdownMenu, DropdownItem } from "reactstrap";
import img from "@src/assets/images/icons/quiz.jpg"
import { Link } from 'react-router-dom';
import { Trash2 } from "react-feather";
import Swal from 'sweetalert2';
import axios from "axios";
import { useEffect } from "react";
function Event ({event}) {


  const [Events, setEvents] = useState([])
  const[change,setChange]=useState(false)


  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.log(error));
  }, []);

    return (
    
      <Card style={{ width: "28rem" }}  border="secondary">
        <CardHeader>
          <CardTitle>
          {event.name}
          </CardTitle>
       
          <CardImg
          variant="top"
          src={`http://localhost:5000/uploads/${event.image.substr(8)}`}
          height={200}
        />
        </CardHeader>
    <CardBody>
<CardText> {event.location} </CardText> 
 

<div class="d-flex justify-content-end justify-content-sm-end align-items-end mb-2 col-sm-12">

</div> 
 </CardBody>
    </Card>

     
      );
    }
    
    export default Event;
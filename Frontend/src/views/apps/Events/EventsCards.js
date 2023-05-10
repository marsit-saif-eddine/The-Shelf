import React, { useState, useEffect,useCallback } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import { format } from 'date-fns';
import { Fragment } from 'react'
import {  UncontrolledTooltip} from 'reactstrap'
import Avatar from '@components/avatar'
import { BsFillCameraVideoFill} from 'react-icons/bs';
import avatar5 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt } from 'react-icons/fa';

import axios from 'axios';
import UpdateEventForm from "../Events/UpdateEventForm"
import './events.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFlag, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import {  useCookies } from "react-cookie";
import {  CardBody, CardText, Button, Badge } from 'reactstrap'
import { isUserLoggedIn } from '@utils'

import { AvatarGroup } from '@mui/material';
import { Bold } from 'react-feather';

function EventsCards() {
  const [cookies, _]=useCookies(['access_token'])

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(true); // add state variable to track form visibility
  const [participatedCount, setParticipatedCount] = useState(0);
  const [isparticipated, setIsParticipating] = useState(false);
  const [user, setUser] = useState('');
  const [change, setChange] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [participants, setparticipants] = useState([]);
  const [ParcedData,setParcedData]=useState([])
  
  const [participantCount, setParticipantCount] = useState(0);

  const [userData, setUserData] = useState(null)
  const { eventId } = useParams();
  const [counttt, setCounttt] = useState(0);

  const participate = async (_id) => {
    try {
      const res = await axios.post(`/events/participate/${_id}`);
      console.log(res.data);
      setEvents(events.map(event => {
        if (event._id === _id) {
          return { ...event, participants: res.data.participants }
        }
        return event;

      }));
    } catch (err) {
      console.error(err);
      //  setErrorMessage('Failed to participate to an event.');

    }
  };


  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    }
  }, []);
  

  useEffect(() => {
    axios.get('http://localhost:5000/events').then(({data}) => {
      setEvents(data);
      
    });
  }, []);
 
  
  const getEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      setEvents(response.data);
      
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to fetch events");
    }
  };
  useEffect(() => {
    // Call getEvents when the component mounts
    getEvents();
  }, []);


  useEffect(()=>{
    if(events.length>0){
      // fetcheventusers()
    
    }
  },[events])


  const handleUserInput = (event) => {
    setUser(event.target.value);
  }
  
 
  const patchParticipate = async (eventId) => {
    let userId = userData._id;
    try {
      const response = await axios.post(`/events/participate/${eventId}/${userId}`);
  
      const data =  response.data;
      console.log(data)
      setEventData(data);
      const isParticipating = localStorage.getItem(`event_${eventId}_isParticipating`) === "true";
      setIsParticipating(isParticipating);
  
      // Update the isParticipating property of the event object
      const updatedEvents = events.map((event) => {
        if (event._id === eventId) {
          return {
            ...event,
            isParticipating: !event.isParticipating,
            participantCount: event.participantCount + (event.isParticipating ? -1 : 1),
          };
        } else {
          return event;
        }
      });
  
      // Update the events state with updated participant count
      const updatedEvent = updatedEvents.find((event) => event._id === eventId);
      setEvents([...updatedEvents.filter((event) => event._id !== eventId), updatedEvent]);
  
      // Update counttt state
      const updatedCount = updatedEvent.participants.length;
      setCounttt(updatedCount);
    } catch (error) {
      console.error(error);
    }
  };

   
  
    const partcipatee = async (eventId) => {
      console.log(userData.id);
      let userId = userData.id;
      console.log(eventId);
      try {
        const response = await axios.post(`/events/participate/${eventId}/${userId}`);
        const data = await response.data();
        if (!data) {
          // Handle the case where the response data is null or undefined
          return;
        }
        setEventData(data);
        if (data.participants) {
          setParticipantCount(data.participants.length);
        }
        // Update participant count in event data
        const updatedEvents = events.map((event) => {
          if (event._id === eventId) {
            return { ...event, participants: data.participants };
          }
          return event;
        });
        setEvents(updatedEvents);
        setParticipantCount(data.participants.length);
        getEvents();
      } catch (error) {
        console.error(error);
      }
    };
    
    
    
  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setShowForm(true)
  };

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.log(error));
  }, [eventData]);


 

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(`/events/delete/${_id}`);
      console.log(res.data);
      setSuccessMessage('Successfully deleted the event!');
      setTimeout(() => setSuccessMessage(null), 3000);


      // Remove the deleted event from the list of events
      setEvents(events.filter(event => event._id !== _id));

    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to delete event.');

      // Implement logic to show an error message
    }
  };
  const participateEvent = async (_id) => {
    try {
      const res = await axios.post(`/events/participate/${_id}`);
      console.log(res.data);
      setEvents(events.map(event => {
        if (event._id === _id) {
          return { ...event, participants: res.data.participants }
        }
        return event;

      }));
    } catch (err) {
      console.error(err);
      //  setErrorMessage('Failed to participate to an event.');

    }
  };

  //reportting**********************************
  const reportEvent = async (eventId) => {
    try {
      const res = await axios.post(`/events/report/${eventId}`);
      console.log(res.data);
      setSuccessMessage('Successfully reported the event!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to report the event.');
    }
  };



  //unparticipating*********************


  const unparticipateEvent = async (_id) => {
    try {
      const res = await axios.post(`/events/unparticipate/${_id}`);
      console.log(res.data);
      setEvents(events.map(event => {
        if (event._id === _id) {
          return { ...event, participants: res.data.participants }
        }
        return event;
      }));
    } catch (err) {
      console.error(err);
      // setErrorMessage('Failed to unparticipate event.');

    }
  };
  const handleEventUpdate = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
      
    );
    setShowForm(false); // Hide the form after submitting it


  };
  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) => {
      const index = prevEvents.findIndex((event) => event._id === updatedEvent._id);
      console.log(index)
      if (index !== -1) {
        const newEvents = [...prevEvents];
        newEvents[index] = updatedEvent;
        return newEvents;
      } else {
        return prevEvents;
      }
    });
    setShowForm(false); // Hide the form after submitting it

    setSelectedEvent(null); // Clear the selectedEvent state to hide the update form

  };
  // setParticipatedCount( Object.keys(data.participants).length);


  return (
    

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    {/* Render the error message if it exists */}
    {errorMessage && (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    )}
    
    
<div className="card-container">
  
{events.map((event) => {
let counttt = event && event.participants ? event.participants.length : 0;
return (
    <div className="card-wrapper" key={event._id}>
      <div className="img-container">
        <img
          src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`}
          alt={event.name}
          loading="lazy"
          style={{ width: '60%', height: '60%', borderRadius: '10px' }}
        />
      </div>
      <Card className='ecommerce-card'>
        <CardBody>
          <h6 className='item-name'>
            <Link to={`/eventsdetail/${event._id}`}>{event.name}</Link>
            <CardText tag='span' className='item-company'></CardText>
          </h6>
       
          <CardText className='item-description'>
  <FaMapMarkerAlt style={{ marginRight: 5 ,color:"grey",font:Bold}} />
   {event.location}
</CardText>          <CardText className='item-description'>
  <FontAwesomeIcon icon={faCalendar} className="mr-2" style={{color:"grey"}} />
  {event?.startDate ? format(new Date(event.startDate), "dd MMM yyyy") : ""} TO {event?.endDate ? format(new Date(event.endDate), "dd MMM yyyy") : ""}
</CardText>

          <button
            className="participate-btn"
            variant="contained"
            color="#f5821f"
            onClick={() => patchParticipate(event._id)}
            
          >{counttt} 
            {event.isParticipating ? "Cancel participation" : "Participated"}
            {/* <div>{userData.Avatar}</div> */}

          </button>
         

  
 
          <div className='d-flex justify-items-center mr-auto '>
            
          <AvatarGroup  className="avatargroup" max={7}>
  {event.participants.map(participantt => (
     <Avatar className="avatar" key={participantt._id}  alt={participantt.firstname} img={participantt.profile_photo} />
    
  ))    
  }

 


  
</AvatarGroup>

    </div>
       
        
        </CardBody>
      </Card>
    </div>
  );
})}
</div>

{successMessage && (
  <div className="alert alert-success" role="alert">
    {successMessage}
  </div>
)}
</div>


)
}


export default EventsCards;






      //   <Card key={event._id} sx={{ width: 320, backgroundColor: '#161d31' }}>
      //     <CardOverflow sx={{  backgroundColor: '#161d31' }}>
      //       <AspectRatio ratio="2">
      //         <img
      //           src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`} alt={event.name} 
      //           loading="lazy"
      //         />
      //       </AspectRatio>
      //     </CardOverflow>

      //     <Typography level="h1" sx={{ fontSize: 'md', mt: 2 }}>
      //       <Link to={`/eventsdetail/${event._id}`}>{event.name}</Link>
      //     </Typography>

      //     <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
      //       {/* <Link href="#multiple-actions">{event.location}</Link> */}
      //     </Typography>
      //     <Divider inset="context" />
      //     <CardOverflow
      //       variant="soft"
      //       sx={{
      //         display: 'flex',
      //         gap: 1.5,
      //         py: 1.5,
      //         px: 'var(--Card-padding)',
      //         bgcolor: '#161d31',
      //       }}
      //     >
      //       <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
      //         {event.startDate}
      //       </Typography>
      //       <Divider orientation="vertical" />
      //       <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
      //         {event.endDate}
      //       </Typography>

      //       <button
      //         variant="contained"
      //         color="primary"
      //         onClick={() => patchParticipate(event._id)}
      //       >
      //         {event.isParticipating ? "Cancel participation" : "Participate"}
              
      //       </button>
            
      //     </CardOverflow>
      //   </Card>
      // ))}
     
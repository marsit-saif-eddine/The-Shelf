// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { Heart, MessageSquare, Share2 } from 'react-feather'
import { format } from 'date-fns';

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, CardHeader, CardTitle,CardImg } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateEventForm from "../../apps/Events/UpdateEventForm"
import { useSelector, useDispatch } from 'react-redux'
// import './events.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFlag, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { isUserLoggedIn } from '@utils'

const ProfileBooks = ({ data }) => {

  const [books, setBooks] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(true); // add state variable to track form visibility


  const [userData, setUserData] = useState(null)

  const {id}=useParams();




  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')));

    }
  }, []);
  



  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setShowForm(true)
  };

  const fetchHandler = async () => {
    return await axios.get(`book/user_book/${id}`).then((res) => res.data);
};
// ** ComponentDidMount : Get product
    useEffect(() => {
      fetchHandler().then((data) => {
          //console.log('this is data', data)
          setBooks(data)
      });
    }, [])




  // const handleUpdate = async (_id) => {
  //     try {
  //         const res = await axios.put(`/events/update/${_id}`, { /* update data */ });
  //         console.log(res.data);
  //     } catch (err) {
  //         console.error(err);
  //         // Implement logic to show an error message
  //     }
  // };

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
    setSelectedEvent(null); // Clear the selectedEvent state to hide the update form

     // Hide the form
  console.log('Before setShowForm:', showForm);
  setShowForm(false);
  console.log('After setShowForm:', showForm);



  };


  const renderPosts = () => {
    return books.length > 0 ?  books.map(item => {
      return (
        <Card key={item.id} style={{ width: "28rem" }} className="w-100" border="secondary">
              <CardHeader>
                
                  <CardImg
                  variant="top"
                  src={item.image}
                  alt={item.name}
                  height={200}
                />
                </CardHeader>
                <CardBody>
                <CardText>  <Link className='text-body' to={`/bookdetail/${item._id}`}>
                        {item.name} </Link> </CardText>  
                
                
                <CardText>   {' By '}
                                  <a className='company-name' onClick={e => e.preventDefault()}>
                                    {item.author}
                                  </a>
                                </CardText> 
                
                
                <CardText> {item.description}</CardText>
                
                
                <CardText>  {(item.price && item.price!=="0")  && <h4 className='item-price'>${item.price}</h4>}</CardText>
                
                <Button
                                className='btn-wishlist'
                                color='light'
                                onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
                              >
                                <Heart
                                  className={classnames('me-50', {
                                    'text-danger': item.isInWishlist
                                  })}
                                  size={14}
                                />
                                <span>Wishlist</span>
                              </Button>
                
                              <Link to={`/bookdetail/${item._id}`}>
                                <Button color='primary'className='btn-cart move-cart' >
                                View Details</Button>
                              </Link>
                
                </CardBody>
        </Card>
        

      )
    }) : <>There is no posts to show</>;
  }
  return renderPosts()
}
export default ProfileBooks
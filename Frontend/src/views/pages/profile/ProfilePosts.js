// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { Heart, MessageSquare, Share2, User } from 'react-feather'
import { format } from 'date-fns';

// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, UncontrolledTooltip, Input, Label, Button } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateEventForm from "../../apps/Events/UpdateEventForm"
// import './events.css';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFlag, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { isUserLoggedIn } from '@utils'

const ProfilePosts = ({ data }) => {

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(true); // add state variable to track form visibility


  const [userData, setUserData] = useState(null)

  const { id } = useParams();




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

  useEffect(() => {
    if (userData !== null) {
      fetch(`http://localhost:5000/events?userconnected=${id}`)
        .then(response => response.json())
        .then(data => setEvents(data))

        .catch(error => console.log(error));
      console.log("sii" + userData.id);
    }
    console.log(events)
  }, [userData]);


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
  // const handleReport = (eventId, userId) => {
  //   setEvents(prevEvent => {
  //     const reportedBy = Array.isArray(prevEvent.reportedBy) ? prevEvent.reportedBy : [];
  //     return {
  //       ...prevEvent,
  //       reportedBy: [...reportedBy, userId=userData.id]
  //     };
  //   });
  // };


  const renderPosts = () => {
  //   const renderPosts = () => {

    //     const currentUser = localStorage.getItem('userId');

    //     return events.map(event => {

    //       return (
    //         <Card key={event._id}>
    //           <CardBody>
    //             <div className='d-flex justify-content-start align-items-center mb-1'>
    //               <div className='profile-user-info'>
    //                 <h6 className='mb-0'>{event.name}</h6>
    //               </div>
    //             </div>
    //             <CardText>{event.description}</CardText>
    //             <img src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`} alt={event.name} className='img-fluid rounded mb-75' />
    //             <Row className='d-flex justify-content-start align-items-center flex-wrap pb-50 post-actions'>
    //               <Col className='d-flex justify-content-between justify-content-sm-start mb-2' sm='6'>
    //                 <div className='d-flex align-items-center text-muted text-nowrap cursor-pointer'>
    //                   <Heart size={18} />
    //                   <span>{event.participants}</span>
    //                 </div>
    //                 <div className='d-flex align-items-center'>
    //                   <div className='avatar-group ms-1'>
    //                     {event.reviews.map(user => {
    //                       return (
    //                         <div></div>
    //                         // <Fragment key={user.username}>
    //                         //   <Avatar
    //                         //     className='pull-up'
    //                         //     img={user.avatar}
    //                         //     id={user.username?.toLowerCase().split(' ').join('-')}
    //                         //     imgHeight='26'
    //                         //     imgWidth='26'
    //                         //   />
    //                         //   <UncontrolledTooltip
    //                         //     target={user.username?.toLowerCase().split(' ').join('-')}
    //                         //     placement='top'
    //                         //   >
    //                         //     {user.username}
    //                         //   </UncontrolledTooltip>
    //                         // </Fragment>
    //                       )
    //                     })}
    //                   </div>
    //                 </div>
    //               </Col>
    //               <Col className='d-flex justify-content-between justify-content-sm-end align-items-center mb-2' sm='6'>
    //                 {currentUser && currentUser === event.owner && (
    //                   <>
    //                     <a className='text-nowrap share-post' onClick={() => handleUpdate(event)}>
    //                       <Share2 size={18} className='text-body mx-50'></Share2>
    //                       <span className='text-muted me-1'></span>
    //                     </a>
    //                     <button className="btn btn-pastel-warning btn-sm" onClick={() => handleUpdate(event)}>
    //                       <FontAwesomeIcon icon={faEdit} />
    //                     </button>
    //                     <button className="btn btn-pastel-danger btn-sm" onClick={() => handleDelete(event._id)}>
    //                       <FontAwesomeIcon icon={faTrashAlt} />
    //                     </button>
    //                     <button className="btn btn-pastel-info btn-sm" onClick={() => reportEvent(event._id)}>
    //                       <FontAwesomeIcon icon={faFlag} />
    //                     </button>
    //                   </>
    //                 )}
    //                 {currentUser && (event.participants.includes(currentUser)) ? (
    //                   <button className="btn btn-pastel-success btn-sm" onClick={() => unparticipateEvent(event._id)}>
    //                     <FontAwesomeIcon icon={faCheck} />
    //                   </button>
    //                 ) : (
    //                   currentUser && (
    //                     <button className="btn btn-pastel-primary btn-sm" onClick={() => participateEvent(event._id)}>
    //                       <FontAwesomeIcon icon={faPlus} />
    // </button>
    // )
    // )}
    //               </Col>
    //             </Row>
    //             {/* {post.detailedComments.map(comment => (
    //               <div key={comment.username} className='d-flex align-items-start mb-1'>
    //                 <Avatar img={comment.avatar} className='mt-25 me-75' imgHeight='34' imgWidth='34' />
    //                 <div className='profile-user-info w-100'>
    //                   <div className='d-flex align-items-center justify-content-between'>
    //                     <h6 className='mb-0'>{comment.username}</h6>
    //                     <a href='/' onClick={e => e.preventDefault()}>
    //                       <Heart
    //                         size={18}
    //                         className={classnames('text-body', {
    //                           'profile-likes': comment.youLiked === true
    //                         })}
    //                       />
    //                       <span className='align-middle ms-25 text-muted'>{comment.commentsLikes}</span>
    //                     </a>
    //                   </div>
    //                   <small>{comment.comment}</small>
    //                 </div>
    //               </div>
    //             ))} */}
    //             <div>
    //             <h6>{event?.startDate ? format(new Date(event.startDate), "dd MMM yyyy") : ""} ~~ {event?.endDate ? format(new Date(event.endDate), "dd MMM yyyy") : ""}</h6>
    //             </div>
    //             <fieldset className='form-label-group mb-50'>
    //               <Label className='form-check-label' >
    //                 Add Comment
    //               </Label>
    //               <Input type='textarea' rows='3' placeholder='Add Comment' />
    //             </fieldset>
    //             <Button color='primary' size='sm'>
    //               Post Comment
    //             </Button>
    //           </CardBody>
    //           {selectedEvent && <UpdateEventForm event={selectedEvent} onSubmit={updateEvent} onEventUpdate={handleEventUpdate} />}

    //         </Card>

    //       )
    //     })
    //   }
    //   return renderPosts()
    // }
    return events.length > 0 ? events.map(event => {
      return (
        <Card key={event._id}>
          <CardBody>
            {selectedEvent && showForm && <UpdateEventForm event={selectedEvent} onSubmit={updateEvent} onEventUpdate={handleEventUpdate} />}

            <div className='d-flex justify-content-start align-items-center mb-1'>
              {/* <img src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`} alt={event.name} /> */}
              <div className='profile-user-info'>
                {/* <h5 className='mb-0'>{event.startDate}</h5> */}

                <h5 className='mb-0'>{event.name}</h5>

                {/* <small className='text-muted'>{post.postTime}</small> */}
              </div>
            </div>
            <CardText>{event.description}</CardText>

            <img src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`} alt={event.name} className='img-fluid rounded mb-75' />

            <Row className='d-flex justify-content-start align-items-center flex-wrap pb-50 post-actions'>
              <Col className='d-flex justify-content-between justify-content-sm-start mb-2' sm='6'>
                <div className='d-flex align-items-center text-muted text-nowrap cursor-pointer'>
                  <Heart
                    size={18}
                  // className={classnames('me-50', {
                  //   'profile-likes': post.youLiked === true
                  // })}
                  />
                </div>
                <div className='d-flex align-items-center'>
                  <div className='avatar-group ms-1'>
                    {event.reviews.map(user => {
                      return (
                        <div></div>
                        // <Fragment key={user.username}>
                        //   <Avatar
                        //     className='pull-up'
                        //     img={user.avatar}
                        //     id={user.username?.toLowerCase().split(' ').join('-')}
                        //     imgHeight='26'
                        //     imgWidth='26'
                        //   />
                        //   <UncontrolledTooltip
                        //     target={user.username?.toLowerCase().split(' ').join('-')}
                        //     placement='top'
                        //   >
                        //     {user.username}
                        //   </UncontrolledTooltip>
                        // </Fragment>
                      )
                    })}
                  </div>
                  {/* <a href='/' className='text-muted text-nowrap ms-50' onClick={e => e.preventDefault()}>
                    +{post.likedCount} more
                  </a> */}
                </div>
              </Col>
              {userData && event.owner == userData.id && (

                <Col className='d-flex justify-content-between justify-content-sm-end align-items-center mb-2' sm='6'>
                  {/* <a href='/' className='text-nowrap'>
                  <MessageSquare size={18} className='text-body me-50'></MessageSquare> */}
                  {/* <span className='text-muted me-1'>{reviews?.comments}</span> */}
                  {/* </a> */}
                  {/* <a className='text-nowrap share-post' onClick={() => handleUpdate(event)}>
                  <Share2 size={18} className='text-body mx-50'></Share2>
                  <span className='text-muted me-1'></span>
                </a> */}

                  <button className="btn btn-pastel-warning btn-sm" onClick={() => handleUpdate(event)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn btn-pastel-danger btn-sm" onClick={() => handleDelete(event._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button className="btn btn-pastel-info btn-sm" onClick={() => reportEvent(event._id)}>
                    <FontAwesomeIcon icon={faFlag} />
                  </button>

                </Col>)}
            </Row>
            {/* {post.detailedComments.map(comment => (
              <div key={comment.username} className='d-flex align-items-start mb-1'>
                <Avatar img={comment.avatar} className='mt-25 me-75' imgHeight='34' imgWidth='34' />
                <div className='profile-user-info w-100'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <h6 className='mb-0'>{comment.username}</h6>
                    <a href='/' onClick={e => e.preventDefault()}>
                      <Heart
                        size={18}
                        className={classnames('text-body', {
                          'profile-likes': comment.youLiked === true
                        })}
                      />
                      <span className='align-middle ms-25 text-muted'>{comment.commentsLikes}</span>
                    </a>
                  </div>
                  <small>{comment.comment}</small>
                </div>
              </div>
            ))} */}
            <div>
              <h6>{event?.startDate ? format(new Date(event.startDate), "dd MMM yyyy") : ""} ~~ {event?.endDate ? format(new Date(event.endDate), "dd MMM yyyy") : ""}</h6>
            </div>
            <h6 className='mb-0'>{event.location}</h6>

            <fieldset className='form-label-group mb-50'>
              <Label className='form-check-label' >

              </Label>
              {/* <button onClick={() => handleReport(event._id, userData.id)}>
  Report Event
</button>

              <div>
                <p>Reported by:</p>
                <div>
                  {event.reportedBy.map(userId => (
                    <img src={getUserAvatar(userId)} alt="User Avatar" key={userId} />
                  ))}
                </div>
              </div> */}
            </fieldset>
           
          </CardBody>

        </Card>


      )
    }) : <>There is no posts to show</>;
  }
  return renderPosts()
}
export default ProfilePosts
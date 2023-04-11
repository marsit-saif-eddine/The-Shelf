import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateEventForm from "../Events/UpdateEventForm"
import './events.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFlag, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
function EventsCards() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(true); // add state variable to track form visibility
  useEffect(() => {
    axios.get('/eventcards').then(({data}) => {
      setEvents(data);
    });
  }, []);

  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setShowForm(true)
  };

  useEffect(() => {
    fetch('http://localhost:5000/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.log(error));
  }, []);


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
    setShowForm(false); // Hide the form after submitting it

    setSelectedEvent(null); // Clear the selectedEvent state to hide the update form

  };


  return (

    <div>
     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Link
    className="inline-flex gap-1 bg-primary text-white py-1 px-4 rounded-full ml-auto"
    to={'/eventsform'}
    style={{ borderRadius: '999px', fontSize: '0.7rem', padding: '0.5rem' }}
    >
    <svg xmlns="http://www.w3.org/2000/svg" width={10} viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
    Add new event
  </Link>
</div>

    {/* Render the error message if it exists */}
    {errorMessage && (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    )}
  
    <div className="card-container">
      {events.map((event) => (
        <div key={event._id} className="card-rectangular">
          <div className="card-rectangular-image">
            <img src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`} alt={event.name} />
          </div>
          <div className="card-rectangular-content">
            <h5 className="card-title">
              <Link to={`/eventsdetail/${event._id}`}>{event.name}</Link>
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">{event.startDate}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{event.endDate}</h6>
            <p className="card-text">{event.description}</p>
            <p className="card-text">{event.location}</p>
            <div className="card-rectangular-buttons">
              <button className="btn btn-pastel-warning btn-sm" onClick={() => handleUpdate(event)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="btn btn-pastel-danger btn-sm" onClick={() => handleDelete(event._id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button className="btn btn-pastel-info btn-sm" onClick={() => reportEvent(event._id)}>
                <FontAwesomeIcon icon={faFlag} />
              </button>
              {event.participants.includes(localStorage.getItem('userId')) ? (
                <button className="btn btn-pastel-success btn-sm" onClick={() => unparticipateEvent(event._id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              ) : (
                <button className="btn btn-pastel-primary btn-sm" onClick={() => participateEvent(event._id)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {selectedEvent && <UpdateEventForm event={selectedEvent} onSubmit={updateEvent} onEventUpdate={handleEventUpdate} />}
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






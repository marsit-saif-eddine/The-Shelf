// import React, { useState } from 'react';

// const   UpdateEventForm = ({ event, onUpdate }) => {
//   const [name, setName] = useState(event.name);
//   const [description, setDescription] = useState(event.description);
//   const [startDate, setStartDate] = useState(event.startDate);
//   const [endDate, setEndDate] = useState(event.endDate);
//   const [location, setLocation] = useState(event.location);
//   const [image, setImage] = useState(event.image);



  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedEvent = { name, description, startDate, endDate, location,image };
//     onUpdate(event._id, updatedEvent);
//   };

//   return (

//     <form onSubmit={handleSubmit}>
//     <div className="form-group">
//       <label htmlFor="name">Name:</label>
//       <input type="text" className="form-control" id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} required />
//     </div>
    
//     <div className="form-group">
//       <label htmlFor="description">Description:</label>
//       <textarea className="form-control" id="description" name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
//       </div> 
//     <div className="form-group">
//       <label htmlFor="startDate">Start Date:</label>
//       <input type="date" className="form-control" id="startDate"name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
//     </div>
//     <div className="form-group">
//       <label htmlFor="endDate">End Date:</label>
//       <input type="date" className="form-control" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
//     </div>
//     <div className="form-group">
//       <label htmlFor="location">Location:</label>
//       <input type="text" className="form-control" id="location" name="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
//     </div>
//     <div className="form-group">
//       <label htmlFor="image">Image:</label>
//       <input
//   type="file"
//   className="form-control-file"
//   id="image"
//   name="image"
//   accept=".jpg, .jpeg, .png"
//   onChange={(e) => setImage(e.target.files)}
// />    </div>
//     <button type="submit" className="btn btn-primary">Submit</button>

//   </form>   

//   );
// };

// export default UpdateEventForm;
import React, { useState ,useEffect } from 'react';
import axios from 'axios';

const UpdateEventForm = ({ event, onEventUpdate }) => {
  console.log(event)
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [startDate, setStartDate] = useState(event.startDate);
  const [endDate, setEndDate] = useState(event.endDate);
  const [location, setLocation] = useState(event.location);
  const [image, setImage] = useState(event.image);
  const [errorMessage, setErrorMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const updatedEvent = { name, description, startDate, endDate, location,image};
  //     const res = await axios.put(`/events/update/${event._id}`, updatedEvent);
  //     onUpdate(res.data);
  //   } catch (error) {
  //     setErrorMessage(error.response.data.error);
  //   }
  // };
  const handleSubmit = async (e) => {
    console.log("submitting")
    e.preventDefault();
    try {
      await updateEvent(event._id, { name, description, startDate, endDate, location, image });
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

const fetchEvents = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/events`);
    if (response.status === 200) {
      const eventData = response.data;

      setEvents(eventData);
    } else {
      throw new Error('Failed to fetch events');
    }
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  }
};

  
const updateEvent = async (eventId, updatedEvent) => {
  try {
    console.log("here")
    const response = await axios.put(`http://localhost:5000/events/update/${eventId}`, updatedEvent, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const updatedEventData = response.data;
      onEventUpdate(response.data)

      setEvents(events.map(event => {
        if (event._id === updatedEventData._id) {
          return updatedEventData;
        } else {
          return event;
        }
      }));
      setSelectedEvent(null);
    } else {
      const errorMessage = response.data.message;
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(error);
    setErrorMessage(error.message);
  }
}



  
  
  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" className="form-control" id="name" name='name' value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea className="form-control" id="description" name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div> 

      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" className="form-control" id="startDate"name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input type="date" className="form-control" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input type="text" className="form-control" id="location" name="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>

      {/* <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
  type="file"
  className="form-control-file"
  id="image"
  name="image"
  accept=".jpg, .jpeg, .png"
  onChange={(e) => setImage(e.target.files)}
/>
      </div> */}

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>   
  );
};

export default UpdateEventForm;

// import React, { useState } from 'react';
// import axios from 'axios';

// function EventForm() {
//   const [name, setName] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [image, setImage] = useState(null);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('startDate', startDate);
//     formData.append('endDate', endDate);
//     formData.append('description', description);
//     formData.append('location', location);
//     formData.append('image', image);

//     fetch('http://localhost:5000/events/add', {
//       method: 'POST',
//       body: formData
//     })
//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.log(error));
//   }

//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   }

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <label>Name:</label>
//       <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} /><br />
//       <label>Start Date:</label>
//       <input type="date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} /><br />
//       <label>End Date:</label>
//       <input type="date" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} /><br />
//       <label>Description:</label>
//       <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} /><br />
//       <label>Location:</label>
//       <input type="text" name="location" value={location} onChange={e => setLocation(e.target.value)} /><br />
//       <label>Image:</label>
//       <input type="file" name="image" onChange={handleImageChange} /><br />
//       <input type="submit" value="Submit" />
//     </form>
//   );
// }

// export default EventForm;


import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '../Events/add.css'
import '../Events/new.css'




const NewEventForm = () => {
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [locationError, setLocationError] = useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError('');
  };
    const handleDescriptionChange = e => setDescription(e.target.value);
  const handleStartDateChange = (event) => {
    const formattedDate = format(new Date(event.target.value), 'yyyy-MM-dd');
    setStartDate(formattedDate);
  };
  
  const handleEndDateChange = (event) => {
    const formattedDate = format(new Date(event.target.value), 'yyyy-MM-dd');
    setEndDate(formattedDate);
  };
  // const handleStartDateChange = e => setStartDate(e.target.value).toLocaleDateString('en-US');
  // const handleEndDateChange = e => setEndDate(e.target.value).toLocaleDateString('en-US');
  const handleLocationChange = e => setLocation(e.target.value);
  const handleImageChange = e => setImage(e.target.files[0]);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);



//   //   const handleSubmit = e => {
//   //     e.preventDefault();
//   //     const formData = new FormData();
//   //     formData.append('name', name);
//   //     formData.append('description', description);
//   //     formData.append('startDate', startDate);
//   //     formData.append('endDate', endDate);
//   //     formData.append('location', location);
//   //     formData.append('image', image);
//   //     axios.post('/events/add', formData)
//   //       .then(res => console.log(res))
//   //       .catch(err => console.log(err));
//   //   };

//   //   return (
//   //     <form onSubmit={handleSubmit}>
//   //       <div className="form-group">
//   //         <label htmlFor="name">Name:</label>
//   //         <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} required />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="description">Description:</label>
//   //         <textarea className="form-control" id="description" value={description} onChange={handleDescriptionChange}></textarea>
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="startDate">Start Date:</label>
//   //         <input type="date" className="form-control" id="startDate" value={startDate} onChange={handleStartDateChange} required />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="endDate">End Date:</label>
//   //         <input type="date" className="form-control" id="endDate" value={endDate} onChange={handleEndDateChange} required />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="location">Location:</label>
//   //         <input type="text" className="form-control" id="location" value={location} onChange={handleLocationChange} required />
//   //       </div>
//   //       <div className="form-group">
//   //         <label htmlFor="image">Image:</label>
//   //         <input type="file" className="form-control-file" id="image" accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
//   // </div>
//   // <button type="submit" className="btn btn-primary">Submit</button>

//   // </form>

//   // );
//   // };
const handleSubmit = (event) => {
  
  event.preventDefault();
     // validate inputs
     let errors = false;

     if (name.trim() === "") {
      window.alert("Name is required");
      setNameError("Name is required");
      return;
    }
  const formData = new FormData();
  formData.append('name', name);
  formData.append('startDate', startDate);
  formData.append('endDate', endDate);
  formData.append('description', description);
  formData.append('location', location);
  formData.append('image', image);
 
  fetch('http://localhost:5000/events/add', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      navigate('/pages/profile');
    })
    .catch(error => console.log(error));
}

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const formData = new FormData();
//   formData.append('name', name);
//   formData.append('startDate', startDate);
//   formData.append('endDate', endDate);
//   formData.append('description', description);
//   formData.append('location', location);
//   formData.append('image', image);
//   setSubmitted(true);
 

//   fetch('http://localhost:5000/events/add', {
//     method: 'POST',
//     body: formData
    
//   })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
//     if (submitted) {
//       navigate('/eventcards');
//     }
// }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const event = { name, description, startDate, endDate, location, image };
  //   const res = await axios.post('/events/add', event);
  //   setSubmitted(true);
  //   console.log(res.data);
  //   console.log(event.image)
  // }; 
  // if (submitted) {
  //   navigate('/eventcards');
  // }

  return (
    <div className="container">
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-wrapper">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} required />
        {nameError && <div className="error">{nameError}</div>}

      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea className="form-control" id="description" value={description} onChange={handleDescriptionChange}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" className="form-control" id="startDate" value={startDate} onChange={handleStartDateChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input type="date" className="form-control" id="endDate" value={endDate} onChange={handleEndDateChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input type="text" className="form-control" id="location" value={location} onChange={handleLocationChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input type="file" name="image" onChange={handleImageChange} /><br />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>

    </form>
    </div>
  );
};

export default NewEventForm;
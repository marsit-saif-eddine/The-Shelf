

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart, Edit, Trash2 } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, CardHeader, CardTitle,CardImg } from 'reactstrap'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { isUserLoggedIn } from '@utils';
import toast from 'react-hot-toast';
import './booksStyle.scss'

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
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this book',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve it it!',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
      axios.delete(`http://localhost:5000/book/${_id}`)
      .then(response => {
        toast.success('Your book has been deleted!')
          // Remove the deleted event from the list of events
      setBooks(books.filter(book => book._id !== _id));
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
  });
      // Remove the deleted event from the list of events
      //setEvents(events.filter(event => event._id !== _id));

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

  
  //isOwner*********************
  const isTheOwner=() => {
    if(id === userData._id) {
        return true
    }
  }
  const renderPosts = () => {
    return books.length > 0 ? books.map(item => {
      return (

        <>
        <article className="card" key={item.id}>
          <div className="card__info-hover">
            <svg className="card__like"  viewBox="0 0 24 24">
            <path fill="#000000" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
            </svg>
              <div className="card__clock-info">
                <span className="card__time">
                <Link to={`/bookdetail/${item._id}`} className="card_link">View details</Link>
                </span>
              </div>
            
          </div>
          <div className="card__img"></div>
          <Link to={`/bookdetail/${item._id}`} className="card_link">
            <div className="card__img--hover" style={{backgroundImage:`url('${item.image ? item.image : 'http://localhost:3000/image/cover_book.png'}')`}}></div>
          </Link>
          {isTheOwner &&  (
                              <div className="card__actions">
                              <Link to={`/addbook/${item._id}`}>
                                <Button color='primary'className='btn-cart move-cart' >
                                <Edit
                                  className={classnames('me-50', {
                                    'text-danger': item.isInWishlist
                                  })}
                                  size={14}
                                />
                                <span>Edit</span>
                                
                                  </Button>
                              </Link>
                                <Button color='danger'className='btn-cart move-cart' onClick={()=>handleDelete(item._id)}>
                                <Trash2
                                color='white'
                                  className={classnames('me-50',
                                    'text-danger'
                               )}
                                  size={14}
                                />
                                <span>Delete</span>
                                
                                  </Button>
                              </div>
                              )}
          
          <div className="card__info">
            <h3 className="card__title">{item.name}</h3>
            <span className="card__by">by <a href="#" className="card__author" title="author">{item.author}</a></span>
            <div className="card__description">{item.description}
            
                              </div>  
          </div>
        </article>  

         
          </>



        // <Card key={item.id} style={{ width: "28rem" }} className="w-100" border="secondary">
        //       <CardHeader>
                
        //           <CardImg
        //           variant="top"
        //           src={item.image}
        //           alt={item.name}
        //           height={200}
        //         />
        //         </CardHeader>
        //         <CardBody>
        //         <CardText>  <Link className='text-body' to={`/bookdetail/${item._id}`}>
        //                 {item.name} </Link> </CardText>  
                
                
        //         <CardText>   {' By '}
        //                           <a className='company-name' onClick={e => e.preventDefault()}>
        //                             {item.author}
        //                           </a>
        //                         </CardText> 
                
                
        //         <CardText> {item.description}</CardText>
                
                
        //         <CardText>  {(item.price && item.price!=="0")  && <h4 className='item-price'>${item.price}</h4>}</CardText>
                
        //         <Button
        //                         className='btn-wishlist'
        //                         color='light'
        //                         onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
        //                       >
        //                         <Heart
        //                           className={classnames('me-50', {
        //                             'text-danger': item.isInWishlist
        //                           })}
        //                           size={14}
        //                         />
        //                         <span>Wishlist</span>
        //                       </Button>
                
        //                       <Link to={`/bookdetail/${item._id}`}>
        //                         <Button color='primary'className='btn-cart move-cart' >
        //                         View Details</Button>
        //                       </Link>
                
        //         </CardBody>
        // </Card>
        

      )
    }) : <>There is no books to show</>;
  }
  return <div className='books_page'> <div className='grid-view'>{renderPosts()}</div> </div>
}
export default ProfileBooks


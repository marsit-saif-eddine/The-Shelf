import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../Events/StarRating';
import ReviewForm from '../Events/ReviewForm';
import './detailcard.css';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Card, CardTitle, CardBody, CardText, Badge, Button } from 'reactstrap'
import { Cookies } from 'react-cookie';




const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const user = useSelector(state => state.user);

    const fetchEvent = async () => {
        let Event = await axios.get(`http://localhost:5000/events/detail/${id}`)
        setEvent(Event.data);
    };

    const [isParticipating, setIsParticipating] = useState(false);

    const handleParticipate = async () => {
      try {
        await axios.post(`/events/${id}/participants`, {}, {
          headers: { Authorization: `Bearer ${Cookies.accessToken}` },
        });
        setIsParticipating(true);
      } catch (error) {
        console.error(error);
        // handle error here
      }
    };
    
    const handleUnparticipate = async () => {
      try {
        await axios.delete(`/events/${id}/participants`, {
          headers: { Authorization: `Bearer ${Cookies.accessToken}` },
        });
        setIsParticipating(false);
      } catch (error) {
        console.error(error);
        // handle error here
      }
    };
    const handleAddToFavorites = async () => {
        try {
          if (user && user.token) {
            await axios.post('http://localhost:5000/events/favorite',{id}, { headers: { Authorization: `Bearer ${user.token}` } });
            setIsFavorite(true);
            console.log(user.tokens)
          } else {
            console.log('User token is missing');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/events/${id}/reviews`);
            console.log('Response from server:', response);
            setReviews(response.data.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchEvent();
            fetchReviews();
        }
    }, [id]);

    const handleReviewSubmit = async (comment, rating) => {
        try {
            const response = await axios.post(`/events/${id}/reviews`, {
                comment,
                rating,
            });
            setReviews([...reviews, response.data]);
        } catch (error) {
            console.error(error);
        }
    };
    const handleReviewDelete = async (reviewId) => {
        await axios.delete(`/events/${id}/reviews/${reviewId}`);
        setReviews(reviews.filter((review) => review._id !== reviewId));
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    return (


//*********************** */

<Card className='card-app-design'>
<img
      className="event-card-img"
      src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`}
      alt={event.name}
      style={{ borderRadius: "10px" }}
    />


      <CardBody>
        
        <Badge color='light-primary'>{event?.startDate ? format(new Date(event.startDate), "dd MMM yyyy") : ""}  TO   {event?.endDate ? format(new Date(event.endDate), "dd MMM yyyy") : ""}
</Badge>
       
        <CardText className='font-small-2 mb-2'>
        {event.name}
        </CardText>
        <div className='design-group mb-2 pt-50'>
          <h6 className='section-label'>{event.location}</h6>
        
          <Badge color='light-primary'>{event.description}</Badge>
        </div>
        <div className='design-group pt-25'>
          <h6 className='section-label'>
          <h2 className="event-card-review-text">Reviews</h2>
          {reviews && reviews.length > 0 ? (
  <ul className="event-card-review-text">
    {reviews.map((review) => (
      <li className="event-card-review" key={review._id}>
        <p className="event-card-review-text">{review.comment}</p>
        <StarRating rating={review.rating} />
      </li>
    ))}
  </ul>
) : (
  <p className="event-card-reviews-text">No reviews yet.</p>
)}
  
       <ReviewForm className="event-card-review-form" onReviewSubmit={handleReviewSubmit} />
          </h6>
          
      
          {/* {avatarArr.map((obj, index) => {
            return <Avatar key={index} className={classnames({ 'me-75': index !== avatarArr.length - 1 })} {...obj} />
          })}
        </div> */}
      
        </div>
      </CardBody>
    </Card>



    )

//end**************///

// <div className="event-card">
//   <div className="event-card-header">
//     <img
//       className="event-card-img"
      
//       src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`}
//       alt={event.name}
//       style={{ borderRadius: "10px" }}
//     />

//     <h5 className="event-card-title">{event.name}</h5>
//     <h6 className="event-card-subtitle">
//       {event?.startDate ? format(new Date(event.startDate), "dd MMM yyyy") : ""}  TO   {event?.endDate ? format(new Date(event.endDate), "dd MMM yyyy") : ""}

//     </h6>
//   </div>
//   <div className="event-card-body">
//     <div className="row">
//       {/* {isFavorite ? (
//           <button disabled>Already in favorites</button>
//         ) : (
//           <button onClick={handleAddToFavorites}>Add to favorites</button>
//         )} */}
//       <div className="col-6">

   
//         <h6 className="event-card-text">{event.location}</h6>

//         <p className="event-card-text">{event.description}</p>
//       </div>
//       <div className="col-6">
//         <h2 className="event-card-reviews-title">Reviews</h2>
//         {reviews.length === 0 ? (
//           <p className="event-card-reviews-text">No reviews yet.</p>
//         ) : (
//           <ul className="event-card-reviews-list">
//             {reviews.map((review) => (
//               <li className="event-card-review" key={review._id}>
//                 <p className="event-card-review-text">{review.comment}</p>
//                 <StarRating rating={review.rating} />
//               </li>
//             ))}
//           </ul>
//         )}
//         <div></div>
//         <ReviewForm className="event-card-review-form" onReviewSubmit={handleReviewSubmit} />
     
     
     
//       </div>
//     </div>
//   </div>
// </div>

//     );
};

export default EventDetail;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from '../Events/StarRating';
import ReviewForm from '../Events/ReviewForm';
import './detailcard.css';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Card, CardTitle, CardBody, CardText, Badge, Button } from 'reactstrap'
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { Fragment } from 'react'
import { isUserLoggedIn } from '@utils'
import '../books/booksStyle.scss'

// ** Third Party Components
import axios from 'axios'
import {
  Share2,
  GitHub,
  Gitlab,
  Twitter,
  Bookmark,
  Facebook,
  Linkedin,
  CornerUpLeft,
  MessageSquare
} from 'react-feather'

// ** Utils
import { kFormatter } from '@utils'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  CardImg,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/base/pages/page-blog.scss'

// ** Images


const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useSelector(state => state.user);

  const [userData, setUserData] = useState(null)

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
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')));
    }
  }, []);

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
        await axios.post('http://localhost:5000/events/favorite', { id }, { headers: { Authorization: `Bearer ${user.token}` } });
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
  function calculateStarRating(reviews) {
    if (reviews.length === 0) {
      return '';
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const roundedRating = Math.round(averageRating);
    const starChar = '★';
    const emptyStarChar = '☆';

    let ratingString = '';

    for (let i = 0; i < roundedRating; i++) {
      ratingString += starChar;
    }

    for (let i = 0; i < 5 - roundedRating; i++) {
      ratingString += emptyStarChar;
    }

    return <span className="star-rating">{ratingString}</span>;

  }

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


    <Fragment>
      <div className='blog-wrapper'>
        <div className='content-detached content-left'>
          <div className='content-body'>

            <Row>
              <Col sm='12'>
                <Card className='mb-3'>
                  <CardImg
                    className="event-card-img"
                    src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`}
                    alt={event.name}
                    style={{ borderRadius: "10px", width: "100%", height: "250px" }}
                  />

                  <CardBody>
                    <CardTitle tag='h4'>{event.name}

                    </CardTitle>

                    {calculateStarRating(reviews)}
                    <div className='d-flex'>


                      <div>
                        <small className='text-muted me-25'>at</small>
                        <small>
                          <a className='text-body' href='/' onClick={e => e.preventDefault()}>
                            {event.location}
                          </a>
                        </small>


                        <span className='text-muted ms-50 me-25'>|</span>
                        <small className='text-muted'>{event?.startDate ? format(new Date(event.startDate), "dd MMM yyyy") : ""} </small>

                        <small className='text-muted'>{event?.endDate ? format(new Date(event.endDate), "dd MMM yyyy") : ""}</small>

                      </div>


                    </div>

                    <div className='my-1 py-25'></div>

                    <div className='d-flex'>
                      <div>
                      </div>
                      <div>
                        <CardText className='mb-0'>
                          {event.description}
                        </CardText>
                      </div>
                    </div>
                    <hr className='my-2' />
                    <div className='d-flex align-items-center justify-content-between'>
                      <div className='d-flex align-items-center'>
                        <div className='d-flex align-items-center me-1'>
                          <a className='me-50' href='/' onClick={e => e.preventDefault()}>
                          </a>
                          <a href='/' onClick={e => e.preventDefault()}>
                          </a>
                        </div>
                        <div className='d-flex align-items-cente'>
                          <a className='me-50' href='/' onClick={e => e.preventDefault()}>
                          </a>
                          <a href='/' onClick={e => e.preventDefault()}>
                          </a>
                        </div>
                      </div>

                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col sm='12' id='blogComment'>
                <h6 className='section-label'>Comment</h6>
              </Col>
              <Col sm='12'>
                <h6 className='section-label'>Leave a Comment</h6>
                <Card>
                  <CardBody>
                    <Form className='form' onSubmit={e => e.preventDefault()}>
                      <Row>


                      </Row>
                    </Form>


                    {reviews.length === 0 ? (
                      <p className="event-card-reviews-text">No reviews yet.</p>
                    ) : (
                      <ul className="event-card-reviews-list">
                        {reviews.map((review) => (
                          <li className="event-card-review" key={review._id}>
                            <StarRating rating={review.rating} />

                            <p className="event-card-review-text">{review.comment}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div></div>
                    <ReviewForm className="event-card-review-form" onReviewSubmit={handleReviewSubmit} />
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </div>
        </div>
      </div>
  

        {userData && event.owner == userData._id && (
    <div className="voice-button modalSearchVoice"> <button id="speech"
    className='btn m-left type2 '
  >
          <Link to="/apps/homepage" className="button">
            <BsFillCameraVideoFill style={{color:"white",width:"30px"}}
            />
            
          </Link>
        
      </button></div>)}
    </Fragment>
  )
}
export default EventDetail;


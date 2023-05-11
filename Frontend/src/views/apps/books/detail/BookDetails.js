// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import './SingleBook.scss'
// ** Third Party Components
import axios from "axios";
import classnames from 'classnames'
import { Star, ShoppingCart, DollarSign, Heart, Share2, Facebook, Twitter, Youtube, Instagram, Award } from 'react-feather'
import QuizByBook from '../../quiz/quizByBook'
import './book_detail.scss'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  CardText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

const BookDetails = props => {
  // ** Props
  const { data, deleteWishlistItem, dispatch, addToWishlist, getProduct, productId, addToCart } = props

  // ** State
  const [selectedColor, setSelectedColor] = useState('primary')

  // ** Renders color options


  // ** Handle Wishlist item toggle
  const handleWishlist = val => {
    if (val) {
      dispatch(deleteWishlistItem(productId))
    } else {
      dispatch(addToWishlist(productId))
    }
    dispatch(getProduct(productId))
  }

  const CheckForSale = (forSale) => {
    let saleStatus ;
    forSale === true ?
    saleStatus = 'For Sale' :  saleStatus = 'For Rent'
    return (<div href="#">
            <div class="badges">
                <p>{saleStatus}</p>
            </div>
    </div>)
  }

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getProduct(productId))
  }

 ///////////quiz work //////
 const [showSection, setShowSection] = useState(false);

 const handleButtonClick = () => {
   setShowSection(true);
 }
 const [book, setBook] = useState();
 const [relatedBook, setRelatedBook] = useState();
 const fetchHandler = async () => {
    await data.name ; 
     return await axios.get(`http://localhost:5000/books_name`, { params: { name: data.name }}).then((res) => res.data.book);

     
 };
// ** ComponentDidMount : Get product
useEffect(() => {
  //  fetchHandler().then((data) => {
  //      //console.log('this is data', data)
  //      setRelatedBook(data);
  //      console.log('datttta for salees',data);
  //  }
  //  );
}, [])
  return (
    <Row className='my-2'>
      {console.log("dtaaaa", data)}
      {data && (
          <>
            <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
              <div className='d-flex align-items-center justify-content-center'>
                <img className='img-fluid product-img' src={data.image} alt={data.name} />
              </div>
            </Col> 
            <Col md='5' xs='12'>
              <div className='book-wrapper'>
              <CardText tag='h2'>{data.name} </CardText>
              <CardText tag='div' className='item-company'>
                By
                <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                  {` ${data.author}`}
                </a>
              </CardText>
              <CardText tag='div' className='item-company'>
                Owner
                <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                <Link className='text-body' to={`/pages/profile/${data.owner_Id}`}>
                {` ${data.owner}`}
                </Link>
                </a>
              </CardText>
              <CardText>
                {data.available  ? <h5 className='text-success ms-25'>Available</h5> : <h5 className='text-danger ms-25'>Not Available</h5>}
              </CardText>
              </div>
   
              <CardText>{data.description}</CardText>
              <br/>
              <hr />
              <br/>
              <CardText>
                <div className='item-wrapper'>
                  <div className='item-cost'>
                    {(data.price && data.price!=="0")  && <h4 className='item-price'>{'Price: '} {data.price} {""} DT</h4>}
                  </div>
                </div>
               </CardText>
              <br/>

              <div className='d-flex flex-column flex-sm-row pt-1'>
                { /*               <Button
                    className='btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0'
                    color='secondary'
                    outline
                    onClick={() => handleWishlist(data.isInWishlist)}
                >
                  <Heart
                      size={14}
                      className={classnames('me-50', {
                        'text-danger': data.isInWishlist
                      })}
                  />
                  <span>Wishlist</span>
                    </Button> */}
                     <Link to={`/pages/profile/${data.owner_Id}`}>
                <Button
                    color='primary'
                    className='btn-cart move-cart'
                    /*eslint-enable */
                >
                  <ShoppingCart className='me-50' size={14} />
                  <span>Contact The Owner</span>
                </Button>
                </Link>
{ /*               <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
                  <DropdownToggle className='btn-icon hide-arrow' color='secondary' caret outline>
                    <Share2 size={14} />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                      <Facebook size={14} />
                    </DropdownItem>
                    <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                      <Twitter size={14} />
                    </DropdownItem>
                    <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                      <Youtube size={14} />
                    </DropdownItem>
                    <DropdownItem tag='a' href='/' onClick={e => e.preventDefault()}>
                      <Instagram size={14} />
                    </DropdownItem>
                  </DropdownMenu>
                  </UncontrolledButtonDropdown> */}
              </div>
            </Col>
            <Col md="2" className='book_detail'>
              { CheckForSale(data.for_sale)}
            </Col>

            <div className='item-features'>
            <Row className='text-center'>
                <Col className='mb-12 mb-md-0' md='12' xs='12'>
              <div className='w-75 mx-auto'>
                <Award  className='mt-3'/>
                <h4 className='mt-2 mb-1'>Test your knowledge</h4>
                <Button
                        color='info'
                        className='btn-cart move-cart'
                          onClick={handleButtonClick}>
                        
                      <span>View Quizzes</span>
                    
                    </Button>   
                  
          {showSection &&
            <div>
              <h2 className='mt-3'> here is all the quizzes related to this book !</h2>
              <QuizByBook/>
            </div>
          }
            </div>
            </Col>
            </Row>
            <Row>

            </Row>
        </div>

{/* 
        <div className='item-features'>
            <Row className='text-center'>
                <Col className='mb-12 mb-md-0' md='12' xs='12'>
              <div className='w-75 mx-auto'>
                <Award  className='mt-3'/>
                <h4 className='mt-2 mb-1'>Other Prices</h4>
              
   

              (res && item.for_sale === true) ? 
               
               {    authorBooks.map((item, index) => {
                return (
                  <article className="card" key={item.name}>
                  <div className="card__info-hover">
                    <svg class="card__like"  viewBox="0 0 24 24">
                    <path fill="#000000" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                    </svg>
                      <div class="card__clock-info">
                        <span class="card__time">
                        <Link to={`/bookdetail/${item._id}`} className="card_link">View details</Link>
                        </span>
                      </div>
                    
                  </div>
                  <div className="card__img"></div>
                  <Link to={`/bookdetail/${item._id}`} className="card_link">
                    <div className="card__img--hover" style={{backgroundImage:`url('${item.image ? item.image : 'http://localhost:3000/image/cover_book.png'}')`}}></div>
                  </Link>
                  <div className="card__info">
                    <h3 className="card__title">{item.name}</h3>
                    <span className="card__by">by <a href="#" className="card__author" title="author">{item.author}</a></span>
                    <div className="card__description">{item.description}</div>  
                  </div>
                  </article>  
                );
              })}

               
            </div>
            </Col>
            </Row>
            <Row>

            </Row>
        </div>

 */}

          </>
      )}

    </Row>
  )
}

export default BookDetails

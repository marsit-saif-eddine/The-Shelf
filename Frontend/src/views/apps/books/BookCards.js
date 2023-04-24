// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, CardHeader, CardTitle,CardImg } from 'reactstrap'

const BookCards = props => {
  // ** Props
  const {
    store,
    products,
    dispatch,
    addToCart,
    activeView,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem
  } = props

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getCartItems())
    dispatch(getProducts(store.params))
  }

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getProducts(store.params))
  }

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {

        return (
          <>
  
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

          {/* <Card style={{ width: "28rem" }} border="secondary" key={item.name}>
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
          </Card> */}
          </>
          
          
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default BookCards

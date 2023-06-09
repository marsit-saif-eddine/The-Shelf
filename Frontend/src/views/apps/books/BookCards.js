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

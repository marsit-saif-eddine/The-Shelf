// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

const BookCards = props => {
  // ** Props
  const {
    store,
    events,
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
          <Card className='ecommerce-card' key={item.name}>
            <div className='item-img text-center mx-auto'>
              <Link to={`/bookDetail/${item._id}`}>
                <img className='img-fluid card-img-top' src={item.image} alt={item.name} />
              </Link>
            </div>
            <CardBody>
              <div className='item-wrapper'>
                <div className='item-rating'>
                  <ul className='unstyled-list list-inline'>
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className='ratings-list-item me-25'>
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.rating,
                              'unfilled-star': index + 1 > item.rating
                            })}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>

              </div>
              <h6 className='item-name'>
                <Link className='text-body' to={`/bookdetail/${item._id}`}>
                  {item.name}
                </Link>
                <CardText tag='span' className='item-company'>
                  {' By '}
                  <a className='company-name' onClick={e => e.preventDefault()}>
                    {item.author}
                  </a>
                </CardText>
              </h6>
              <CardText className='item-description'>{item.description}</CardText>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>

                  {(item.price && item.price!=="0")  && <h4 className='item-price'>${item.price}</h4>}

                </div>
              </div>
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
              <Button
                color='primary'
                className='btn-cart move-cart'
                /*eslint-enable */
              >
                <ShoppingCart className='me-50' size={14} />
                <span>View Details</span>
              </Button>
            </div>
          </Card>
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

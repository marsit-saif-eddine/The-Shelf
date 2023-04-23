// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, DollarSign, Heart, Share2, Facebook, Twitter, Youtube, Instagram, Award } from 'react-feather'

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

const PostDetails = props => {
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

 

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getProduct(productId))
  }

 

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
            <Col md='7' xs='12'>
            <h4>{data.date}</h4>
              <CardText tag='span' className='item-company'>
                Owner
                <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                <Link className='text-body' to={`/pages/profile/${data.owner_Id}`}>
                {` ${data.owner}`}
                </Link>
                </a>
              </CardText>
              <br/><br/>

              <CardText tag='span' className='item-company'>
                <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                {` ${data.content}`}
                </a>
              </CardText>


              <div className='d-flex flex-column flex-sm-row pt-1'>
                <Button
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
                </Button>
                <Button
                    color='primary'
                    className='btn-cart move-cart'
                    /*eslint-enable */
                >
                  <ShoppingCart className='me-50' size={14} />
                  <span>Contact The Owner</span>
                </Button>

                <UncontrolledButtonDropdown className='dropdown-icon-wrapper btn-share'>
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
                </UncontrolledButtonDropdown>
              </div>
            </Col>
           
          </>
      )}

    </Row>
  )
}

export default PostDetails

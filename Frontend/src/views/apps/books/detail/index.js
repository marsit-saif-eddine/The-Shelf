// ** React Imports
import {useEffect, Fragment, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// ** Product detail components
import ItemFeatures from './ItemFeatures'
import BookDetails from './BookDetails'
import RelatedProducts from './RelatedProducts'
import axios from "axios";
// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'
import {
  BreadcrumbItem
} from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store'

import '@styles/base/pages/app-ecommerce-details.scss'
//const URL = "http://localhost:5000/book";
const Details = () => {
  // ** Vars
    const bookId = useParams().id
    //console.log('bookId', bookId)
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
    const [book, setBook] = useState();
    const fetchHandler = async () => {
        return await axios.get(`http://localhost:5000/book/${bookId}`).then((res) => res.data.book);
    };
  // ** ComponentDidMount : Get product
  useEffect(() => {
      fetchHandler().then((data) => {
          //console.log('this is data', data)
          setBook(data)
      });
  }, [])

  return (
    <Fragment>
    
      <BreadCrumbs title='Book Details' data={[{ title: book && book.name }]} />
      <div className='app-ecommerce-details'>
          <Card>
            <CardBody>
              <BookDetails
                dispatch={dispatch}
                addToCart={addToCart}
                productId={bookId}
                getProduct={getProduct}
                data={book}
                addToWishlist={addToWishlist}
                deleteWishlistItem={deleteWishlistItem}
              />
            </CardBody>
            <ItemFeatures />
            <CardBody>
                {/* !--RelatedProducts-- /*/}
            </CardBody>
          </Card>
      </div>
    </Fragment>
  )
}

export default Details

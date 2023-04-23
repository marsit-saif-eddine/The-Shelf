// ** React Imports
import {useEffect, Fragment, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// ** Product detail components
import ItemFeatures from './ItemFeatures'
import PostDetails from './PostDetails'
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

const Details = () => {
  // ** Vars
    const postId = useParams().id
   
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
    const [post, setPost] = useState();
    const fetchHandler = async () => {
        return await axios.get(`http://localhost:5000/post/${postId}`).then((res) => res.data);
    };
  // ** ComponentDidMount : Get product
  useEffect(() => {
      fetchHandler().then((data) => {
          setPost(data)
      });
  }, [])

  return (
    <Fragment>
    
      <BreadCrumbs title='Post Details' data={[{ title: post && post.content }]} />
      <div className='app-ecommerce-details'>
          <Card>
            <CardBody>
              <PostDetails
                dispatch={dispatch}
                addToCart={addToCart}
                productId={postId}
                getProduct={getProduct}
                data={post}
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

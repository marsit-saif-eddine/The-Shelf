// ** React Imports
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ** Third Party Components
import classnames from 'classnames'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Images
import profileImg from '@src/assets/images/portrait/small/avatar-s-7.jpg'

// ** Reactstrap Imports
import { UncontrolledButtonDropdown, DropdownMenu, Card, CardBody, CardText, CardImg,  Row,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown} from 'reactstrap'
  import { Book, UserPlus, UserCheck, UserX, Bookmark, ChevronDown, Share, Printer, FileText, BookOpen, MoreVertical, Trash2 } from 'react-feather'
  import { isUserLoggedIn } from '@utils';
  import Swal from 'sweetalert2';
  import toast from 'react-hot-toast';
const PostCards = props => {
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

  const [errorMessage, setErrorMessage] = useState(null);

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

  //isOwner*********************
  const isTheOwner=() => {
    if(id === userData._id) {
        return true
    }
  }
// handele delete post
const handleDelete = async (_id) => {
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this post',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
    axios.delete(`http://localhost:5000/post/${_id}`)
    .then(response => {
      toast.success('Your post has been deleted!')
        // Remove the deleted event from the list of events
        //setProducts(books.filter(book => book._id !== _id));
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
    setErrorMessage('Failed to delete post.');

    // Implement logic to show an error message
  }
};

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      console.log('posteq', products)
      return products.map(item => {
        return (
          <>
          <Card className='card-apply-job'>

          <CardBody>
            <div className='d-flex justify-content-between align-items-center mb-1'>
              <div className='d-flex align-items-center'>
                <Avatar className='me-1' img={profileImg} imgHeight='42' imgWidth='42' />
                <div>
                  <h6 className='mb-0'>
                  <Link className='text-body' to={`/pages/profile/${item.owner_Id}`}>
                   {` ${item.owner}`}
                 </Link>
                  </h6>
                </div>
              </div>
              {isTheOwner &&  (
              <UncontrolledDropdown>
                  <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                    className='w-100'
                    >
                      <Link
                    to={`/addpost/${item._id}`}
                    className='w-100'
                  > 
                    <FileText size={14} className='me-50' />
                    <span className='align-middle'>Edit</span>
                      </Link> 
                    </DropdownItem>
                    <DropdownItem
                      tag='a'
                      className='w-100'
                      onClick={e => {
                        e.preventDefault();
                        handleDelete(item._id)
                      }}
                    >
                      <Trash2 size={14} className='me-50' />
                      <span className='align-middle'>Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                )}
            </div>
           
            <CardText className='mb-2'> {item.content} </CardText>
       {item.image &&(
        
        <CardImg
        variant="top"
        src={item.image}
        alt={item.name}
        height={400}
     />
       )}
          
          </CardBody>
        </Card>
          
          
          
          </>
          

 
          // <Card style={{ width: "28rem" }} border="secondary" key={item.name}>
          //     <CardHeader>
                
          //         <CardImg
          //         variant="top"
          //         src={item.image}
          //         alt={item.name}
          //         height={200}
          //       />
          //       </CardHeader>

          //       <CardBody>
          //       <CardText tag='span' className='item-company'>
          //       Owner
          //       <a className='company-name' href='/' onClick={e => e.preventDefault()}>
          //       <Link className='text-body' to={`/pages/profile/${item.owner_Id}`}>
          //       {` ${item.owner}`}
          //       </Link>
          //       </a>
          //     </CardText>
          //     <CardText> {item.date}  </CardText>  

          //       <CardText>  <Link className='text-body' to={`/postdetail/${item._id}`}>
          //               {item.content} </Link> </CardText>  
                       
               
          //       <Button
          //                       className='btn-wishlist'
          //                       color='light'
          //                       onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
          //                     >
          //                       <Heart
          //                         className={classnames('me-50', {
          //                           'text-danger': item.isInWishlist
          //                         })}
          //                         size={14}
          //                       />
          //                       <span>Wishlist</span>
          //                     </Button>
                
          //       </CardBody>
          // </Card>
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

export default PostCards
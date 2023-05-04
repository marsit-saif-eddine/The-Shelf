// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Posts'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
const URL = "http://localhost:5000/post/accepted_posts";

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from './store'

// ** Styles
import '../../../@core/scss/react/apps/app-ecommerce.scss'
import './postes.scss'
import axios from "axios";

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
    const [posts, setPosts] = useState();
    const fetchHandler = async () => {
        return await axios.get(URL).then((res) => res.data);
    };

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.products)

  // ** Get products
  useEffect(() => {
      fetchHandler().then((data) => setPosts(data));
  }, [])

  return (
    <div className="posteList">
      <Products
        store={store}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        posts={posts}
        setPosts={setPosts}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
       <div class="buy-now"><Link to={`/addpost`}  class="btn " style={{backgroundColor:'#ff9f43',color:'white'}}>Add New post</Link></div>
    
    </div>
    
  )
}
export default Shop
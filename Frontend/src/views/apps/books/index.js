// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Books'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
const URL = "http://localhost:5000/book/books";

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from './store'

// ** Styles
import '../../../@core/scss/react/apps/app-ecommerce.scss'
import axios from "axios";

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
    const [books, setBooks] = useState();
    const fetchHandler = async () => {
        return await axios.get(URL).then((res) => res.data);
    };

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get products
  useEffect(() => {
      fetchHandler().then((data) => setBooks(data.books));
  }, [])

  return (
    <Fragment>
      <Products
        store={store}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        books={books}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
    </Fragment>
  )
}
export default Shop

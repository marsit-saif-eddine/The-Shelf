// ** React Imports
import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Books'
// import Genre from './Genre'
// import Search from './Search'
// import Sort from './Sort'
// import Pagination from './Bookspagination'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
const URL = "http://localhost:5000/book/accepted_books";

import { Mic} from 'react-feather'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from './store'
// ** Styles
import '../../../@core/scss/react/apps/app-ecommerce.scss'
import './booksStyle.scss'
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap'

import { useVoice } from "./voiceSearch/useVoice";
//import Mic from "./voiceSearch/microphone-black-shape.svg";
import { useBookFetch } from "./voiceSearch/useBookFetch";

import { isUserLoggedIn } from '@utils'



const Shop = () => {
  // ** States
  // const [filterGenre, setFilterGenre] = useState([]);
	// const [sort, setSort] = useState({ sort: "rating", order: "desc" });
	// const [page, setPage] = useState(1);
	// const [search, setSearch] = useState("");

const [genre, setGenre] = useState({});

  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [books, setBooks] = useState();
  const [centeredModal, setCenteredModal] = useState(false)


  const { text, isListening, listen, voiceSupported } = useVoice();
  const { authorBooks, isFetchingBooks, fetchBooksByAuthor, fetchResponse } = useBookFetch();


    const fetchHandler = async () => {
        return await axios.get(URL).then((res) => res.data);
    };


  //   useEffect(() => {
  //     const getUserBooksFilter = async params => {
  //      const response = await axios.get('http://localhost:5000/book/user_filter_books', 
  //       {
  //         params: {
  //         q: params.q,
  //         sortColumn: params.sortColumn,
  //         sort: params.sort,
  //         page: params.page,
  //         perPage: params.perPage,
  //         genre: params.genre
   
  //       }})
  //       return {
  //         params,
  //         data: response.data.books,
  //         totalPages: response.data.total
          
  //       }}
  //   getUserBooksFilter();
  // });



  // ** Vars
  
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // ** Get products
  useEffect(() => {
      fetchHandler().then((data) => setBooks(data));
  }, [])


  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(`http://localhost:5000/book/books_genre`, { params: { genre: genre } });
      setBooks(response.data);
    };
    fetchBooks();
    getrecommendations()
  }, [genre]);

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };
  const [userData, setUserData] = useState(localStorage.getItem('userData'))
  const [recom, setrecomm] = useState(localStorage.getItem('userData'))

  //** ComponentDidMount


  async function getrecommendations() {
    try {
      if (userData){
        const response = await axios.get(`https://4397-41-62-156-252.ngrok-free.app/recommend?user_id=`+userData._id);
        console.log(response)
        const data = response.data;
        setrecomm(data);
      }
    
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])


  

  useEffect(() => {
    if (text !== "") {
      fetchBooksByAuthor(text);
    }
  }, [text]);

  if (!voiceSupported) {
    return (
      <div className="app">
        <h1>
          Voice recognition is not supported by your browser, please re-try with
          a supported browser
        </h1>
      </div>
    );
  }


const switchModalState = () => setCenteredModal(!centeredModal) 

const affRes = (authorBooks) => {
  if(!authorBooks.length) {
    
  return (
    <>
    {text && <div>{fetchResponse} {text}</div> }
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
      </>
      )
  } else {
    // switchModalState
    return (
      <>
          <div>{fetchResponse} {text}</div>
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
      </>
    )
  }

}

  return (
 
   <div className='books_page'>
<>
    {/* <Button color='primary' outline onClick={() => setCenteredModal(!centeredModal)}>
        voice Search
    </Button> */}

<div>
{/* <UncontrolledButtonDropdown>
      <DropdownToggle color='primary' caret>
      Genre
      </DropdownToggle> */}


        {/* <select value={genre} onChange={handleGenreChange}>
          <option value="">All</option>
          <option value='Action'>Action</option>
          <option value='Romance'>Romance</option>
          <option value='Fantasy'>Fantasy</option>
          <option value='Drama'>Drama</option>
          <option value='Crime'>Crime</option>
          <option value='Adventure'>Adventure</option>
          <option value='Thriller'>Thriller</option>
          <option value='Sci-fi'>Sci-fi</option>
          <option value='Music'>Music</option>
          <option value='Family'>Family</option>            
          <option value="Fiction">Fiction</option>
          <option value="Nonfiction">Nonfiction</option>
        </select>  */}

       {/* <DropdownMenu value= " " > 
           All */}
      
        {/* <DropdownItem>
        <option value="">All</option> */}
        {/* <option value="">All</option> */}
        {/* </DropdownItem> */}
        {/* <DropdownItem>
        <option value='Action'>Action</option> */}
        {/* <option value='Action'>Action</option> */}
        {/* </DropdownItem>
        <DropdownItem  value='Romance'>
          Romance */}
        {/* <option value='Romance'>Romance</option> */}
        {/* </DropdownItem> */}
        {/* </select> */}
      {/* </DropdownMenu>
    </UncontrolledButtonDropdown>  */}

{/* 
      <label>
        Genre:
        <select value={genre} onChange={handleGenreChange}>
          <option value="">All</option>
          <option value='Action'>Action</option>
          <option value='Romance'>Romance</option>
          <option value='Fantasy'>Fantasy</option>
          <option value='Drama'>Drama</option>
          <option value='Crime'>Crime</option>
          <option value='Adventure'>Adventure</option>
          <option value='Thriller'>Thriller</option>
          <option value='Sci-fi'>Sci-fi</option>
          <option value='Music'>Music</option>
          <option value='Family'>Family</option>            
          <option value="Fiction">Fiction</option>
          <option value="Nonfiction">Nonfiction</option>
        </select>
      </label>  */}

     {/* <button onClick={handleClearClick}>Clear</button> */}
    </div>



    <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-dialog-centered'>
              <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Search books by name</ModalHeader>
              <ModalBody className="modalSearchVoice">
                  <button id="speech" 
                   className='btn m-left type2 '
                   onClick={listen}
                  >
                  <div className={`pulse-ring ${isListening && "isListening"}`}></div>
                  <Mic size={20}/>
                  </button>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
                  Accept
                </Button>{' '}
              </ModalFooter>
    </Modal>
    {affRes(authorBooks)}
  
</>

<div className="voice-button modalSearchVoice"> <button id="speech" 
                   className='btn m-left type2 '
                   onClick={listen}
                  >
                  <div className={`pulse-ring ${isListening && "isListening"}`}></div>
                  <Mic size={25}/>
                  </button></div>

      <div className="buy-now"><Link to={`/addbook`} style={{backgroundColor:'#ff9f43',color:'white'}} class="btn ">Add Book</Link></div>
    </div>
  
  )
}
export default Shop
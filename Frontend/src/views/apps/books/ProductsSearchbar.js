// ** Icons Imports
import { Search } from 'react-feather'
import React, { useEffect } from 'react'
import {getData } from './store/index'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = props => {
  // ** Props
 // const { dispatch, getProducts, store } = props

  const dispatch = useDispatch()
  const store = useSelector(state => state.books)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [genre, setGenre] = useState({ value: '', label: 'Select ' })
  


  useEffect(() => {
    dispatch(getAllData());
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        genre: params.genre
      }
      )
    )

  }, [dispatch, store.data.length, sort, sortColumn, currentPage, change, store.data])



  // useEffect(() => {
  //       const getUserBooksFilter = async params => {
  //        const response = await axios.get('http://localhost:5000/book/user_filter_books', 
  //         {
  //           params: {
  //           q: params.q,
  //           sortColumn: params.sortColumn,
  //           sort: params.sort,
  //           page: params.page,
  //           perPage: params.perPage,
  //           genre: params.genre
     
  //         }})
  //         return {
  //           params,
  //           data: response.data.books,
  //           totalPages: response.data.total
            
  //         }}
  //     getUserBooksFilter();
  //   });

  return (
    <div id='ecommerce-searchbar' className='ecommerce-searchbar'>
      <Row className='mt-1'>
        <Col sm='12'>
          <InputGroup className='input-group-merge'>
            <Input
              className='search-product'
              placeholder='Search Product'
              onChange={e => dispatch(getUserBooksFilter({ ...store.params, q: e.target.value }))}
            />
            <InputGroupText>
              <Search className='text-muted' size={14} />
            </InputGroupText>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsSearchbar

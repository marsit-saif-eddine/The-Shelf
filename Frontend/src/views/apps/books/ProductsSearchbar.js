// ** Icons Imports
import { Search } from 'react-feather'
import React, { useEffect } from 'react'
import axios from "axios";

// ** Reactstrap Imports
import { Row, Col, InputGroup, Input, InputGroupText } from 'reactstrap'

const ProductsSearchbar = props => {
  // ** Props
  const { dispatch, getProducts, store } = props

  useEffect(() => {
        const getUserBooksFilter = async params => {
         const response = await axios.get('http://localhost:5000/book/user_filter_books', 
          {
            params: {
            q: params.q,
            sortColumn: params.sortColumn,
            sort: params.sort,
            page: params.page,
            perPage: params.perPage,
            genre: params.genre
     
          }})
          return {
            params,
            data: response.data.books,
            totalPages: response.data.total
            
          }}
      getUserBooksFilter();
    });

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

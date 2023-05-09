// ** React Imports
import { Fragment } from 'react'

// ** Product components
import ProductCards from './BookCards'
import ProductsHeader from './BooksHeader'
import React, { useEffect, useState } from 'react'
import {getData } from './store/index'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
//import ProductsSearchbar from './ProductsSearchbar'

// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label, Input,  DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import { Book, UserPlus, UserCheck, UserX, Bookmark, ChevronDown, Share, Printer, FileText, BookOpen, MoreVertical, Trash2 } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'


// const CustomHeader = ({ store,handleFilter, searchTerm }) => {
//   // ** Converts table to CSV
//   function convertArrayOfObjectsToCSV(array) {
//     let result

//     const columnDelimiter = ','
//     const lineDelimiter = '\n'
//     const keys = Object.keys(store.data[0])

//     result = ''
//     result += keys.join(columnDelimiter)
//     result += lineDelimiter

//     array.forEach(item => {
//       let ctr = 0
//       keys.forEach(key => {
//         if (ctr > 0) result += columnDelimiter

//         result += item[key]

//         ctr++
//       })
//       result += lineDelimiter
//     })

//     return result
//   }

//   // ** Downloads CSV
//   function downloadCSV(array) {
//     const link = document.createElement('a')
//     let csv = convertArrayOfObjectsToCSV(array)
//     if (csv === null) return

//     const filename = 'export.csv'

//     if (!csv.match(/^data:text\/csv/i)) {
//       csv = `data:text/csv;charset=utf-8,${csv}`
//     }

//     link.setAttribute('href', encodeURI(csv))
//     link.setAttribute('download', filename)
//     link.click()
//   }

//   return (
//     <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
//       <Row>
       
//         <Col
//           xl='6'
//           className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
//         >
//           <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
//             <label className='mb-0' htmlFor='search-invoice'>
//               Search:
//             </label>
//             <Input
//               id='search-invoice'
//               className='ms-50 w-100'
//               type='text'
//               value={searchTerm}
//               onChange={e => handleFilter(e.target.value)}
//             />
//           </div>

//           <div className='d-flex align-items-center table-header-actions'>
//             <UncontrolledDropdown className='me-1'>
//               <DropdownToggle color='secondary' caret outline>
//                 <Share className='font-small-4 me-50' />
//                 <span className='align-middle'>Export</span>
//               </DropdownToggle>
//               <DropdownMenu>
//               <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
//                   <FileText className='font-small-4 me-50' />
//                   <span className='align-middle'>CSV</span>
//                 </DropdownItem>
// {/*                 
//                 <DropdownItem className='w-100' onClick={() => window.print()} >
//                   <Printer className='font-small-4 me-50' />
//                   <span className='align-middle'>Print</span>
//                 </DropdownItem>
//                 <DropdownItem className='w-100'>
//                   <Grid className='font-small-4 me-50' />
//                   <span className='align-middle'>Excel</span>
//                 </DropdownItem>
//                 <DropdownItem className='w-100'>
//                   <File className='font-small-4 me-50' />
//                   <span className='align-middle'>PDF</span>
//                 </DropdownItem>
//                 <DropdownItem className='w-100'>
//                   <Copy className='font-small-4 me-50' />
//                   <span className='align-middle'>Copy</span>
//                 </DropdownItem>
//                */}
//               </DropdownMenu>
//             </UncontrolledDropdown>

//             {/* <Button className='add-new-user' color='primary' onClick={toggleSidebar}> Add New User</Button> */}
//           </div>
//         </Col>
//       </Row>
//     </div>
//   )
// }



const ProductsPage = props => {
  // ** Props
  const {
    store,
    dispatch,
    addToCart,
    activeView,
    sidebarOpen,
    books,
    getCartItems,
    addToWishlist,
    setActiveView,
    deleteCartItem,
    setSidebarOpen,
    deleteWishlistItem
  } = props


//   const dispatch = useDispatch()
//   const store = useSelector(state => state.books)

//   // ** States
//   const [sort, setSort] = useState('desc')
//   const [searchTerm, setSearchTerm] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [sortColumn, setSortColumn] = useState('id')
//   const [rowsPerPage, setRowsPerPage] = useState(10)
//   const [genre, setGenre] = useState({ value: '', label: 'Select ' })
  

//   useEffect(() => {
//     dispatch(
//       getData({
//         sort,
//         sortColumn,
//         q: searchTerm,
//         page: currentPage,
//         perPage: rowsPerPage,
//         genre: genre.value
//       }
//       )
//     )

//   }, [dispatch, store.data.length, sort, sortColumn, currentPage, store.data])

//  // ** User filter options
//  const GenreOptions = [
//   { value: '', label: 'Select ' },
//   { value: 'Action', label: 'Action' },
//   { value: 'Romance', label: 'Romance' },
//   { value: 'Fantasy', label: 'Fantasy' },
//   { value: 'Drama', label: 'Drama' },
//   { value: 'Crime', label: 'Crime' },
//   { value: 'Adventure', label: 'Adventure' },
//   { value: 'Thriller', label: 'Thriller' },
//   { value: 'Sci-fi', label: 'Sci-fi' },
//   { value: 'Music', label: 'Music' },
//   { value: 'Family', label: 'Family' }

// ]

// // ** Function in get data on search query change
// const handleFilter = val => {
//   setSearchTerm(val)
//   dispatch(
//     getData({
//       sort,
//       q: val,
//       sortColumn,
//       page: currentPage,
//       perPage: rowsPerPage,
//       genre: genre.value
//     })
//   )
// }



  // ** Handles pagination
  // const handlePageChange = val => {
  //   if (val === 'next') {
  //     dispatch(getProducts({ ...store.params, page: store.params.page + 1 }))
  //   } else if (val === 'prev') {
  //     dispatch(getProducts({ ...store.params, page: store.params.page - 1 }))
  //   } else {
  //     dispatch(getProducts({ ...store.params, page: val }))
  //   }
  // }

  // ** Render pages
  // const renderPageItems = () => {
  //   const arrLength = 3
  
                    
  //   return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
  //     return (
  //       <PaginationItem
  //         key={index}
  //         active="1"
  //         onClick={() => handlePageChange(index + 1)}
  //       >
  //         <PaginationLink href='/' onClick={e => e.preventDefault()}>
  //           {index + 1}
  //         </PaginationLink>
  //       </PaginationItem>
  //     )
  //   })
  // }

  // // ** handle next page click
  // const handleNext = () => {
  //   if (store.params.page !== Number(store.totalProducts) / store.products.length) {
  //     handlePageChange('next')
  //   }
  // }

  return (
    <div className='content-detached content-right'>
      <div className='content-body'>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={books}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        {/* <CardHeader>
          <CardTitle tag='h4'>Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='status-select'>Genre</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={GenreOptions}
                value={genre}
                onChange={data => {
                  setGenre(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      perPage: rowsPerPage,
                      genre: data.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody> */}
     

        {/* <ProductsSearchbar dispatch={dispatch} getProducts={books} store={store} /> */}
        {books && books.length ? (
          <Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={books}
              getProducts={books}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />
            {/* <CustomHeader
                store={store}
                searchTerm={searchTerm}
                //rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                // handlePerPage={handlePerPage}
                // toggleSidebar={toggleSidebar}
              /> */}
            {/* <Pagination className='d-flex justify-content-center ecommerce-shop-pagination mt-2'>
              <PaginationItem
                //disabled={store.params.page === 1}
                className='prev-item'
                //onClick={() => (store.params.page !== 1 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className='next-item'
                onClick={() => handleNext()}
                //disabled={store.params.page === Number(store.totalProducts) / store.products.length}
              >
                <PaginationLink href='/' onClick={e => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination> */}
          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage

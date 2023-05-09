// ** React Imports
import { Fragment, useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from "axios";
// ** Invoice List Sidebar
import Sidebar from './Sidebar'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Store & Actions
import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'

// ** Utils
import { selectThemeColors } from '@utils'
// ** Icons Imports
import { Book, UserPlus, UserCheck, UserX, Bookmark, ChevronDown, Share, Printer, FileText, BookOpen, MoreVertical, Trash2 } from 'react-feather'


// ** Reactstrap Imports
import {
  Badge,
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import './tableList.css'



// ** Table Header
const CustomHeader = ({ store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(store.data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Search:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
{/*                 
                <DropdownItem className='w-100' onClick={() => window.print()} >
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
               */}
              </DropdownMenu>
            </UncontrolledDropdown>

            {/* <Button className='add-new-user' color='primary' onClick={toggleSidebar}> Add New User</Button> */}
          </div>
        </Col>
      </Row>
    </div>
  )
}



const UsersList = () => {
  
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.books)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [acceptance, setAcceptance] = useState({ value: '', label: 'Select ' })
  const [availability, setAvailability] = useState({ value: '', label: 'Select '})
  const [change, setChange]= useState(false);

  const [Posts, setPosts] = useState([])
   
  const [approvedBookCount, setApprovedBookCount] = useState(0);
  const [pendingBooksCount, setPendingBooks] = useState(0);
  const [totalBooksCount, setBooksCount] = useState(0);
  

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData());
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        accepted: acceptance.value,
        available: availability.value
      }
      )
    )
    setBooksCount(store.data.length)
    setApprovedBookCount(getTotalAcceptedBook(store.data))
    setPendingBooks(store.data.length - approvedBookCount)

  }, [dispatch, store.data.length, sort, sortColumn, currentPage, change, store.data])

  const getTotalAcceptedBook=(data) => {
    const totalAccepted = data.filter((item)=> {
      return item.accepted === true ; 
    })
    return totalAccepted.length
  }

  const acceptedObj = {
    true: 'light-success',
    false: 'light-secondary'
  }
  
  // const getAllData = useCallback(async() => {
  //      dispatch(getAllData());
  //      setBooksCount(store.data.length)
  //      setApprovedBookCount(getTotalAcceptedBook(store.data))
  //      setPendingBooks(store.data.length - approvedBookCount)
    
  // })
  const isAccepted = (isAccepted) => {
    let status ;
    isAccepted===true ? status ='Accepted' : status='Not Accepted'
    return status
  }
  
  const switchAccepted=(id, current)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to change this book status',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
    axios.put(`http://localhost:5000/book/switch_accepted/${id}`, {accepted: !current})
   .then(response => {
    console.log(response.data);
    setChange(true)  
    current = change;
  })
  .catch(error => {
    // handle error
    console.log(error);
  });
  }
  });   
  }


  const deleteBook = (idBook) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this book',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
    axios.delete(`http://localhost:5000/book/${idBook}`)
    .then(response => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The book has been deleted',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
}
}); 
  }
  
  

  const columns = [

    {
      name: 'Name',
      sortable: true,
      minWidth: '300px',
      sortField: 'name',
     selector: row => row.name,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <Link
              to={`/bookdetail/${row._id}`}
              className='user_name text-truncate text-body'
            >
            <span className='fw-bolder'>{row.name}</span>
            </Link>
          </div>
        </div>
     )
    },
 
   {
     name: 'Author',
     minWidth: '230px',
     sortable: true,
     sortField: 'billing',
     selector: row => row.author,
     cell: row => <span className='text-capitalize'>{row.author}</span>
     
   },
 
   {
     name: 'Owner',
     minWidth: '230px',
     sortable: true,
     sortField: 'billing',
     selector: row => row.billing,
     cell: row => <span className='text-capitalize'>{row.owner}</span>
     
   },
   {
    name: 'Accepted',
    minWidth: '138px',
    sortable: true,
    sortField: 'accepted',
    selector: row => row.accepted,
     cell: row => (
  
      <Badge className='text-capitalize' style={{cursor:'pointer'}}
      color={acceptedObj[row.accepted]}
      onClick={() => switchAccepted(row._id,row.accepted)}
      >
        {isAccepted(row.accepted) }
       </Badge>
     )
    
  },
 
 
   {
     name: 'Actions',
     minWidth: '100px',
     cell: row => (
       <div className='column-action'>
         <UncontrolledDropdown>
           <DropdownToggle tag='div' className='btn btn-sm'>
             <MoreVertical size={14} className='cursor-pointer' />
           </DropdownToggle>
           <DropdownMenu>
             <DropdownItem
             className='w-100'
             >
                <Link
             to={`/bookdetail/${row._id}`}
             className='w-100'
           > 
             <FileText size={14} className='me-50' />
             <span className='align-middle'>Details</span>
               </Link> 
             </DropdownItem>
             <DropdownItem
               tag='a'
               href='/'
               className='w-100'
               onClick={e => {
                 e.preventDefault();
                 deleteBook(row._id)
               }}
             >
               <Trash2 size={14} className='me-50' />
               <span className='align-middle'>Delete</span>
             </DropdownItem>
           </DropdownMenu>
         </UncontrolledDropdown>
       </div>
     )
   }
 
 ]

  // ** User filter options
  const AcceptanceOptions = [
    { value: '', label: 'Select ' },
    { value: 'true', label: 'Accepted' },
    { value: 'false', label: 'Not Accepted' }
    
  ]

  const AvailabilityOptions = [
    { value: '', label: 'Select ' },
    { value: 'true', label: 'Available' },
    { value: 'false', label: 'Not Available' }
    
  ]

  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        accepted: acceptance.value,
        available: availability.value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        accepted: acceptance.value,
        available: availability.value
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        accepted: acceptance.value,
        available: availability.value
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      accepted: acceptance.value,
      available: availability.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      console.log('alldataa store',store.allData)
      return store.allData.slice(0, rowsPerPage)
    }

  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        accepted: acceptance.value,
        available: availability.value
      })
    )
  }

  return (
    <Fragment>
            <Row>
            <Col lg='4' sm='6'>
              <StatsHorizontal
                color='primary'
                statTitle='Total Books'
                icon={<Book size={20} />}
                renderStats={<h3 className='fw-bolder mb-75'>{totalBooksCount}</h3>}
              />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal
                color='success'
                statTitle='Accepted Books'
                icon={<Bookmark size={20} />}
                renderStats={<h3 className='fw-bolder mb-75'>{approvedBookCount}</h3>}
              />
            </Col>
            <Col lg='4' sm='6'>
              <StatsHorizontal
                color='danger'
                statTitle='Unaccepted Books'
                icon={<BookOpen size={20} />}
                renderStats={<h3 className='fw-bolder mb-75'>{pendingBooksCount}</h3>}
              />
            </Col>
          </Row>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Filters</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>Acceptance</Label>
              <Select
                isClearable={false}
                value={acceptance}
                options={AcceptanceOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={data => {
                  setAcceptance(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      accepted: data.value,
                      page: currentPage,
                      perPage: rowsPerPage,
                      available: availability.value
                    })
                  )
                }}
              />
            </Col>
            
            <Col md='4'>
              <Label for='status-select'>Availability</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={AvailabilityOptions}
                value={availability}
                onChange={data => {
                  setAvailability(data)
                  dispatch(
                    getData({
                      sort,
                      sortColumn,
                      q: searchTerm,
                      page: currentPage,
                      available: data.value,
                      perPage: rowsPerPage,
                      accepted: acceptance.value
                    })
                  )
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            onSelectedRowsChange
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList

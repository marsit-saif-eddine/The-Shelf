// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Store & Actions
import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** React Imports
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from "axios";

// ** Store & Actions

import { deletePost} from '../store'

// ** Icons Imports
import {  MoreVertical, Trash2 } from 'react-feather'

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
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(store.data)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
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
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              Add New User
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}


const UsersList = () => {
  
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.posts)

  // ** States
  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [acceptance, setAcceptance] = useState({ value: '', label: 'Select ' })
  const [change, setChange]= useState(false);
  

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        is_accepted: acceptance.value
      })
    )
    //console.log('datamsg',store.data)
  }, [dispatch, store.data.length, sort, sortColumn, currentPage, change])

  const acceptedObj = {
    true: 'light-success',
    false: 'light-secondary'
  }
  
  
  const isAccepted = (isAccepted) => {
    let status ;
    isAccepted===true ? status ='Accepted' : status='Not Accepted'
    return status
  }
  
  const switchAccepted=(id, current)=>{
    Swal.fire({
        title: 'Are you sure?',
        text: 'do you want to approve this request ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve it it!',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
    axios.put(`http://localhost:5000/post/switch_accepted/${id}`, {is_accepted: !current})
  
   .then(response => {
    console.log(response.data);
    setChange(true)  
  console.log(response);
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
      name: 'owner',
      sortable: true,
      minWidth: '300px',
      sortField: 'owner',
     selector: row => row.owner,
      cell: row => (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <Link
              to={`/pages/profile/${data.owner_Id}`}
              className='user_name text-truncate text-body'
            >
            <span className='fw-bolder'>{row.owner}</span>
            </Link>
          </div>
        </div>
     )
    },
 
   {
     name: 'content',
     minWidth: '230px',
     sortable: true,
     sortField: 'billing',
     selector: row => row.content,
     cell: row => <span className='text-capitalize'>{row.content}</span>
     
   },
  
   {
    name: 'Accepted',
    minWidth: '138px',
    sortable: true,
    sortField: 'accepted',
    selector: row => row.is_accepted,
     cell: row => (
  
      <Badge className='text-capitalize' style={{cursor:'pointer'}}
      color={acceptedObj[row.is_accepted]}
      onClick={() => switchAccepted(row._id,row.is_accepted)}
      >
        {isAccepted(row.is_accepted) }
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
             to={`/postdetail/${row._id}`}
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
                 e.preventDefault()
                 store.dispatch(deletePost(row.id))
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

 
  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1,
        is_accepted: acceptance.value
        
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
        is_accepted: acceptance.value
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
        is_accepted: acceptance.value
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
      is_accepted: acceptance.value,
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
        is_accepted: acceptance.value
        
      })
    )
  }

  return (
    <Fragment>
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
                      is_accepted: data.value,
                      page: currentPage,
                      perPage: rowsPerPage
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

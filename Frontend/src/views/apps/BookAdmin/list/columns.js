// ** React Imports
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from "axios";

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getBook, deleteBook, updateStatusBook} from '../store'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'



// ** Renders Role Columns
// const renderstatus1 = row => {
//   const status1Obj = {
//     sale: {
//       class: 'text-primary',
//      // icon: User
//     },
//     rent: {
//       class: 'text-danger',
//       //icon: Slack
//     }
//   }

//   const Icon = status1Obj[row.for_sale] ? status1Obj[row.for_rent].icon : Edit2

//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${status1Obj[row.for_sale] ? status1Obj[row.for_rent].class : ''} me-50`} />
//       {row.for_sale}
//     </span>
//   )
// }

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
      text: 'do you want to approve this book',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
  axios.put(`http://localhost:5000/book/switch_accepted/${id}`, {accepted: !current})

 .then(response => {
  console.log(response.data);
  //setChange(true)   
console.log(response);
})
.catch(error => {
  // handle error
  console.log(error);
});
}
});   
}

export const columns = [
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
            {/* <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem> */}
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteBook(row.id))
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

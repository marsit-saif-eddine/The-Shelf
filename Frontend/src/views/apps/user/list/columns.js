// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser ,rateUser,banUser,unbanUser} from '../store'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Slash } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {

  if (row.profile_photo) {
    return <Avatar className='me-1' img={row.profile_photo} width='32' height='32' />
  } else {
    return (

      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={(`${row.firstname.toUpperCase()} ${row.lastname.split(' ').join('').toUpperCase()}`) || 'John Doe'}
      />
    )
  }
}

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    user: {
      class: 'text-primary',
      icon: User
    },
    admin: {
      class: 'text-danger',
      icon: Slack
    }
  }

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
      {row.role}
    </span>
  )
}

const statusObj = {
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'User',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => row.fullName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/pages/profile/${row._id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row._id))}
          >
            <span className='fw-bolder'>{row.firstname} {row.lastname}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  
  {
    name: 'Role',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.role,
    cell: row => renderRole(row)
  },
  {
    name: 'Rate',
    minWidth: '230px',
    sortable: true,
    sortField: 'billing',
    selector: row => row.billing,
    cell: row => <span>

      <Typography component="legend"></Typography>
      <Rating name="customized-10" sx={{
        '& .MuiRating-iconFilled': {
          color: '#ffd966',
        },
        '& .MuiRating-iconFocus': {
          color: '#ffd966',
        },
        '& .MuiRating-iconHover': {
          color: '#ffd966',
        },
      }} value={row.rate} max={5}

        onChange={(event, value) => { console.log(row); store.dispatch(rateUser({ profileId: row._id, value })) }}

      />


    </span>
  },
  {
    name: 'Banned',
    minWidth: '230px',
    sortable: true,
    sortField: 'billing',
    selector: row => row.billing,
    cell: row => <span className='text-capitalize'>{row.status}</span>
  },
  {
    name: 'Active',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {row.status}
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
              tag={Link}
              className='w-100'
              to={`user/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row._id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            {/* <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem> */}
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                
                store.dispatch(row.status == "banned" ?  unbanUser(row._id) : banUser(row._id))
              }}
            >
              <Slash size={14} className='me-50' />
              {row.status == "banned" ? <span  className='align-middle'>Unban</span> :  <span  className='align-middle'>Ban</span> }
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]

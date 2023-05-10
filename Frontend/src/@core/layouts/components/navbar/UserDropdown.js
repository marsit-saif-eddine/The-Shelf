// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useContext } from 'react'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  const ability = useContext(AbilityContext)

  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      {isUserLoggedIn() !== null ? (
        <>
          <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
            <div className='user-nav d-sm-flex d-none'>
              <span className='user-name fw-bold'>{userData ? userData.lastname + ' ' + userData.firstname : 'user'}</span>
              <span className='user-status'>{(userData && userData.role) || 'Admin'}</span>
            </div>

            <Avatar img={userData ? 'http://localhost:5000/' + userData.photo : defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
          </DropdownToggle>
        </>
      ) : (
        <>
        <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
          <div className='user-nav d-sm-flex d-none'>
            <span className='user-name fw-bold'>{'Bonjour, Identifiez-vous '}</span>
            <span className='user-status'>{'Compte Anonyme'}</span>
          </div>

          <Avatar img={userAvatar} imgHeight='40' imgWidth='40' />
        </DropdownToggle>
      </>
      )}

      <DropdownMenu end>
        {isUserLoggedIn() !== null ? (
          <>
            <DropdownItem tag={Link} to={`/pages/profile/${userData && userData._id}`}>
              <User size={14} className='me-75' />
              <span className='align-middle'>Profile</span>
            </DropdownItem>
   
            {/* <DropdownItem tag={Link} to='/apps/email'>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/todo'>
          <CheckSquare size={14} className='me-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem> */}

           
      
            {/* <DropdownItem tag={Link} to='/pages/pricing'>
          <CreditCard size={14} className='me-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem> */}
       
            <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
              <Power size={14} className='me-75' />
              <span className='align-middle'>Logout</span>
            </DropdownItem>
          </>
        )
          :
          (
            <>
              <DropdownItem tag={Link} to='/login'>
                <Power size={14} className='me-75' />
                <span className='align-middle'>Sign In</span>
              </DropdownItem>
              <DropdownItem tag={Link} to='/register'>
                <Power size={14} className='me-75' />
                <span className='align-middle'>Sign Up</span>
              </DropdownItem>
            </>
          )
        }
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown

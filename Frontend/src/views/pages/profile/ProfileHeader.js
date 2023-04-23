// ** React Imports
import { useState } from 'react'

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit,Plus } from 'react-feather'
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'

import { useLocation } from "react-router-dom";
// ** Custom Components
import Avatar from '@components/avatar'

const ProfileHeader = ({ data,selectedUser }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)
 // ** render user img
 const renderUserImg = () => {
  if (selectedUser !== null && selectedUser.profile_photo) {
    return (
      <img
      width= '100%'
          height= '100%'
        alt='user-avatar'
        src={selectedUser.profile_photo}
        className='rounded img-fluid'
      />
    )
  } else {
    return (
      <Avatar
        initials
        color={'light-primary'}
        className='rounded img-fluid'
        content={selectedUser.firstname}
        contentStyles={{
          borderRadius: 0,
          fontSize: 'calc(48px)',
          width: '100%',
          height: '100%'
        }}
        style={{
          height: '110px',
          width: '110px'
        }}
      />
    )
  }
}

const location = useLocation();

//destructuring pathname from location
const { pathname } = location;
  return (
    <Card className='profile-header mb-2'>
      <CardImg src={data.coverImg} alt='User Profile Image' top />
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
          {renderUserImg()}
          </div>
          <div className='profile-title ms-3'>
            <h2 className='text-white'>{selectedUser.firstname} {selectedUser.lastname}</h2>
            <p className='text-white'>Reader</p>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <Navbar container={false} className='justify-content-end justify-content-md-between w-100' expand='md' light>
          <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
              <Nav className='mb-0' pills>
                <NavItem>
                  <NavLink href='/pages/profile/profile_posts' className='fw-bold' active>

                    <span className='d-none d-md-block'>Events</span>
                    <Rss className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink className='fw-bold'>
                    <span className='d-none d-md-block'>About</span>
                    <Info className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold'>
                    <span className='d-none d-md-block'>Photos</span>
                    <Image className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className='fw-bold'>
                    <span className='d-none d-md-block'>Friends</span>
                    <Users className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
               
                </NavItem> */}
                <NavItem>
                  <NavLink to="/pages/profile/quiz" className='fw-bold'>
                    <span className='d-none d-md-block'>Quizzes</span>
                    <Users className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href={`/pages/profile/mybooks/${selectedUser._id}`} className='fw-bold' active>
                    <span className='d-none d-md-block'>Books</span>
                    <Users className='d-block d-md-none' size={14} />
                  </NavLink>
                </NavItem>
              </Nav>
              <Button color='primary'>
              <Link to='/eventsform'> Add a new event</Link>
              <Plus size={14} > Add a new event</Plus>
            </Button>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader




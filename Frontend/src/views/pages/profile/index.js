


// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'
import { getUser } from '../../apps/user/store'
import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Demo Components
import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestQuizzes from './ProfileLatestQuizzes'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'
import ProfileLatestEvents from './ProfileLatestEvents'

// ** Styles
import '@styles/react/pages/page-profile.scss'
import './booksStyle.scss'

const Profile = () => {
  // ** States
  const [data, setData] = useState(null)
 
   const [block, setBlock] = useState(false)

   const handleBlock = () => {
     setBlock(true)
     setTimeout(() => {
       setBlock(false)
     }, 2000)
   }
   const store = useSelector(state => state.users)
   const dispatch = useDispatch()
 
   // ** Hooks
   const { id } = useParams()
 
   // ** Get suer on mount
   useEffect(() => {
     dispatch(getUser(id))
   }, [dispatch])
 
  useEffect(() => {
    axios.get('/profile/data').then(response => setData(response.data))
  }, [])

  
  return (
    <Fragment>
      <Breadcrumbs title='Profile' data={[{ title: 'Pages' }, { title: 'Profile' }]} />
    {data && 
      store.selectedUser !== null ? (
        <div id='user-profile'>
          <Row>
            <Col sm='12'>
            <ProfileHeader data={data.header} selectedUser={store.selectedUser}/>
            </Col>
          </Row>
          <section id='profile-info'>
            <Row>
              <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>

                <ProfileAbout selectedUser={store.selectedUser} />
                <ProfileLatestEvents data={data.suggestedPages} />
                {/* <ProfileTwitterFeeds data={data.twitterFeeds} /> */}
                {/* <ProfileSuggestedPages data={data.suggestedPages} /> */}
                {/* <ProfileTwitterFeeds data={data.twitterFeeds} /> */}
              </Col>
              <Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
                <ProfilePosts data={data.post} />
              </Col>
              <Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 3 }}>
                <ProfileLatestQuizzes data={data.latestPhotos} />
                {/* <ProfileFriendsSuggestions data={data.suggestions} /> */}
                {/* <ProfilePoll data={data.polls} /> */}
              </Col>
              
            </Row>
            <Row>
              <Col className='text-center' sm='12'>
                <Button color='primary' className='border-0 mb-1 profile-load-more' size='sm' onClick={handleBlock}>
                  <UILoader blocking={block} overlayColor='rgba(255,255,255, .5)'>
                    <span> Load More</span>
                  </UILoader>
                </Button>
              </Col>
            </Row>
          </section>
        </div>
      ) : null}
     
    </Fragment>
  )
}

export default Profile

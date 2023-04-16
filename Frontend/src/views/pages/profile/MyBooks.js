// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'
import Breadcrumbs from '@components/breadcrumbs'
// ** Custom Components

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

// ** Demo Components
import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestPhotos from './ProfileLatestPhotos'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'

// ** Styles
import '@styles/react/pages/page-profile.scss'

const MyBooks = () => {
    // ** States
    const [data, setData] = useState(null)
    const [block, setBlock] = useState(false)
  
    const handleBlock = () => {
      setBlock(true)
      setTimeout(() => {
        setBlock(false)
      }, 2000)
    }
  
    useEffect(() => {
      axios.get('http://localhost:5000/book/books').then(response => setData(response.data.book))
    }, [])
    return (
      <Fragment>
       
            <Row>
              <Col sm='12'>
               <p>this is users bokkss</p>
              </Col>
            </Row>
        
      </Fragment>
    )
  }

export default MyBooks

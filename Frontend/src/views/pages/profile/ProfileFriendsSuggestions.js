// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { UserPlus } from 'react-feather'
import { Badge } from 'reactstrap'

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'
import Tooltip from 'reactstrap'
//import ReactTooltip from 'react-tooltip'
const ProfileFriendsSuggestions = ({ data }) => {
  const renderSuggestion = () => {
    // return data.map((suggestion, index) => {
    //   return (
    //     <div
    //       key={index}
    //       className={classnames('d-flex justify-content-start align-items-center', {
    //         'mt-2': index === 0,
    //         'mt-1': index !== 0
    //       })}
    //     >
    //       <Avatar className='me-75' img={suggestion.avatar} imgHeight='40' imgWidth='40' />
    //       <div className='profile-user-info'>
    //         <h6 className='mb-0'>{suggestion.name}</h6>
    //         <small className='text-muted'>{suggestion.mutualFriend}</small>
    //       </div>
    //       <div className='ms-auto'>
    //         <Button className='btn-icon' color='primary' size='sm'>
    //           <UserPlus size={14} />
    //         </Button>
    //       </div>
    //     </div>
    //   )
    // })
  }

  return (
    <Card>
      <CardBody>
        <h5>My badges</h5>
        {renderSuggestion()}
        <Badge color='info'>New reader</Badge>
        <Badge color='info'>Library mouse</Badge>
        <Badge color='info'>Bookworm</Badge>
        <Badge color='Success'>genieus</Badge>


      </CardBody>
    </Card>
  )
}

export default ProfileFriendsSuggestions

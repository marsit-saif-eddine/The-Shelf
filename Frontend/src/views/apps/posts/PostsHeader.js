// ** Third Party Components
import classnames from 'classnames'
import { Menu, Grid, List } from 'react-feather'
import { Link } from 'react-router-dom'
import { Box } from "@mui/system";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

const PostsHeader = props => {
  // ** Props
  const { activeView, setActiveView, dispatch, getProducts, store, setSidebarOpen } = props

  // ** Sorting obj
  const sortToggleText = {
    'price-desc': 'Highest',
    'price-asc': 'Lowest',
    featured: 'Featured'
  }

  return (
    <div className='ecommerce-header'>
      <Row>
      <Box
            
             maxWidth={900}
             alignContent={"flex-start"}
             alignSelf="flex-start"
             marginBottom={3}
            >
      {/* <Link to={`/addpost`}>
        <Button color='primary' >Add New Book Request</Button>
      </Link> */}
      </Box>
      </Row>
    </div>
  )
}

export default PostsHeader

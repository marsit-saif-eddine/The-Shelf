import '@styles/react/apps/app-users.scss'
import {
    Row,
    Col,
    Card,
    Badge, 
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu,
     DropdownItem 
  } from "reactstrap";

  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  import axios from "axios";
  import { Fragment, useState, useEffect } from 'react'

  import '@styles/react/apps/app-users.scss'
  import Avatar from '@components/avatar'
  
  
  import { Link } from 'react-router-dom'
  

  import { Trash2 , MoreVertical, FileText,Archive, Check, Layers, Clock} from 'react-feather';
  import { getUser} from '../../user/store'
  import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
  import "../../quiz/quiz.css"
  import { useSelector } from "react-redux";




  
const postTable = () => {

    const [show, setShow] = useState(false)

    const[change,setChange]=useState(false)
    //const [statusFilter, setStatusFilter] = useState('all'); // default to show all quizzes
    const [approvedPostCount, setApprovedPostCount] = useState(0);
    const [pendingPostsCount, setPendingPosts] = useState(0);
    const [totalPostsCount, setPostsCount] = useState(0);
    const [posts,setPosts]= useState([]);
    const [post,setPost]= useState([]);
    const socket = useSelector((state) => state.chat.socket);

   

    const get = async ()=>{
       await axios.get('http://localhost:5000/post/posts')
        .then(async (response) =>  {
           await setPosts(response.data);
           const approvedPosts = response.data.filter(post => post.is_accepted === true);
           const pendingPosts = response.data.filter(post => post.is_accepted === false);

           setPostsCount(response.data.length);
           setApprovedPostCount(approvedPosts.length);
           setPendingPosts(pendingPosts.length);
        
        }
            
            )

    .catch(error => console.error(error));
    }

    useEffect(() => {
      console.log('tessst')

        setChange(false)
        get();
      }, [change]);
       
  
      const Delete = (post) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
          }).then((result) => {
            if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/post/${post._id}`)
        .then(() => {
          socket.emit("post-deleted", post)
          // Remove the deleted post from the posts array
          console.log("d eeteeee ellll post emittted ")

          const updatedPosts = posts.filter((post) => post.id !== post._id);
          setPosts(updatedPosts);
          setChange(true)
          console.log("d eeteeee ellll post "+ post._id);
          console.log("ellll post "+ post.owner_Id)

        });
    }
});
      }

      const approve=(item)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'do you want to approve this request',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it it!',
            cancelButtonText: 'No, cancel',
          }).then((result) => {
            if (result.isConfirmed) {
        axios.put(`http://localhost:5000/post/switch_accepted/${item._id}`,{is_accepted: !item.is_accepted})

       .then(response => {
        socket.emit("post-approved", item)

        console.log(response.data);
        setChange(true)   
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
    }




    // //const { id } = useParams();
    // const details=(id)=> {
    //     axios.get(`http://localhost:5000/post/${id}`)
    //   //  .then(response => console.log(response.data))
    //   .then(response => setPost(response.data))

    //     .catch(error => console.error(error));
  
    //   }
 
      const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Process the user's answers and submit them to the database using an API call
      };
    
      if (!post) {
        return <div>Loading...</div>;
      }


///search////
// const [searchQuery, setSearchQuery] = useState('');
// const [filteredData, setFilteredData] = useState(Posts);

// const handleSearch = (event) => {
//   const query = event.target.value;

//   setSearchQuery(query);
// };
// const filteredQuizData = Posts.filter(
//     (post) =>
//       post.quizName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       quiz.book_id.toLowerCase().includes(searchQuery.toLowerCase()) 

//   )
////////////////

});   
      }

      const statusObj = {
        true: 'light-success',
        false: 'light-warning'
      }
      

  return (
<Fragment>
 
<div className='app-user-list'>
    <Row>
    <Col lg='3' sm='6'>
        <StatsHorizontal
          color='primary'
          statTitle='Toatal Posts'
          icon={<Layers size={20} />}
          renderStats={<h3 className='fw-bolder mb-75'>{totalPostsCount}</h3>}
        />
      </Col>
      <Col lg='3' sm='6'>
        <StatsHorizontal
          color='success'
          statTitle='Posts approved'
          icon={<Check size={20} />}
          renderStats={<h3 className='fw-bolder mb-75'>{approvedPostCount}</h3>}
        />
      </Col>

      <Col lg='3' sm='6'>
        <StatsHorizontal
          color='warning'
          statTitle='Posts pending'
          icon={<Clock size={20} />}
          renderStats={<h3 className='fw-bolder mb-75'>{pendingPostsCount}</h3>}
        />
      </Col>
     
      </Row>
      </div>

      <Card className='overflow-hidden'>
                <div className="row" id="basic-table">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">All Post Requests</h4>
                            </div>
                            <div className="card-body">
                                
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Owner</th>
                                            <th>Content</th>
                                            <th>status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                      
                                        {posts && posts.map((post) => (
                                         <tr key={post._id} >
                                            <td className='fw-bolder'> 
                                            <Link
                                            to={`/pages/profile/${post.owner_Id}`}
                                            className='user_name text-truncate text-body'
                                            onClick={() => store.dispatch(getUser(post.owner_Id))}
                                          >
                                              {post.owner}
                                              </Link>
                                              </td>
                                            
                                            <td>{post.content}</td>
                                            <td>
                                                <Badge className='text-capitalize' color={statusObj[post.is_accepted]} pill>
                                                  {post.is_accepted ? 'Approved' : 'Not Approved'}
                                              </Badge>
                                            </td>
                                            <td>
                                             <div className='column-action'>
                                <UncontrolledDropdown>
                                  <DropdownToggle tag='div' className='btn btn-sm'>
                                    <MoreVertical size={14} className='cursor-pointer' />
                                  </DropdownToggle>
                                  <DropdownMenu>
                                  {/* <DropdownItem
                                    
                                    className='w-100'
                                    onClick={() => {details(post._id);setShow(true)}}
                                  >
                                    <FileText size={14} className='me-50' />
                                    <span className='align-middle'>Details</span>
                                  </DropdownItem> */}
                                    <DropdownItem  onClick={() => approve(post)}>
                                      <Archive size={14} className='me-50' />
                                      <span className='align-middle'>approve</span>
                                    </DropdownItem>
                                    <DropdownItem
                                    
                                      className='w-100'
                                      onClick={() => Delete(post)}
                                    >
                                      <Trash2 size={14} className='me-50' />
                                      <span className='align-middle'>Delete</span>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
      </div>
                                            </td>
                                        </tr>
                       ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
               
      </Card>
    </Fragment>


     )
   }
   
   export default postTable
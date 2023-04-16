
import { Container } from  'reactstrap'
import '@styles/react/apps/app-users.scss'
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Pagination,
    Button,
    PaginationItem,
    PaginationLink,
    Input,
    Form,
    InputGroup,
    InputGroupText,
    Label,
    Badge, 
    UncontrolledDropdown, 
    DropdownToggle, 
    DropdownMenu,
     DropdownItem 
  } from "reactstrap";

  import Select from 'react-select'
  import DataTable from 'react-data-table-component'
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  import InputGroupAddon  from 'reactstrap';
  import ReactPaginate from "react-paginate";
  import axios from "axios";
  import { Fragment, useState, useEffect } from 'react'
import { Trash2 , MoreVertical, FileText,Archive} from 'react-feather';
import quiz from '..';

const quizTable = () => {


    const [Quizs, setQuizs] = useState([])
    const[change,setChange]=useState(false)

    const get = ()=>{
        axios.get('http://localhost:5000/quiz/allquiz')
        .then(response => setQuizs(response.data))
    .catch(error => console.error(error));
    }

    useEffect(() => {
  
        setChange(false)
        get();
      console.log(Quizs)
      }, [change]);
       
  
      const Delete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
          }).then((result) => {
            if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/quiz/delete/${id}`)
        .then(() => {
          // Remove the deleted quiz from the quizzes array
          const updatedQuizs = Quizs.filter((quiz) => quiz.id !== id);
          setQuizs(updatedQuizs);
          setChange(true)
        });
    }
});
      }

      const approve=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'do you want to approve this quiz',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it it!',
            cancelButtonText: 'No, cancel',
          }).then((result) => {
            if (result.isConfirmed) {
        axios.put(`http://localhost:5000/quiz/approvequiz/${id}`)
     
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

///search////
const [searchQuery, setSearchQuery] = useState('');
const [filteredData, setFilteredData] = useState(Quizs);

const handleSearch = (event) => {
  const query = event.target.value;

  setSearchQuery(query);
};
const filteredQuizData = Quizs.filter(
    (quiz) =>
      quiz.quizName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.book_id.toLowerCase().includes(searchQuery.toLowerCase()) 

  );

////////////
      const statusObj = {
        approved: 'light-success',
        pending: 'light-warning'
      }
      

  return (

<Fragment>
 

      <Card className='overflow-hidden'>
                <div className="row" id="basic-table">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">All quizzes</h4>
                            </div>
                            <div className="card-body">
                            <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Search:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text' value={searchQuery} onChange={handleSearch}  />
              </div>
                            </div>
                     

                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Quiz Name</th>
                                            <th>Description</th>
                                            <th>status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                      
                                        {filteredQuizData.map((quiz) => (
                                         <tr key={quiz._id} >
                                            <td>{quiz._id}</td>
                                            <td>
                                            {quiz.quizName}
                                            </td>
                                            <td>{quiz.quizDescription}</td>
                                            <td>
                                                <Badge className='text-capitalize' color={statusObj[quiz.quiz_status]} pill>
                                                  {quiz.quiz_status}
                                              </Badge>
                                            </td>
                                            <td>
                                             <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
             
              className='w-100'
             
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem  onClick={() => approve(quiz._id)}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>approve</span>
            </DropdownItem>
            <DropdownItem
             
              className='w-100'
              onClick={() => Delete(quiz._id)}
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

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>














     )
   }
   
   export default quizTable
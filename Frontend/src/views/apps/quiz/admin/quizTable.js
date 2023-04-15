
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
    Label
  } from "reactstrap";
  import Select from 'react-select'
  import DataTable from 'react-data-table-component'

  import InputGroupAddon  from 'reactstrap';
  import ReactPaginate from "react-paginate";
  import axios from "axios";
  import { Fragment, useState, useEffect } from 'react'
import { Trash2 } from 'react-feather';
import quiz from '..';

const quizTable = () => {


    const [Quizs, setQuizs] = useState([])
    const[change,setChange]=useState(false)

    useEffect(() => {
  
        setChange(false)
            axios.get('http://localhost:5000/quiz/allquiz')
          .then(response => setQuizs(response.data))
      .catch(error => console.error(error));
      console.log(Quizs)
      }, [change]);
       
    
      const Delete = (id) => {
        axios.delete(`http://localhost:5000/quiz/delete/${id}`)
        .then(() => {
          // Remove the deleted quiz from the quizzes array
          const updatedQuizs = Quizs.filter((quiz) => quiz.id !== id);
          setQuizs(updatedQuizs);
          setChange(true)
        });
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
                                
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Quiz Name</th>
                                            <th>Description</th>
                                      
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    
                                      
                                        {Quizs .map((quiz) => (
                                         <tr key={quiz._id} >
                                            <td>{quiz._id}</td>
                                            <td>
                                            {quiz.quizName}
                                            </td>
                                            <td>{quiz.quizDescription}</td>
                                            <td>
                                             <Trash2 onClick={() => Delete(quiz._id)}/>
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
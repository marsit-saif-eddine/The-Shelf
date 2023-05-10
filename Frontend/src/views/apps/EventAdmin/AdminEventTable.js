
import { Container } from 'reactstrap'
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
import InputGroupAddon from 'reactstrap';
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Fragment, useState, useEffect } from 'react'
import { Trash2, MoreVertical, FileText, Archive,Layers } from 'react-feather';
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { useSelector } from "react-redux";

const eventTable = () => {

    const [totalEventsCount, setEventsCount] = useState(0);

    const [Events, setEvents] = useState([])
    const [change, setChange] = useState(false)

    const [pageNumber, setPageNumber] = useState(0);
    const offersPerPage = 5;
    const pagesVisited = pageNumber * offersPerPage;
    const socket = useSelector((state) => state.chat.socket);


    const get = ()=>{
        axios.get('http://localhost:5000/events')
        .then(response =>{
            setEvents(response.data);
          
            setEventsCount(response.data.length);
        }
           )
        
    .catch(error => console.error(error));
    }


    useEffect(() => {

        setChange(false)
        get();
        console.log(Events)
    }, [change]);


    const Delete = (event) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this item!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/events/delete/${event._id}`)
                    .then(() => {
                        socket.emit("event-deleted", {event});
                        const updatedEvents = Events.filter((event) => event.id !== event._id);
                        setEvents(updatedEvents);
                        setChange(true)
                    });
            }
        });
    }

    ///search////
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(Events);

    const handleSearch = (event) => {
        const query = event.target.value;

        setSearchQuery(query);
    };
    const filteredEventsData = Events.filter(
        (event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())

    );

    ////////////
    const statusObj = {
        approved: 'light-success',
        pending: 'light-warning'
    }
    const generatePDF = () => {
        // Créer un nouveau document PDF
   const doc = new jsPDF();
   


   // Définir les en-têtes de colonne pour le tableau
   const headers = [["Name", "Description","StartDate", "EndDate", "Location","Image"]];

   // Obtenir les données du tableau
   const data = events.map(event => [event.name, event.description,event.startDate,event.endDate, event.location,event.image]);


   // Ajouter le tableau au document PDF avec la fonction autotable de jsPDF
   doc.autoTable({
     head: headers,
     body: data
   });


   // Sauvegarder le document PDF
   doc.save("events.pdf");
   }
     
  
     const pageCount = Math.ceil(Events.length / offersPerPage);
     const changePage = ({ selected }) => {
       setPageNumber(selected);
   };

    return (

        <Fragment>
<div className='app-user-list'>
    <Row>
    <Col lg='3' sm='6'>
        <StatsHorizontal
          color='primary'
          statTitle='Total Events'
          icon={<Layers size={20} />}
          renderStats={<h3 className='fw-bolder mb-75'>{totalEventsCount}</h3>}
        />
      </Col>
     

   
    
     
      </Row>
      </div>

            <Card className='overflow-hidden'>
                <div className="row" id="basic-table">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">All events</h4>
                            </div>
                            <div className="card-body">
                                <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                                    <label className='mb-0' htmlFor='search-invoice'>
                                        Search:
                                    </label>
                                    <Input
                                        id='search-invoice'
                                        className='ms-50 w-100'
                                        type='text' value={searchQuery} onChange={handleSearch} />
                                </div>
                            </div>


                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>StartDate</th>
                                            <th>EndDate</th>
                                            <th>Location</th>
                                            <th>Image</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {filteredEventsData.slice(pagesVisited, pagesVisited + offersPerPage).map((event) => (
                                            <tr key={event._id} >
                                                <td>{event.name}</td>
                                                <td>{event.description}</td>
                                                <td>{event.startDate}</td>
                                                <td>{event.endDate}</td>
                                                <td>{event.location}</td>
                                                <td> <img width={50} src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`} alt={event.name} /></td>

                                                <td>
                                                    <div className='column-action'>
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle tag='div' className='btn btn-sm'>
                                                                <MoreVertical size={14} className='cursor-pointer' />
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                                                                              <DropdownItem

                                                                    className='w-100'
                                                                    onClick={() => Delete(event)}
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
                                <br></br>
                                <ReactPaginate
                  previousLabel={'Previous'}
                  nextLabel={'Next'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={'pagination'}
                  previousLinkClassName={'previous_page'}
                  nextLinkClassName={'next_page'}
                  disabledClassName={'disabled'}
                  activeClassName={'active'}
                />
                {/* <Button 
                  variant="success"
                  onClick={generatePDF}>Export to PDF</Button> */}
                            </div>
                        </div>
                    </div>
                </div>

            </Card>

            {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
        </Fragment>














    )
}

export default eventTable
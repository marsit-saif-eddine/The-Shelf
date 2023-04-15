
import React, { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "../EventAdmin/eventadmin.css"

// reactstrap components
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
  InputGroupText
} from "reactstrap";
import InputGroupAddon  from 'reactstrap';
import ReactPaginate from "react-paginate";
import axios from "axios";

function ViewOffers() {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState('');



    const [pageNumber, setPageNumber] = useState(0);
    const offersPerPage = 5;
    const pagesVisited = pageNumber * offersPerPage;




    async function getUsers() {
      try {
        const response = await axios.get('http://localhost:5000/events');
        console.log(response)
        const data = response.data;
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    }
    

    useEffect(()=>{getUsers()},[]);

    //SEARCH
    // async function searchOffers() {
    //   fetch(`${API}/Offer/search/${searchTerm}`,{
    //     credentials: 'include'
    //   })
    //   .then((res)=> setSearchResults(res.data))
    //   .catch(error => console.error(error));
    // }

    // useEffect(()=>{searchOffers()},[]);

    // const handleSubmit = async(e) => {
    //   e.preventDefault();

    //   try {
    //     await fetch(`${API}/Offer/search?query=${searchTerm}`, {
    //       method: "GET",
    //       credentials: 'include',
    //     })
    //   .then((res)=> setSearchResults(res.data))
 
    //   } catch (error) {
    //     console.error("There was a problem with the SEARCH operation:", error);
    //   }
    // }
    const handleSearchChange = (e) => {
      setSearchText(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.get(`http://localhost:5000/events/search?query=${searchText}`);
        setEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };



    const deleteOffer = async (_id) => {
      try {
        const result = window.confirm("Are you sure you want to delete?");

        const res = await axios.delete(`/events/delete/${_id}`);
        console.log(res.data);
        setTimeout(() => setSuccessMessage(null), 3000);
  
  
        // Remove the deleted event from the list of events
        setEvents(events.filter(event => event._id !== _id));
  
      } catch (err) {
        console.error(err);
  
        // Implement logic to show an error message
      }
    };

    //------------------ Search ------------------------------------//
    // const handleSearch = async() => {
    //   const query = `title:${searchText} OR type_offre:${searchText} OR duration:${searchText} OR location:${searchText}`;
    //   try {
    //     const response = await fetch(`http://localhost:5000/searchOffers?query=${query}`);
    //     if (response.ok) {
    //       const data = await response.json();
    //       setOffers(data);
    //     } else {
    //       console.log('Error retrieving offers');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // const editOffer =  (id)=>{
    //   history.push(`/admin/editOffer/?id=${id}`);
    // }

//---------------------- Pagination ------------------------------------------//
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
      }
    
    //   const paginationItems = [];
    //   for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    //     paginationItems.push(
    //       <PaginationItem
    //         key={pageNumber}
    //         active={pageNumber === activePage}
    //       >
    //         <PaginationLink onClick={() => handlePageChange(pageNumber)}>
    //           {pageNumber}
    //         </PaginationLink>
    //       </PaginationItem>
    //     );
    //   }

      //------------------------------ PDF ------------------------------------------//
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
      
   
      const pageCount = Math.ceil(events.length / offersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

  return (
    <>
   

      <div className="cards-container">

      {/* <div className="search-container">
  <Input
    type="text"
    placeholder="Search..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
  />
  <button onClick={handleSearch}>Search</button>
</div> */}
        <Row>
          <Col md="12">

            <Card>
<br></br>
<br></br>

<form onSubmit={handleSearchSubmit}>
      <div className="input-group">
        <div className="input-group-prepend">
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-dark" data-mdb-ripple-color="dark">Search</button>
        </div>
      </div>
    </form>
              {/* <Form onSubmit={handleSearchSubmit}>

              <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText><i className="nc-icon nc-zoom-split"></i></InputGroupText>
        </InputGroupAddon>
        <Input
                          placeholder="search"
                          type="text"
                          value={searchText}
                          onChange={handleSearchChange}
                        />
      </InputGroup>
                       
                        <Button
                        variant= "success"
                        type="submit"
                        >Search</Button>
              </Form> */}

              <CardHeader>
                <CardTitle tag="h4" style={{fontWeight: "bold"}}>Display All Events</CardTitle>
              </CardHeader>

         

              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>StartDate</th>
                      <th>EndDate</th>
                      <th>Location</th>
                      <th>Image</th>
                      <th>Actions</th>



                      {/* <th>Actions</th> */}

                    </tr>
                  </thead>
                  <tbody>
                  {events
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 .slice(pagesVisited, pagesVisited + offersPerPage)
                  .map((event) => (
                     <tr key={event._id} >
                     <td>{event.name}</td>
                     <td>{event.description}</td>
                     <td>{event.startDate}</td>
                     <td>{event.endDate}</td>
                     <td>{event.location}</td>
                     <td> <img width={50} src={`http://localhost:5000/uploads/${event?.image?.substr(8)}`} alt={event.name} /></td>



                     <td><Button
                      style={{marginTop: "22px" }}
                      variant="danger"
                      onClick={()=> deleteOffer(event._id)}
                     >Delete</Button></td>

                     {/* <td>
                      <Button
                       style={{marginTop: "22px" }}
                       variant="secondary"
                       onClick={()=> editOffer(offer._id)}
                      >Edit</Button>
                     </td> */}

                     
                 </tr>
                  ))}
                  </tbody>
                </Table>
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
                <br></br>
                <Button 
                  variant="success"
                  onClick={generatePDF}>Export to PDF</Button>

               
                
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    </>
  );
}

export default ViewOffers;

import { Container } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import Avatar from "@components/avatar";

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
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

import Select from "react-select";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import InputGroupAddon from "reactstrap";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import {
  Trash2,
  MoreVertical,
  FileText,
  Archive,
  Check,
  Layers,
  Clock,
} from "react-feather";
import quiz from "..";
import { useParams } from "react-router-dom";
import { store } from "@store/store";
import { getUser } from "../../user/store";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { useSelector } from "react-redux";

const quizTable = () => {
  const [show, setShow] = useState(false);

  const [Quizs, setQuizs] = useState([]);
  const [change, setChange] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all"); // default to show all quizzes
  const [approvedQuizCount, setApprovedQuizCount] = useState(0);
  const [pendingQuizzesCount, setPendingQuizzes] = useState(0);
  const [totalQuizsCount, setQuizsCount] = useState(0);
  const socket = useSelector((state) => state.chat.socket);

  const get = () => {
    axios
      .get("http://localhost:5000/quiz/allquiz")
      .then((response) => {
        setQuizs(response.data);
        const approvedQuizzes = response.data.filter(
          (quiz) => quiz.quiz_status === "approved"
        );
        const pendingQuizzes = response.data.filter(
          (quiz) => quiz.quiz_status === "pending"
        );
        setQuizsCount(response.data.length);

        setApprovedQuizCount(approvedQuizzes.length);
        setPendingQuizzes(pendingQuizzes.length);
      })

      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setChange(false);
    get();
    console.log(Quizs);
  }, [change]);

  const Delete = (quiz) => {
    console.log({quiz});

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        
        axios.delete(`http://localhost:5000/quiz/delete/${quiz._id}`).then(() => {
          try{

          socket.emit("quizz-deleted", {quiz});
          console.log("emitted");
          }
          catch(err){
            console.log(err);

          }
          // Remove the deleted quiz from the quizzes array
          const updatedQuizs = Quizs.filter((q) => q._id !== quiz._id);
          setQuizs(updatedQuizs);
          setChange(true);
        });
      }
    });
  };

  const approve = (quizz) => {
    Swal.fire({
      title: "Are you sure?",
      text: "do you want to approve this quiz",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:5000/quiz/approvequiz/${quizz._id}`)
          .then((response) => {
            socket.emit("quizz-approved", quizz);
            console.log(quizz);
            setChange(true);
            console.log(response);
          })
          .catch((error) => {
            // handle error
            console.log(error);
          });
      }
    });
  };
  ///////////////////details////////
  const [quiz, setQuiz] = useState([]);

  //const { id } = useParams();
  const details = (id) => {
    axios
      .get(`http://localhost:5000/quiz/${id}`)
      //  .then(response => console.log(response.data))
      .then((response) => setQuiz(response.data.quiz))

      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Process the user's answers and submit them to the database using an API call
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  //////////
  ///search////
  const [searchQuery, setSearchQuery] = useState("");
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
  ////////////////

  // const filteredQuizData = Quizs.filter((quiz) => {
  //   const nameMatch = quiz.quizName.toLowerCase().includes(searchQuery.toLowerCase());
  //   const statusMatch = statusFilter === 'all' || quiz.status === statusFilter;
  //   const bookIdMatch = quiz.book_id.toLowerCase().includes(searchQuery.toLowerCase());

  //   return nameMatch || statusMatch || bookIdMatch;
  // });

  // const handleStatusFilterChange = (event) => {
  //   const status = event.target.value;
  //   setStatusFilter(status);
  // };

  ////////////
  const statusObj = {
    approved: "light-success",
    pending: "light-warning",
  };

  return (
    <Fragment>
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Toatal Quizzes"
              icon={<Layers size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{totalQuizsCount}</h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Quizzes approved"
              icon={<Check size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{approvedQuizCount}</h3>
              }
            />
          </Col>

          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Quizzes pending"
              icon={<Clock size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{pendingQuizzesCount}</h3>
              }
            />
          </Col>
        </Row>
      </div>
      <Card className="overflow-hidden">
        <div className="row" id="basic-table">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">All quizzes</h4>
              </div>
              {/* <label htmlFor="status-filter">Filter by status:</label>
      <select id="status-filter" value={statusFilter} onChange={handleStatusFilterChange}>
        <option value="all">All</option>
        <option value="pending">pending</option>
        <option value="approved">approved</option>
       
      </select> */}
              <div className="card-body">
                <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                  <label className="mb-0" htmlFor="search-invoice">
                    Search:
                  </label>
                  <Input
                    id="search-invoice"
                    className="ms-50 w-100"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Quiz Name</th>
                      <th>Description</th>
                      <th>Creator</th>
                      <th>status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuizData.map((quiz) => (
                      <tr key={quiz._id}>
                        <td>{quiz.quizName}</td>
                        <td>{quiz.quizDescription}</td>

                        <td className="fw-bolder">
                          <Link
                            to={`/pages/profile/${quiz.user_id}`}
                            className="user_name text-truncate text-body"
                            onClick={() =>
                              store.dispatch(getUser(quiz.user_id))
                            }
                          >
                            <Avatar
                              className="me-1"
                              img={quiz.creator_pic}
                              width="32"
                              height="32"
                            />
                            {quiz.creator}
                          </Link>
                        </td>

                        <td>
                          <Badge
                            className="text-capitalize"
                            color={statusObj[quiz.quiz_status]}
                            pill
                          >
                            {quiz.quiz_status}
                          </Badge>
                        </td>
                        <td>
                          <div className="column-action">
                            <UncontrolledDropdown>
                              <DropdownToggle tag="div" className="btn btn-sm">
                                <MoreVertical
                                  size={14}
                                  className="cursor-pointer"
                                />
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  className="w-100"
                                  onClick={() => {
                                    details(quiz._id);
                                    setShow(true);
                                  }}
                                >
                                  <FileText size={14} className="me-50" />
                                  <span className="align-middle">Details</span>
                                </DropdownItem>
                                <DropdownItem onClick={() => approve(quiz)}>
                                  <Archive size={14} className="me-50" />
                                  <span className="align-middle">approve</span>
                                </DropdownItem>
                                <DropdownItem
                                  className="w-100"
                                  onClick={() => Delete(quiz)}
                                >
                                  <Trash2 size={14} className="me-50" />
                                  <span className="align-middle">Delete</span>
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

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Quiz : {quiz.quizName}</h1>
            <p> description : {quiz.quizDescription} </p>
          </div>
          <div>
            <Form>
              {quiz.questions?.map((question, index) => (
                <div key={question._id.$oid}>
                  <h2>Question {index + 1}</h2>
                  <p>{question.questionText}</p>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <Input
                        type={question.questionType}
                        name={"question_" + index}
                        value={option.optionText}
                        id={"question_" + index + "_option_" + optionIndex}
                      />
                      <label
                        htmlFor={"question_" + index + "_option_" + optionIndex}
                      >
                        {option.optionText}
                      </label>
                    </div>
                  ))}
                  <label> the correct answer is : </label>
                  <p>{question.answerkey}</p>
                </div>
              ))}
            </Form>
          </div>
        </ModalBody>
      </Modal>

      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export default quizTable;

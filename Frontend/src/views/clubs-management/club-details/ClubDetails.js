import React, { useEffect, useState } from "react";
import {
  Check,
  Briefcase,
  X,
  Calendar,
  Users,
  Trash,
  Edit,
} from "react-feather";
import { Badge } from "reactstrap";
import NavTabs from "./NavTabs";
import "./styles.scss";
import "../clubs/club-styles.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteClub, setCurrentClub } from "../../../redux/clubs";
import ConfirmationModal from "../modals/ConfirmationModal";
import AdminsListModal from "../modals/AdminsListModal";

const ClubDetails = () => {
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openAdminsModal, setOpenAdminsModal] = useState(false);

  const [club, setClub] = useState(null);

  useEffect(() => {
    getClubDetails();
    console.log(club);
  }, []);

  const getClubDetails = () => {
    axios
      .get("http://localhost:5000/clubs/getClubDetails", {
        params: { club_id: params.id },
      })
      .then((resp) => {
        console.log(resp.data);
        setClub(resp.data);
        dispatch(setCurrentClub(resp.data));
      })
      .catch(() => {});
  };

  return (
    <div className="clubs-list club-details">
      {/* START LOGO, DESCRIPTION AND ADMINS ROW */}

      {club ? (
        <div className="row match-height">
          <div className="col-md-8">
            <div className="main-card card">
              {club.admins.findIndex((x) => x._id === currentUser._id) > -1 ||
              club.created_by._id === currentUser._id ? (
                <div className="action-btns-container">
                  <div
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="action-btn bg-danger text-white"
                  >
                    <Trash size={12} />
                  </div>
                  <div
                    className="action-btn bg-warning text-white"
                    onClick={() => navigate("/apps/clubs/edit/" + club._id)}
                    style={{ borderLeft: "1px solid #8080803b" }}
                  >
                    <Edit size={12} />
                  </div>
                </div>
              ) : null}

              <div className="card-body d-flex flex-column justify-content-between">
                <div className="row">
                  <div className="col-auto">
                    <img
                      src={"http://localhost:5000/" + club.logo}
                      width={"120px"}
                      className="rounded bg-light"
                      height={"120px"}
                    />
                  </div>
                  <div className="col">
                    <h4>{club.club_name}</h4>
                    <p
                      dangerouslySetInnerHTML={{ __html: club.description }}
                    ></p>
                  </div>
                </div>

                <div className="col-12 row mt-2">
                  <div className="col-md-4 mb-md-0 mb-1 d-flex align-items-start">
                    <Badge color="light-danger" className="rounded p-75">
                      <Calendar className="font-medium-2" />
                    </Badge>
                    <div className="ms-75">
                      <h5 className="mb-0">1.23k</h5>
                      <small>Events planned</small>
                    </div>
                  </div>

                  <div className="col-md-4 mb-md-0 mb-1 d-flex align-items-start">
                    <Badge color="light-success" className="rounded p-75">
                      <Users className="font-medium-2" />
                    </Badge>
                    <div className="ms-75">
                      <h5 className="mb-0">{club.members?.length || 0}</h5>
                      <small>Members</small>
                    </div>
                  </div>

                  <div className="col-md-4 d-flex align-items-start">
                    <img
                      src={"http://localhost:5000/" + club.created_by.photo}
                      className="rounded"
                      width="40px"
                      height="40px"
                    />
                    <div className="ms-75">
                      <h5 className="mb-0">
                        {club.created_by.lastname +
                          " " +
                          club.created_by.firstname}
                      </h5>
                      <small>Created by</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Administrators</h5>
              </div>
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="row m-0">
                  {club.admins?.map((x, index) => {
                    if (index < 4)
                      return (
                        <div
                          key={index}
                          className="col-xl-3 col-lg-4 col-md-6 col-sm-4 mb-1 admin-avatar"
                        >
                          <div className="card">
                            <div className="card admin-details-card">
                              <span className="text-nowrap mb-1">
                                {x.lastname + " " + x.firstname}
                              </span>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                  navigate("/pages/profile/" + x._id)
                                }
                              >
                                See profile
                              </button>
                            </div>
                            <img
                              className="rounded"
                              src={"http://localhost:5000/" + x.photo}
                            />
                          </div>
                        </div>
                      );
                  })}
                </div>
                {
                  club.admins?.length > 4 ?
                  <span className="text-muted text-center">
                    {"+" + (club.admins?.length - 4) + " admins"}
                  </span>
                  : null
                }
                <div className="row justify-content-center m-0">
                  <button className="btn btn-flat-primary btn-sm" onClick={() => setOpenAdminsModal(true)}>
                    See all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* END LOGO, DESCRIPTION AND ADMINS ROW */}

      {/* START NAV TABS */}
      <NavTabs />
      {/* END NAV TABS */}
      

      <ConfirmationModal isOpen={openModal} confirmAction={() => {dispatch(deleteClub({ club_id: club._id })); setOpenModal(false); navigate('/apps/clubs/list')}} buttonText="Delete" body="Do you realy want to delete this club? All its announcements, events and conversations are going to be deleted too." setOpenModal={setOpenModal}  />
      
      <AdminsListModal isOpen={openAdminsModal} admins={club?.admins} setOpenModal={setOpenAdminsModal}></AdminsListModal>
    </div>
  );
};

export default ClubDetails;

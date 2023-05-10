import React, { useEffect, useState } from "react";
import { Edit, LogIn, Trash } from "react-feather";
import axios from "axios";

import AvatarGroup from "@components/avatar-group";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  cancelJoinRequest,
  deleteClub,
  sendJoinClubRequest,
} from "../../../redux/clubs";
import ConfirmationModal from "../modals/ConfirmationModal";

const ClubCard = (props) => {
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const [club, setClub] = useState(props.club);
  const [members, setMembers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [memberShipStatus, setMemberShipStatus] = useState("none");

  useEffect(() => {
    setMemberShipStatus(
      club.members
        ? club.members.findIndex(
            (x) => x._id === currentUser._id && !x.pending
          ) != -1
          ? "member"
          : club.members.findIndex(
              (x) => x._id === currentUser._id && x.pending
            ) != -1
          ? "pending"
          : "none"
        : "none"
    );
  }, []);
  return (
    <div className="col-lg-6 col-12 mb-2">
      <div className="card header-card">
        <h4>{club.club_name}</h4>
      </div>

      <div className="card main-card custom-card">
        {(club.admins.findIndex(x => x._id === currentUser._id) > -1 || club.created_by._id === currentUser._id || currentUser.role === 'admin') ? (
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
              onClick={() => navigate((currentUser.role === "admin" ? "/apps/clubs/edit/" : "/apps/clubs/editt/") + club._id)}
              style={{ borderLeft: "1px solid #8080803b" }}
            >
              <Edit size={12} />
            </div>
          </div>
        ) : null}

        <div className="row flex-nowrap m-0">
          <div className="card user-avatar">
            <img
              src={"http://localhost:5000/" + club.logo}
              className="bg-light"
              width={"100px"}
              height={"100px"}
            />
          </div>

          <div className="infos-column">
            <div
              dangerouslySetInnerHTML={{ __html: club.description }}
              className="text-muted font-small-3"
            ></div>
          </div>
        </div>

        <div className="row row-cols-auto mx-1 mb-1 flex-nowrap align-items-center justify-content-between">
          <div className="col p-0">
            <div className="row m-0 align-items-center">
              {members.length > 8 ? (
                <div className="col p-0">
                  <span className="text-muted font-small-2 mr-1 lh-1">
                    + {members.length - 8} <br /> plus
                  </span>
                </div>
              ) : (
                ""
              )}

              {club.members ? (
                <div className="col p-0">
                  <AvatarGroup
                    data={club.members
                      ?.filter((x) => !x.pending)
                      .map((x) => {
                        return {
                          title: x.lastname + " " + x.firstname,
                          img: "http://localhost:5000/" + x.profile_photo,
                        };
                      })
                      .splice(0, 8)}
                  ></AvatarGroup>
                </div>
              ) : null}
            </div>
          </div>

          {currentUser.role === "admin" || memberShipStatus === "member" ? (
            <button
              className="btn btn-gradient-primary"
              onClick={() => navigate((currentUser.role === "admin" ? "/apps/clubs/details/" : "/apps/clubs/detailss/") + club._id)}
            >
              Details
            </button>
          ) : memberShipStatus === "none" ? (
            <button
              className="btn btn-gradient-primary"
              onClick={() => {
                dispatch(sendJoinClubRequest({ club_id: club._id }));
                setMemberShipStatus("pending");
              }}
            >
              Join group
            </button>
          ) : memberShipStatus === "pending" ? (
            <button
              className="btn btn-gradient-primary"
              onClick={() => {
                dispatch(
                  cancelJoinRequest({
                    club_id: club._id,
                    user_id: currentUser._id,
                  })
                );
                setMemberShipStatus("none");
              }}
            >
              Cancel join request
            </button>
          ) : null}
        </div>
      </div>

      <ConfirmationModal isOpen={openModal} confirmAction={() => {dispatch(deleteClub({ club_id: club._id })); setOpenModal(false)}} buttonText="Delete" body="Do you realy want to delete this club? All its announcements, events and conversations are going to be deleted too." setOpenModal={setOpenModal}  />
    </div>
  );
};

export default ClubCard;

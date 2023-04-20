import React, { useEffect, useState } from "react";
import { Edit, LogIn, Trash } from "react-feather";
import axios from "axios";

import AvatarGroup from "@components/avatar-group";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cancelJoinRequest, deleteClub, sendJoinClubRequest } from "../../../redux/clubs";

const data = [
  {
    img: require("@src/assets/images/portrait/small/avatar-s-7.jpg").default,
  },
  {
    img: require("@src/assets/images/portrait/small/avatar-s-11.jpg").default,
  },
  {
    img: require("@src/assets/images/portrait/small/avatar-s-7.jpg").default,
  },
  {
    img: require("@src/assets/images/portrait/small/avatar-s-11.jpg").default,
  },
  {
    img: require("@src/assets/images/portrait/small/avatar-s-7.jpg").default,
  },
];

const ClubCard = (props) => {
  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const [club, setClub] = useState(props.club);
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  const [memberShipStatus, setMemberShipStatus] = useState(
    props.memberShipStatus
  );
  useEffect(() => {
    setMemberShipStatus(club.members ?
      (
        club.members.findIndex(x => x._id === currentUser.id && !x.pending) != -1?
        'member' : club.members.findIndex(x => x._id === currentUser.id && x.pending) != -1 ?
        'pending' : 'none'
      ) : 'none');

    if (club.members)
      setMembers(
        [...club.members
          ?.filter((x) => !x.pending)
          .map((x) => {
            return { title: x.lastname + " " + x.firstname, img: x.photo };
          })]
      );
  }, [club]);
  return (
    <div className="col-lg-6 col-12">
      <div className="card header-card">
        <h4>{club.club_name}</h4>
      </div>

      <div className="card main-card">
        {currentUser.is_admin ? (
          <div className="action-btns-container">
            <div
              onClick={() => {dispatch(deleteClub({club_id: club._id}))}}
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

        <div className="row flex-nowrap m-0">
          <div className="card user-avatar">
            <img src={club.logo} width={"100"} height={"100"} />
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

              <div className="col p-0">
                <AvatarGroup data={members.splice(0, 8)}></AvatarGroup>
              </div>

            </div>
          </div>

          {currentUser.is_admin || memberShipStatus === 'member' ? (
           <button
           className="btn btn-gradient-primary"
           onClick={() => navigate("/apps/clubs/details/" + club._id)}
         >
           Details
         </button>
        ) : memberShipStatus === "none" ? (
          <button
          className="btn btn-gradient-primary"
          onClick={() => {dispatch(sendJoinClubRequest({club_id: club._id})); setMemberShipStatus('pending')}}
        >
          Join group
        </button>
        ) : memberShipStatus === "pending" ? (
          <button
          className="btn btn-gradient-primary"
          onClick={() => {dispatch(cancelJoinRequest({club_id: club._id, user_id: currentUser.id})); setMemberShipStatus('none')}}
        >
          Cancel join request
        </button>
        ) : null}
         
        </div>
      </div>
    </div>
  );
};

export default ClubCard;

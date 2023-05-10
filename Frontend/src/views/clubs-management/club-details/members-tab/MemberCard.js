import React from "react";
import { Check, Info, Mail, Trash, User, X } from "react-feather";
import banner from '@src/assets/images/pages/banner1.png';
import { useDispatch } from "react-redux";
import axios from "axios";
import { addChatBox, addChatBubble } from "../../../../redux/chat";
import { useNavigate } from "react-router-dom";

const MemberCard = ({member, acceptRequest, rejectRequest}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className="col-xl-3 col-lg-4 col-md-6 col-12 d-flex align-items-stretch">
        <div className="card card-profile">
          <img
            src={banner}
            className="img-fluid card-img-top"
            alt="Profile Cover Photo"
          />
          <div className="card-body">
            <div className="profile-image-wrapper">
              <div className="profile-image">
                <div className="avatar">
                  <img src={'http://localhost:5000/' + member.photo} />
                </div>
              </div>
            </div>
            <h3 className="mb-0">{member.lastname + " " + member.firstname}</h3>
            <h6 className="text-muted mb-0">{member.email}</h6>
            <h6 className="text-muted mb-0">{member.phone_number}</h6>

            <hr className="mb-2" />

            {
              member.pending ? <div className="d-flex justify-content-center align-items-center">
              <button onClick={() => rejectRequest(member._id)} className="btn btn-outline-danger expandable-btn me-1">
                <X className="font-medium-2"></X>
                <span>Reject</span>
              </button>

              <button onClick={() => acceptRequest(member._id)} className="btn btn-outline-success expandable-btn me-1">
                <Check className="font-medium-2"></Check>
                <span>Accept</span>
              </button>
            </div> : 
            <div className="d-flex justify-content-center align-items-center">
            <button onClick={() => dispatch(addChatBox(member))} className="btn btn-outline-success expandable-btn me-1">
              <Mail className="font-medium-2"></Mail>
              <span>Message</span>
            </button>

            <button className="btn btn-outline-primary expandable-btn me-1" onClick={() => navigate("/pages/profile/" + member._id)}>
              <User className="font-medium-2"></User>
              <span>Profile</span>
            </button>
          </div>
            }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;

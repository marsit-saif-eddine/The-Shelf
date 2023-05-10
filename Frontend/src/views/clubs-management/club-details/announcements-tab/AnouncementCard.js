import React, { useState } from "react";
import { Trash } from "react-feather";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useDispatch } from "react-redux";
import { deleteClubAnnouncement } from "../../../../redux/clubs";

const AnnouncementsCard = ({ announcement }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div className="col-12 announcement-container">
        <div className="row m-0">
          <div className="col-auto card p-50 m-0 ms-1">
            <img
              src={"http://localhost:5000/" + announcement.publisher.profile_photo}
              height="85px"
              width="85px"
            />
          </div>
          <div className="col py-50">
            <h5 className="m-0 lh-0">
              {announcement.publisher.lastname +
                " " +
                announcement.publisher.firstname}
            </h5>
            <small className="text-muted">
              {new Date(announcement.creation_date).toLocaleString("en-US")}
            </small>
          </div>
          {(currentUser.role === "admin" ||
            currentUser._id === announcement.publisher._id) && (
            <div className="col d-flex justify-content-end">
              <button
                className="btn btn-outline-danger expandable-btn me-1"
                onClick={() => setOpenModal(true)}
              >
                <Trash className="font-medium-2"></Trash>
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
        <div className="card announcement-text">
          <div
            className="card-body"
            dangerouslySetInnerHTML={{ __html: announcement.text }}
          ></div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={openModal}
        confirmAction={() => {
          dispatch(deleteClubAnnouncement({ _id: announcement._id }));
          setOpenModal(false);
        }}
        buttonText="Delete"
        body="Do you realy want to delete this announcement?."
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default AnnouncementsCard;

import React from "react";
import { Trash } from "react-feather";

const AnnouncementsCard = ({
  announcement,
  deleteAnnouncement,
  like,
  dislike,
}) => {
  return (
    <div className="col-12 announcement-container">
      <div className="row m-0">
        <div className="col-auto card p-50 m-0 ms-1">
          <img
            src="https://graphicriver.img.customer.envatousercontent.com/files/395988839/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=9133752d1e9837a45f7a15ed2d820778"
            height="85px"
            width="85px"
          />
        </div>
        <div className="col py-50">
          <h5 className="m-0 lh-0">{announcement.publisher.lastname + ' ' + announcement.publisher.firstname}</h5>
          <small className="text-muted">20/12/2023 at 12:30</small>
        </div>
        <div className="col d-flex justify-content-end">
        <button className="btn btn-outline-danger expandable-btn me-1" onClick={() => deleteAnnouncement(announcement._id)}>
                <Trash className="font-medium-2"></Trash>
                <span>Delete</span>
              </button>
        </div>
      </div>
      <div className="card announcement-text">
        <div
          className="card-body"
          dangerouslySetInnerHTML={{ __html: announcement.text }}
        >
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsCard;

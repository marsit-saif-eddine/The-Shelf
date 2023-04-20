import React, { useEffect, useState } from "react";
import { Check, Briefcase, X, Calendar, Users } from "react-feather";
import { Badge } from "reactstrap";
import NavTabs from "./NavTabs";
import "./styles.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import ChatBubbles from "../chat-bubbles/ChatBubbles";
import { useDispatch } from "react-redux";
import { setCurrentClub } from "../../../redux/clubs";

const ClubDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [club, setClub] = useState({});

  useEffect(() => {
    getClubDetails();
  }, []);

  const getClubDetails = () => {
    axios
      .get("http://localhost:5000/clubs/getClubDetails", {
        params: { club_id: params.id },
      })
      .then((resp) => {
        setClub(resp.data);
        dispatch(setCurrentClub(resp.data));

      })
      .catch(() => {});
  };

  return (
    <div className="club-details">
      {/* START LOGO, DESCRIPTION AND ADMINS ROW */}

      <div className="row match-height">
        <div className="col-8">
          <div className="card">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-auto">
                  <img
                    src="https://graphicriver.img.customer.envatousercontent.com/files/395988839/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=9133752d1e9837a45f7a15ed2d820778"
                    width={"120px"}
                    className="rounded"
                    height={"120px"}
                  />
                </div>
                <div className="col">
                  <h4>{club.club_name}</h4>
                  <p dangerouslySetInnerHTML={{ __html: club.description }}>
                  </p>
                </div>
              </div>

              <div className="d-flex justify-content-around pt-75">
                <div className="d-flex align-items-start me-2">
                  <Badge color="light-danger" className="rounded p-75">
                    <Calendar className="font-medium-2" />
                  </Badge>
                  <div className="ms-75">
                    <h4 className="mb-0">1.23k</h4>
                    <small>Events planned</small>
                  </div>
                </div>

                <div className="d-flex align-items-start me-2">
                  <Badge color="light-success" className="rounded p-75">
                    <Users className="font-medium-2" />
                  </Badge>
                  <div className="ms-75">
                    <h4 className="mb-0">{club.members?.length}</h4>
                    <small>Members</small>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <img
                    src="https://graphicriver.img.customer.envatousercontent.com/files/395988839/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=9133752d1e9837a45f7a15ed2d820778"
                    className="rounded"
                    width="40px"
                  />
                  <div className="ms-75">
                    <h4 className="mb-0">Abidi Wajih</h4>
                    <small>Created by</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Administrators</h5>
            </div>
            <div className="card-body">
              <div className="row m-0">
                {club.admins?.map((x, index) => {
                  return (
                    <div key={index} className="col-3 mb-1">
                      <img
                        width="100%"
                        className="rounded"
                        src="https://graphicriver.img.customer.envatousercontent.com/files/395988839/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=9133752d1e9837a45f7a15ed2d820778"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* END LOGO, DESCRIPTION AND ADMINS ROW */}

      {/* START NAV TABS */}
      <NavTabs />
      {/* END NAV TABS */}
      <ChatBubbles/>
    </div>
  );
};

export default ClubDetails;

import React, { useEffect, useState } from "react";
import ClubCard from "./ClubCard";
import "./club-styles.scss";

import axios from "axios";
import ChatBox from "../chatBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteClub, getClubs, rejectMember } from "../../../redux/clubs";
import { Link } from "react-router-dom";

const ClubsList = () => {
  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const clubs = useSelector((state) => state.clubs.clubsList);
  const [showBox, setShowBox] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClubs());
  }, []);

  const hideBox = () => {
    setShowBox(false);
  };

  return (
    <div className="clubs-list">
      <div className="row">
        <div className="col-auto">
          <h1>Clubs list</h1>
        </div>
        <div className="col d-flex justify-content-end">
          <Link to="/apps/clubs/add">
            <button className="btn btn-outline-primary">Create a club</button>
          </Link>
        </div>
      </div>
      <div className="row match-height">
        {clubs?.map((club) => (
          <ClubCard key={club._id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubsList;

import React, { useEffect, useState } from "react";
import ClubCard from "./ClubCard";
import "./club-styles.scss";

import axios from "axios";
import ChatBox from "../chatBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteClub, getClubs, rejectMember } from "../../../redux/clubs";
import { Link } from "react-router-dom";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { Search } from "react-feather";

const ClubsList = () => {
  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const clubs = useSelector((state) => state.clubs.clubsList);
  const [searchText, setSearchText] = useState('');
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
          <h1>Clubs</h1>
        </div>
        <div className="col d-flex justify-content-end">
          <Link to={currentUser.role === "admin" ? "/apps/clubs/add" : "/apps/clubs/add"}>
            <button className="btn btn-outline-primary">Create a club</button>
          </Link>
        </div>
      </div>
      <div className="col-12 mt-1 mb-50">
      <InputGroup className='input-group-merge'>
        <Input placeholder='search...' onChange={e => setSearchText(e.target.value)} />
        <InputGroupText>
            <Search size={14} />
          </InputGroupText>
      </InputGroup>
      </div>
      <div className="row match-height">
        {clubs?.filter(x => searchText ? x.club_name.toLowerCase().includes(searchText.toLowerCase()): true).map((club) => (
          <ClubCard key={club._id} club={club} />
        ))}
      </div>
    </div>
  );
};

export default ClubsList;

import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { Search } from "react-feather";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { acceptMember, rejectMember } from "../../../../redux/clubs";

const MembersTab = () => {
  const dispatch = useDispatch();
  const currentClub = useSelector(state => state.clubs.currentClub);
  
  useEffect(() => {
    //getMembers();
  }, [currentClub]);

  const getMembers = () => {
    axios.get('http://localhost:5000/clubs/getClubMembers', {params: {club_id: currentClub._id}}).then(resp => {
    }).catch(() => {});
  }

  const cancelJoinRequest = (user_id) => {
    axios.put('http://localhost:5000/clubs/cancelJoinRequest', {user_id}, {params: {club_id: currentClub._id}}).then(resp => {
      if (resp.data) {
        dispatch(rejectMember(user_id));
      }
    });
  }

  const acceptJoinRequest = (user_id) => {
    axios.put('http://localhost:5000/clubs/acceptJoinRequest', {user_id}, {params: {club_id: currentClub._id}}).then(resp => {
      if (resp.data) {
        dispatch(acceptMember(user_id));
      }
    });
  }

  return (
    <div className="row members-container">
      <div className="col-12 mb-1">
      <InputGroup className='input-group-merge'>
        <Input placeholder='search...' />
        <InputGroupText>
            <Search size={14} />
          </InputGroupText>
      </InputGroup>
      </div>
      {currentClub ? currentClub.members?.map((x, index) => {
        return <MemberCard member={x} acceptRequest={acceptJoinRequest} rejectRequest={cancelJoinRequest} key={index} />;
      }): ''}
    </div>
  );
};

export default MembersTab;

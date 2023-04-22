import React, { useEffect, useState } from "react";
import AnnouncementsCard from "./AnouncementCard";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteClubAnnouncement, getClubAnnouncements } from "../../../../redux/clubs";

const AnnouncementsList = () => {
  const announcements = useSelector(state => state.clubs.clubAnnouncements);
  const params = useParams();
  const dispatch = useDispatch();
  const club_id = params.id;

  useEffect(() => {
    dispatch(getClubAnnouncements({club_id}));
  }, []);

  return (
    <>
      {announcements.map((x, index) => {
        console.log(x);
        return (
            
          <AnnouncementsCard announcement={x} key={index}/>
        );
      })}
    </>
  );
};

export default AnnouncementsList;
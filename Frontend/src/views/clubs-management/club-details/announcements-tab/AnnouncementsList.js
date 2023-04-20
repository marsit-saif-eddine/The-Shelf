import React, { useEffect, useState } from "react";
import AnnouncementsCard from "./AnouncementCard";
import axios from 'axios';
import { useParams } from "react-router-dom";

const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const params = useParams();
  const club_id = params.id;

  useEffect(() => {
    getClubAnnouncements();
  }, []);

  const getClubAnnouncements = () => {
    axios.get('http://localhost:5000/clubs/getClubAnnouncements', {params: {club_id}}).then(resp => {
      setAnnouncements(resp.data);
    });
  }

  const deleteAnnouncement = (_id) => {
    axios.delete('http://localhost:5000/clubs/deleteAnnouncement', {params: {_id}}).then(resp => {
      const index = announcements.findIndex(x => x._id === _id);
      console.log(index)
      announcements.splice(index, 1);
      setAnnouncements([...announcements]);
    });
  }

  return (
    <>
      {announcements.map((x, index) => {
        return (
            
          <AnnouncementsCard announcement={x} deleteAnnouncement={deleteAnnouncement} key={index}/>
        );
      })}
    </>
  );
};

export default AnnouncementsList;
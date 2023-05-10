import React, { useEffect, useState } from "react";
import { Search } from "react-feather";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import EventsCard from "./EventsCard";
import { useDispatch, useSelector } from "react-redux";
import { getClubEvents } from "../../../../redux/clubs";
import AddClubEventModal from "./AddEventModal";

const EventsTab = () => {
  const events = useSelector((state) => state.clubs.events);
  const [searchText, setSearchText] = useState("");
  const currentClub = useSelector((state) => state.clubs.currentClub);
  const [openAddModal, setOpenAddModal] = useState(false);
  const dispatch = useDispatch();


  const getEvents = () => dispatch(getClubEvents({ club_id: currentClub._id }));


  useEffect(() => {
      getEvents();
  
  }, [currentClub]);

  return (
    <>
      <div className="row events-container">
        <div className="col mb-1">
          <InputGroup className="input-group-merge">
            <Input
              placeholder="search..."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
          </InputGroup>
        </div>
        <div className="col-auto mb-1">
          <button className="btn btn-gradient-primary"
            onClick={() => {
              setOpenAddModal(true);
              console.log(openAddModal);
            }}
          >
            Add event
          </button>
        </div>
      </div>

      <div className="row events-container">
        {events
          .filter((x) =>
            searchText
              ? x.name.toLowerCase().includes(searchText.toLowerCase())
              : true
          )
          .map((x, index) => {
            return <EventsCard key={index} event={x} />;
          })}

        <AddClubEventModal
          isOpen={openAddModal}
          club_id={currentClub?._id}
          setOpenModal={setOpenAddModal}
          getEvents={getEvents}
        ></AddClubEventModal>
      </div>
    </>
  );
};

export default EventsTab;

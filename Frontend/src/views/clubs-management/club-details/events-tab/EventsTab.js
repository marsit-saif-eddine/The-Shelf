import React, { useEffect, useState } from "react";
import { Search } from "react-feather";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import EventsCard from "./EventsCard";
import { useDispatch, useSelector } from "react-redux";
import { getClubEvents } from "../../../../redux/clubs";

const EventsTab = () => {
  const events = useSelector(state => state.clubs.events);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClubEvents());
  }, []);

  return (
    <div className="row events-container">
      <div className="col-12 mb-1">
      <InputGroup className='input-group-merge'>
        <Input placeholder='search...' onChange={e => setSearchText(e.target.value)} />
        <InputGroupText>
            <Search size={14} />
          </InputGroupText>
      </InputGroup>
      </div>
      {events.filter(x => searchText ? x.name.toLowerCase().includes(searchText.toLowerCase()) : true).map((x, index) => {
        return <EventsCard key={index} event={x} />;
      })}
    </div>
  );
};

export default EventsTab;

import React from "react";
import { Search } from "react-feather";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import EventsCard from "./EventsCard";

const EventsTab = () => {
  const events = ["", "", "", "", "", "", ""];

  return (
    <div className="row events-container">
      <div className="col-12 mb-1">
      <InputGroup className='input-group-merge'>
        <Input placeholder='search...' />
        <InputGroupText>
            <Search size={14} />
          </InputGroupText>
      </InputGroup>
      </div>
      {events.map((x, index) => {
        return <EventsCard key={index} />;
      })}
    </div>
  );
};

export default EventsTab;

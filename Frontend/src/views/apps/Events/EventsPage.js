import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AccountNav from "../Events/AccountNav";

import axios from "axios";
export default function EventsPage() {
  const [events,setEvents] = useState([]);
  useEffect(() => {
    axios.get('/eventcards').then(({data}) => {
      setEvents(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
  <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/eventsform'} style={{borderRadius: '999px'}}>
    <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
    Add new event
  </Link>
        </div>
        <div className="mt-4">
          {events.length > 0 && events.map(place => (
            <Link to={'/eventcards'} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                <PlaceImg events={events} />
              </div>
             
            </Link>
          ))}
        </div>
    </div>
  );
}
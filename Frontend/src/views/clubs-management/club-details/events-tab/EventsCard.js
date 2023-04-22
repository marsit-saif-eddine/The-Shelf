// ** Custom Components
import Avatar from "@components/avatar";
import AvatarGroup from "@components/avatar-group";

// ** Icons Imports
import { Calendar, MapPin } from "react-feather";

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

// ** Images
import illustration from "@src/assets/images/pages/email.svg";

const EventsCard = ({event}) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const data = [
    {
      title: "Billy Hopkins",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-7.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: "Amy Carson",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-11.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: "Brandon Miles",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-11.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: "Daisy Weber",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-7.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      title: "Jenny Looper",
      placement: "bottom",
      img: require("@src/assets/images/portrait/small/avatar-s-11.jpg").default,
      imgHeight: 33,
      imgWidth: 33,
    },
    {
      meta: "+42",
    },
  ];

  return (
    <div className="col-lg-4 col-md-6 col-12">
      <Card className="card-developer-meetup">
        <div className="meetup-img-wrapper rounded-top text-center overflow-hidden">
          <img src={'http://localhost:5000/' + event.image} style={{height: "200px", objectFit: 'cover', width: "100%"}} />
        </div>
        <CardBody>
          <div className="meetup-header d-flex align-items-center">
            <div className="meetup-day">
              <h6 className="mb-0">{days[new Date(event.startDate).getDay()]}</h6>
              <h3 className="mb-0">{new Date(event.startDate).getDate()}</h3>
            </div>
            <div className="my-auto">
              <CardTitle tag="h4" className="mb-25">
                {event.name}
              </CardTitle>
              <CardText className="mb-0">
                {event.description.substr(0, 35) + ' ...'}
              </CardText>
            </div>
          </div>
          <div className="d-flex">
            <Avatar
              color="light-primary"
              className="rounded me-1"
              icon={<Calendar size={18} />}
            />
            <div>
              <h6 className="mb-0">Start date</h6>
              <small>{new Date(event.startDate).toLocaleString('en-US')}</small>
            </div>
          </div>
          <div className="d-flex mt-2">
            <Avatar
              color="light-primary"
              className="rounded me-1"
              icon={<MapPin size={18} />}
            />
            <div>
              <h6 className="mb-0">Location</h6>
              <small>{event.location}</small>
            </div>
          </div>
          <AvatarGroup data={data} />

          <button className="btn btn-gradient-primary w-100 mt-1">
            More details
          </button>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventsCard;

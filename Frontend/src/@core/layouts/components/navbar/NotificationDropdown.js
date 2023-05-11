// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Bell, X, Check, AlertTriangle } from "react-feather";
import { useSelector } from "react-redux";

// ** Reactstrap Imports
import {
  Button,
  Badge,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
} from "reactstrap";

import { useEffect, useState } from "react";
import socketio from "socket.io-client";

const NotificationDropdown = () => {
  //const [socket, setSocket] = useState(null);
  const [notificationsArray, setNotificationsArray] = useState([]);

  const socket = useSelector((state) => state.chat.socket);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {

    if (socket) {
      ///// approve quizz
      socket?.on("my-quizz-approved", (data) => {
        setNotificationsArray((prevNotificationsArray) => [
          ...prevNotificationsArray,
          {
            img: require("@src/assets/images/portrait/small/approvedd.png")
              .default,
            title: (
              <p className="media-heading">
                <span className="fw-bolder">
                  Huray ! Your quizz " {data.quizName} "
                </span>{" "}
                has been approved
              </p>
            ),
            subtitle: `by admin`,
          },
        ]);
        setNotificationCount(
          (prevNotificationCount) => prevNotificationCount + 1
        );
      });
      console.log("notiiiiiiiiiiif111111111");
      ////////// delete quiz //////////
      socket?.on("my-deleted-quizz", (data) => {
        setNotificationsArray((prevNotificationsArray) => [
          ...prevNotificationsArray,

          {
            img: require("@src/assets/images/portrait/small/delete.png")
              .default,
            title: (
              <p className="media-heading">
                <span className="fw-bolder">
                  oopss ! Your quizz " {data.quiz.quizName} "{" "}
                </span>{" "}
                has been deleted
              </p>
            ),
            subtitle: `by admin`,
          },
        ]);
        setNotificationCount(
          (prevNotificationCount) => prevNotificationCount + 1
        );
      });

      ////////// delete event //////////
      socket?.on("my-deleted-event", (data) => {
        setNotificationsArray((prevNotificationsArray) => [
          ...prevNotificationsArray,

          {
            img: require("@src/assets/images/portrait/small/delete.png")
              .default,
            title: (
              <p className="media-heading">
                <span className="fw-bolder">
                  oopss ! Your event " {data.event.name} "{" "}
                </span>{" "}
                has been deleted
              </p>
            ),
            subtitle: `by admin`,
          },
        ]);
        setNotificationCount(
          (prevNotificationCount) => prevNotificationCount + 1
        );
      });

      ////////// delete post //////
      socket?.on("my-deleted-post", (data) => {
        setNotificationsArray((prevNotificationsArray) => [
          ...prevNotificationsArray,

          {
            img: require("@src/assets/images/portrait/small/delete.png")
              .default,
            title: (
              <p className="media-heading">
                <span className="fw-bolder">oopss ! Your post </span> has been
                deleted
              </p>
            ),
            subtitle: `by admin`,
          },
        ]);
        setNotificationCount(
          (prevNotificationCount) => prevNotificationCount + 1
        );
      });
      ///////////////// approve post ///////
      socket?.on("my-post-approved", (data) => {
        setNotificationsArray((prevNotificationsArray) => [
          ...prevNotificationsArray,

          {
            img: require("@src/assets/images/portrait/small/approvedd.png")
              .default,
            title: (
              <p className="media-heading">
                <span className="fw-bolder">oopss ! Your post </span> has been
                approved
              </p>
            ),
            subtitle: `by admin`,
          },
        ]);
        setNotificationCount(
          (prevNotificationCount) => prevNotificationCount + 1
        );
      });

      // Clean up the socket connection when the component unmounts
      return () => {};
    }
  }, [socket]);

  useEffect(() => {
    console.log("notificationsArray:", notificationsArray);
  }, [notificationsArray]);
  /////////////////

  //const notificationsArray = [
  // {
  //   img: require('@src/assets/images/portrait/small/avatar-s-15.jpg').default,
  //   subtitle: 'Won the monthly best seller badge.',
  //   title: (
  //     <p className='media-heading'>
  //       <span className='fw-bolder'>Congratulation Sam 🎉</span>winner!
  //     </p>
  //   )
  // },
  // {
  //   img: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
  //   subtitle: 'You have 10 unread messages.',
  //   title: (
  //     <p className='media-heading'>
  //       <span className='fw-bolder'>New message</span>&nbsp;received
  //     </p>
  //   )
  // },
  // {
  //   avatarContent: 'MD',
  //   color: 'light-danger',
  //   subtitle: 'MD Inc. order updated',
  //   title: (
  //     <p className='media-heading'>
  //       <span className='fw-bolder'>Revised Order 👋</span>&nbsp;checkout
  //     </p>
  //   )
  // },
  // {
  //   title: <h6 className='fw-bolder me-auto mb-0'>System Notifications</h6>,
  //   switch: (
  //     <div className='form-check form-switch'>
  //       <Input type='switch' name='customSwitch' id='exampleCustomSwitch' defaultChecked />
  //     </div>
  //   )
  // },
  // {
  //   avatarIcon: <X size={14} />,
  //   color: 'light-danger',
  //   subtitle: 'USA Server is down due to hight CPU usage',
  //   title: (
  //     <p className='media-heading'>
  //       <span className='fw-bolder'>Server down</span>&nbsp;registered
  //     </p>
  //   )
  // },
  // {
  //   avatarIcon: <Check size={14} />,
  //   color: 'light-success',
  //   subtitle: 'Last month sales report generated',
  //   title: (
  //     <p className='media-heading'>
  //       <span className='fw-bolder'>Sales report</span>&nbsp;generated
  //     </p>
  //   )
  // },
  // {
  //   avatarIcon: <AlertTriangle size={14} />,
  //   color: 'light-warning',
  //   subtitle: 'BLR Server using high memory',
  //   title: (
  //     <p className='media-heading'>
  //       <span className='fw-bolder'>High memory</span>&nbsp;usage
  //     </p>
  //   )
  // }
  //]

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false,
        }}
      >
        {notificationsArray.map((item, index) => {
          return (
            <a key={index} className="d-flex">
              <div className={classnames("list-item d-flex")}>
                <div className="me-1">
                  <Avatar
                    {...(item.img
                      ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                      : item.avatarContent
                      ? {
                          content: item.avatarContent,
                          color: item.color,
                        }
                      : item.avatarIcon
                      ? {
                          icon: item.avatarIcon,
                          color: item.color,
                        }
                      : null)}
                  />
                </div>
                <div className="list-item-body flex-grow-1">
                  {item.title && (
                    <Fragment>
                      <p className="media-heading">{item.title}</p>
                      <small className="notification-text">
                        {item.subtitle}
                      </small>
                    </Fragment>
                  )}
                  {item.switch}
                </div>
              </div>
            </a>
          );
        })}
      </PerfectScrollbar>
    );
  };
  /*eslint-enable */

  return (
    <UncontrolledDropdown
      tag="li"
      className="dropdown-notification nav-item me-25"
    >
      <DropdownToggle
        tag="a"
        className="nav-link"
        href="/"
        onClick={(e) => e.preventDefault()}
      >
        <Bell size={21} />
        <Badge pill color="danger" className="badge-up">
          {notificationCount}
        </Badge>
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">Notifications</h4>
            {/* <Badge tag="div" color="light-primary" pill>
              6 New
            </Badge> */}
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className="dropdown-menu-footer">
          {/* <Button color="primary" block>
            Read all notifications
          </Button> */}
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationDropdown;

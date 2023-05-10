// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Chat App Component Imports
import Chat from "./Chat";
import Sidebar from "./SidebarLeft";
import UserProfileSidebar from "./UserProfileSidebar";

// ** Third Party Components
import classnames from "classnames";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getChatContacts } from "./store";

import "@styles/base/pages/app-chat.scss";
import "@styles/base/pages/app-chat-list.scss";

const AppChat = () => {
  // ** Store Vars
  const dispatch = useDispatch();


  // ** Get data on Mount
  useEffect(() => {

  }, []);

  return (
    <Fragment>
      <div className="content-area-wrapper">

      <Sidebar
      />
      <div className="content-right">
        <div className="content-wrapper">
          <div className="content-body">
            {/* <div
              className={classnames('body-content-overlay', {
                show: userSidebarRight === true || sidebar === true || userSidebarLeft === true
              })}
              onClick={handleOverlayClick}
            ></div> */}
            <Chat
            />
            {/* <UserProfileSidebar
              user={user}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            /> */}
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
};

export default AppChat;

// ** React Imports
import { useState, useEffect } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { selectChat } from "./store";
import { useDispatch, useSelector } from "react-redux";

// ** Utils
import { formatDateToMonthShort, isObjEmpty } from "@utils";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { X, Search, CheckSquare, Bell, User, Trash } from "react-feather";

// ** Reactstrap Imports
import {
  CardText,
  InputGroup,
  InputGroupText,
  Badge,
  Input,
  Button,
  Label,
} from "reactstrap";
import { getLatestMessages, setSelectedUser } from "../../../redux/messenger";

const SidebarLeft = (props) => {
  const contacts = useSelector(state => state.messenger.contacts);
  const recentMessages = useSelector(state => state.messenger.recentMessages);
  const selectedUser = useSelector(state => state.messenger.selectedUser);
  const [filterText, setFilterText] = useState('');


  const dispatch = useDispatch();


  const handleUserClick = (user) => {
    dispatch(setSelectedUser(user))
  };

  useEffect(() => {
    dispatch(getLatestMessages());
  }, []);

  // ** Renders Chat
  const renderChats = () => {
        return recentMessages?.filter(x => filterText ? (x.user.lastname + ' ' + x.user.firstname).toLowerCase().includes(filterText) : true).map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => handleUserClick(item.user)}
              className={classnames({
                active: selectedUser?._id === item.user._id,
              })}
            >
              <Avatar
                img={'http://localhost:5000/' + item.user.photo}
                imgHeight="42"
                imgWidth="42"
                status={'online'}
              />
              <div className="chat-info flex-grow-1">
                <h5 className="mb-0">{item.user.lastname + ' ' + item.user.firstname}</h5>
                <CardText className="text-truncate">
                  {item.message}
                </CardText>
              </div>
              <div className="chat-meta text-nowrap">
                <small className="float-end mb-25 chat-time ms-25">
                  {item.creation_date}
                </small>
              </div>
            </li>
          );
        });
      };

  // ** Renders Contact
  const renderContacts = () => {
    return contacts?.filter(x => filterText ? (x.lastname + ' ' + x.firstname).toLowerCase().includes(filterText) : true).map((item, index) => {
      return (
        <li key={index} onClick={() => handleUserClick(item)}>
          <Avatar img={'http://localhost:5000/' + item.photo} imgHeight="42" imgWidth="42" />
          <div className="chat-info flex-grow-1">
            <h5 className="mb-0">{item.lastname + item.firstname}</h5>
          </div>
        </li>
      );
    });
  };

  return <div className="sidebar-left">
      <div className="sidebar">
        <div
          className={classnames("sidebar-content", {
            show: false,
          })}
        >
          <div className="chat-fixed-search">
            <div className="d-flex align-items-center w-100">
              <InputGroup className="input-group-merge ms-1 w-100">
                <InputGroupText className="round">
                  <Search className="text-muted" size={14} />
                </InputGroupText>
                <Input
                  value={filterText}
                  className="round"
                  placeholder="Search or start a new chat"
                  onChange={(e) => setFilterText(e.target.value) }
                />
              </InputGroup>
            </div>
          </div>
          <PerfectScrollbar
            className="chat-user-list-wrapper list-group"
            options={{ wheelPropagation: false }}
          >
            <h4 className="chat-list-title">Chats</h4>
            <ul className="chat-users-list chat-list media-list">
              {renderChats()}
            </ul>
            <h4 className="chat-list-title">Contacts</h4>
            <ul className="chat-users-list contact-list media-list">
              {renderContacts()}
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
};

export default SidebarLeft;

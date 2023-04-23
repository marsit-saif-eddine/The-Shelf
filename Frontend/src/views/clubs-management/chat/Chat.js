// ** React Imports
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { sendMsg } from "./store";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Menu, Mic, Image, Send } from "react-feather";

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { clubMessageReceived, getClubConversation } from "../../../redux/chat";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatLog = (props) => {
  const currentUser = JSON.parse(localStorage.getItem('userData'));

  // ** Refs & Dispatch
  const chatArea = useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  const currentClub = useSelector((state) => state.clubs.currentClub);
  const socket = useSelector((state) => state.chat.socket);
  const conversation = useSelector((state) =>
    state.chat.clubConversations.find((x) => x.club_id === params.id)
  );

  // ** State
  const [messageToSend, setMessageToSend] = useState("");

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current);
    chatContainer.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {
    dispatch(getClubConversation(params.id));
    socket.on("club-message-received", (data) => {
      dispatch(clubMessageReceived(data));
    });
    
  }, []);

  // ** Renders user chat
  const renderChats = () => {
    return conversation?.messages?.map((item, index) => {
      return (
        <div
          key={index}
          className={classnames("chat", {
            "chat-left": item.user._id != currentUser._id,
          })}
        >
          <div className="chat-avatar">
            <Avatar
              imgWidth={36}
              imgHeight={36}
              className="box-shadow-1 cursor-pointer"
              img={item.user._id === 'gpt' ? item.user.photo : ('http://localhost:5000/' + item.user.photo)}
            />
          </div>

          <div className="chat-body">
            <div className="chat-content">
              <b>{item.user.lastname + ' ' + item.user.firstname}</b>
              <p>{item.message}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  const sendClubMessage = (data) => {
    socket.emit("club-message-sent", data);
  };

  // ** Sends New Msg
  const handleSendMsg = async (e) => {
    e.preventDefault();
    sendClubMessage({
      message: messageToSend,
      club_id: params.id,
      user: {
        _id: currentUser._id,
        lastname: currentUser.lastname,
        firstname: currentUser.firstname,
        photo: currentUser.photo
      },
    });


    if (messageToSend.includes("hey gpt")) {
      const text = messageToSend.replace("hey gpt", "");
      const response = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: text,
          max_tokens: 4000,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${"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"}`,
            "Content-Type": "application/json",
          },
        }
      );

      const message = response.data.choices[0].text.trim();
      sendClubMessage({
        message,
        club_id: currentClub._id,
        user: { lastname: 'Chat', firstname: 'GPT', photo: 'https://i.pinimg.com/originals/02/c5/a8/02c5a82909a225411008d772ee6b7d62.png', _id: "gpt" },
      });
    }
    setMessageToSend("");
  };

  // ** ChatWrapper tag based on chat's length
  // const ChatWrapper = Object.keys(selectedUser).length && selectedUser.chat ? PerfectScrollbar : 'div'

  const ChatWrapper = PerfectScrollbar;

  return (
    <div className="chat-app-window">
      {true ? (
        <div className="active-chat">
          <div className="chat-navbar">
            <header className="chat-header">
              {
                (conversation?.messages?.length &&
                  <div className="d-flex align-items-center">
                <div
                  className="sidebar-toggle d-block d-lg-none me-1"
                  onClick={() => {}}
                >
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight="36"
                  imgWidth="36"
                  img={'http://localhost:5000/' + conversation?.messages.at(-1).user.photo}
                  status={"online"}
                  className="avatar-border user-profile-toggle m-0 me-1"
                  onClick={() => {}}
                />
                <div className="col-auto d-flex flex-column justify-content-end">
                  <h6 className="mb-0 lh-1">
                    {conversation?.messages.at(-1).user.lastname + " " + conversation?.messages.at(-1).user.firstname}
                  </h6>
                  <small className="text-muted">Just sent a message</small>
                </div>
              </div>
                  )
              }
              {/* <div className='d-flex align-items-center'>
                <PhoneCall size={18} className='cursor-pointer d-sm-block d-none me-1' />
                <Video size={18} className='cursor-pointer d-sm-block d-none me-1' />
                <Search size={18} className='cursor-pointer d-sm-block d-none' />
                <UncontrolledDropdown className='more-options-dropdown'>
                  <DropdownToggle className='btn-icon' color='transparent' size='sm'>
                    <MoreVertical size='18' />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      View Contact
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href='/' onClick={e => e.preventDefault()}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div> */}
            </header>
          </div>

          <ChatWrapper
            ref={chatArea}
            className="user-chats"
            options={{ wheelPropagation: false }}
          >
            {true ? <div className="chats">{renderChats()}</div> : null}
          </ChatWrapper>

          <Form className="chat-app-form" onSubmit={(e) => handleSendMsg(e)}>
            <InputGroup className="input-group-merge me-1 form-send-message">
              <InputGroupText>
                <Mic className="cursor-pointer" size={14} />
              </InputGroupText>
              <Input
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
                placeholder="Type your message or use speech to text"
              />
              <InputGroupText>
                <Label className="attachment-icon mb-0" for="attach-doc">
                  <Image className="cursor-pointer text-secondary" size={14} />
                  <input type="file" id="attach-doc" hidden />
                </Label>
              </InputGroupText>
            </InputGroup>
            <Button className="send" color="primary">
              <Send size={14} className="d-lg-none" />
              <span className="d-none d-lg-block">Send</span>
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  );
};

export default ChatLog;

import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { X } from "react-feather";
import { addChatBox, closeChatBubble } from "../../../redux/chat";
import ChatBox from "./ChatBox";
const ChatBubbles = () => {
  const chatBubbles = useSelector((state) => state.chat.chatBubbles);
  const chatBoxes = useSelector((state) => state.chat.chatBoxes);
  const dispatch = useDispatch();

  return (
    <div>
      {chatBubbles.map((x, index) => {
        return (
          <div key={index} className="chat-bubbles-container">
            <div className="bubble" style={{ bottom: 70 * (index + 1) }}>
              {x.newContent ? <div className="bubble-badge">1</div> : ""}
              <div
                className="bubble-close-badge"
                onClick={() => dispatch(closeChatBubble(index))}
              >
                <X size={10} />
              </div>
              <img
              onClick={() => {dispatch(addChatBox(x)); dispatch(closeChatBubble(index))}}
                src={'http://localhost:5000/' + x.photo}
                height="50px"
                width="50px"
              />
            </div>
            {x.newContent ? (
              <div
                className="dialog-bubble-container"
                style={{ bottom: 70 * (index + 1) }}
              >
                <div className="dialog-bubble">{x.newContent}</div>
                <div className="dialog-bubble-arrow"></div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
      {
        chatBoxes.map((x, index) => {
          return (
            <ChatBox chatData={x} boxIndex={index} key={index}/>
          )
        })
      }
    </div>
  );
};

export default ChatBubbles;

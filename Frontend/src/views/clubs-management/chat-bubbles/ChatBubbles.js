import React from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { X } from "react-feather";
import { closeChatBubble } from "../../../redux/chat";
const ChatBubbles = () => {
  const chatBubbles = useSelector((state) => state.chat.chatBubbles);
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
                src="https://graphicriver.img.customer.envatousercontent.com/files/395988839/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=9133752d1e9837a45f7a15ed2d820778"
                height="50px"
                width="50px"
              />
            </div>
            {x.newContent ? (
              <div
                className="dialog-bubble-container"
                style={{ bottom: 70 * (index + 1) }}
              >
                <div className="dialog-bubble">{x.content}</div>
                <div className="dialog-bubble-arrow"></div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatBubbles;

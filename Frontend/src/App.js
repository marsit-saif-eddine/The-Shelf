import React, { Suspense, useEffect } from "react";

// ** Router Import
import Router from './router/Router'
import ChatBubbles from './views/clubs-management/chat-bubbles/ChatBubbles'
import { useDispatch, useSelector } from 'react-redux'
import { onPrivateMessageReceived } from './redux/chat'
import { addMessage, getLatestMessages } from './redux/messenger'

const App = () => {
  const socket = useSelector(state => state.chat.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      socket.on('private-message-received', (data) => {
        const currentPath = window.location.pathname;
        if (currentPath != '/apps/chat' && currentPath != '/apps/chatt') {
        dispatch(onPrivateMessageReceived(data));
        } else {
          dispatch(addMessage(data));
          dispatch(getLatestMessages());
        }
      });
    }
  }, [socket]);
  return (
    <>
      <Suspense fallback={null}>
        <Router />
      </Suspense>

      <ChatBubbles />
    </>
  );
};

export default App;

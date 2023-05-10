import React, { Suspense, useEffect } from "react";

// ** Router Import
import Router from "./router/Router";
import ChatBubbles from "./views/clubs-management/chat-bubbles/ChatBubbles";
import { useSelector } from "react-redux";

const App = () => {
  const socket = useSelector((state) => state.chat.socket);

  useEffect(() => {
    console.log('socket from appjs', socket)
    socket?.on("my-quizz-approved", (data) => {
      
    });
    socket?.on("my-deleted-quizz", (data) => {
      
    });
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

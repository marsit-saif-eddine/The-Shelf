import React, { Suspense, useEffect } from 'react'

// ** Router Import
import Router from './router/Router'
import ChatBubbles from './views/clubs-management/chat-bubbles/ChatBubbles'

const App = () => {

  return (
    <>
    <Suspense fallback={null}>
      <Router />
    </Suspense>

    <ChatBubbles/>
    </>
  )
}

export default App

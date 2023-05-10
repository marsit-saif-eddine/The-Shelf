// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MoreVertical, Send, Image, X, Minus } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, Form, Label, InputGroup, Input, InputGroupText, Button } from 'reactstrap'

// ** Images
import profilePic from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const Filter = require('bad-words');

const filter = new Filter();

const words = require('../../../extra-words.json');
filter.addWords(...words);

// ** Styles
import '@styles/base/pages/app-chat-list.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addChatBubble, closeChatBox, getPrivateConversation, onPrivateMessageSent } from '../../../redux/chat'


const data = {
  chat: {
    id: 2,
    userId: 1,
    unseenMsgs: 0,
    chat: [
      {
        message: "How can we help? We're here for you!",
        time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
        senderId: 11
      },
      {
        message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
        time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
        senderId: 1
      },
      {
        message: 'It should be Bootstrap 5 compatible.',
        time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
        senderId: 1
      },
      { message: 'Absolutely!', time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)', senderId: 11 },
      {
        message: 'Modern admin is the responsive bootstrap 5 admin template.!',
        time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
        senderId: 11
      },
      { message: 'Looks clean and fresh UI.', time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)', senderId: 1 },
      { message: "It's perfect for my next project.", time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)', senderId: 1 },
      { message: 'How can I purchase it?', time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)', senderId: 1 },
      { message: 'Thanks, from ThemeForest.', time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)', senderId: 11 },
      { message: 'I will purchase it for sure. 👍', time: '2020-12-08T13:52:38.013Z', senderId: 1 }
    ]
  },
  contact: {
    id: 1,
    fullName: 'Felecia Rower',
    avatar: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
    status: 'away'
  }
}

const ChatBox = (props) => {
  // ** States
  const [msg, setMsg] = useState('');
  const [chatRef, setChatRef] = useState(null);
  const dispatch = useDispatch();
  const [chatData, setChatData] = useState(data);
  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const socket = useSelector((state) => state.chat.socket);
  const conversation = useSelector(state => state.chat.privateConversations.find(x => x.participant == props.chatData._id));
  useEffect(() => {
      dispatch(getPrivateConversation(props.chatData._id));
  }, [])


  //** Renders user chat
  const renderChats = () => {
    return conversation?.messages.map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.sender._id != currentUser._id
          })}
        >
          <div className='chat-avatar'>
            <Avatar
              className='box-shadow-1 cursor-pointer'
              img={'http://localhost:5000/' + item.sender.photo}
            />
          </div>

          <div className='chat-body'>
              <div className='chat-content'>
                <p>{item.message}</p>
              </div>
          </div>
        </div>
      )
    })
  }

  //** Scroll to chat bottom
  const scrollToBottom = () => {
    chatRef.scrollTop = Number.MAX_SAFE_INTEGER
  }

  useEffect(() => {
    if (chatRef !== null) {
      scrollToBottom()
    }
  }, [chatRef, conversation?.messages?.length])


  const handleSendMsg = e => {
    e.preventDefault()
    if (msg.trim().length) {
      const msgToSend = filter.clean(msg);
      socket.emit('private-message-sent', {receiver: props.chatData, message: msgToSend});
      dispatch(onPrivateMessageSent({participant: props.chatData._id, sender: {_id: currentUser._id, lastname: currentUser.lastname, firstname: currentUser.firstname, photo: currentUser.photo}, message: msgToSend}));

      setMsg('')
    }
  }

  return (
    <Card className='chat-widget bg-white' style={{'zIndex': 500}}>
      <CardHeader>
        <div className='d-flex align-items-center'>
          <Avatar status='online' className='me-2' img={'http://localhost:5000/' + props.chatData.photo} imgHeight='34' imgWidth='34' />
          <h5 className='mb-0'>{props.chatData.lastname + ' ' + props.chatData.firstname}</h5>
        </div>
        <div className='col-auto d-flex flex-row'>
        <Minus size={18} className='cursor-pointer me-1' onClick={() => {dispatch(closeChatBox()); dispatch(addChatBubble(props.chatData))}} />
        <X size={18} className='cursor-pointer' onClick={() => {dispatch(closeChatBox())}} />
        </div>
      </CardHeader>
      <div className='chat-app-window'>
        <PerfectScrollbar
          containerRef={el => setChatRef(el)}
          className='user-chats scroll-area'
          options={{ wheelPropagation: false }}
        >
          <div className='chats'>{renderChats()}</div>
        </PerfectScrollbar>
        <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
          <InputGroup className='input-group-merge me-1 form-send-message'>
            <InputGroupText>
              <Label className='attachment-icon mb-0' for='attach-doc'>
                <Image className='cursor-pointer text-secondary' size={14} />
                <input type='file' id='attach-doc' hidden />
              </Label>
            </InputGroupText>
            <Input
              value={msg}
              className='border-0'
              onChange={e => setMsg(e.target.value)}
              placeholder='Type your message'
            />
          </InputGroup>
          <Button className='send' color='primary'>
            <Send size={14} className='d-lg-none' />
            <span className='d-none d-lg-block'>Send</span>
          </Button>
        </Form>
      </div>
    </Card>
  )
}

export default ChatBox

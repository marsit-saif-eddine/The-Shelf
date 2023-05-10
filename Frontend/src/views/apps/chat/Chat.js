// ** React Imports
import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MessageSquare, Menu, PhoneCall, Video, Search, MoreVertical, Mic, Image, Send } from 'react-feather'

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Button,
  InputGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroupText,
  UncontrolledDropdown
} from 'reactstrap'
const Filter = require('bad-words');

const filter = new Filter();

const words = require('../../../extra-words.json');
filter.addWords(...words);
import { addMessage, getLatestMessages, getPrivateConversation } from '../../../redux/messenger'


const ChatLog = props => {

  const conversation = useSelector(state => state.messenger.conversation);
  const selectedUser = useSelector(state => state.messenger.selectedUser);
  const socket = useSelector(state => state.chat.socket);

  const currentUser = JSON.parse(localStorage.getItem('userData'));

  // ** Refs & Dispatch
  const chatArea = useRef(null)
  const dispatch = useDispatch()

  // ** State
  const [msg, setMsg] = useState('')

  // ** Scroll to chat bottom
  const scrollToBottom = () => {
    const chatContainer = ReactDOM.findDOMNode(chatArea.current)
    if (chatContainer) {
      chatContainer.scrollTop = Number.MAX_SAFE_INTEGER
    }
  }

  // ** If user chat is not empty scrollToBottom
  useEffect(() => {

    if (selectedUser != null) {
      dispatch(getPrivateConversation(selectedUser._id));
    }

  }, [selectedUser]);

  useEffect(() => {
    if (conversation && chatArea) {
      scrollToBottom();
    }
  },[conversation]);


  // ** Renders user chat
  const renderChats = () => {
    return conversation?.map((item, index) => {
      return (
        <div
          key={index}
          className={classnames('chat', {
            'chat-left': item.sender._id != currentUser._id
          })}
        >
          <div className='chat-avatar'>
            <Avatar
              imgWidth={36}
              imgHeight={36}
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

  // ** Opens right sidebar & handles its data
  const handleAvatarClick = obj => {

  }

  // ** On mobile screen open left sidebar on Start Conversation Click
  const handleStartConversation = () => {

  }

  // ** Sends New Msg
  const handleSendMsg = e => {
    e.preventDefault()
    if (msg.trim().length) {
      const msgToSend = filter.clean(msg);
      socket.emit('private-message-sent', {receiver: selectedUser, message: msgToSend});
      dispatch(addMessage({sender: {_id: currentUser._id, lastname: currentUser.lastname, firstname: currentUser.firstname, photo: currentUser.photo}, message: msgToSend}));
      setMsg('')
    }
  }

  // ** ChatWrapper tag based on chat's length
  const ChatWrapper = selectedUser ? PerfectScrollbar : 'div'

  return (
    <div className='chat-app-window'>
      <div className={classnames('start-chat-area', { 'd-none': selectedUser })}>
        <div className='start-chat-icon mb-1'>
          <MessageSquare />
        </div>
        <h4 className='sidebar-toggle start-chat-text' onClick={handleStartConversation}>
          Start Conversation
        </h4>
      </div>
      {selectedUser ? (
        <div className={classnames('active-chat', { 'd-none': selectedUser === null })}>
          <div className='chat-navbar'>
            <header className='chat-header'>
              <div className='d-flex align-items-center'>
                <div className='sidebar-toggle d-block d-lg-none me-1' onClick={() => console.log('I M CLICKED')}>
                  <Menu size={21} />
                </div>
                <Avatar
                  imgHeight='36'
                  imgWidth='36'
                  img={'http://localhost:5000/' + selectedUser.photo}
                  status={'online'}
                  className='avatar-border user-profile-toggle m-0 me-1'
                  onClick={() => console.log('2 ME TOO')}
                />
                <h6 className='mb-0'>{selectedUser.lastname + ' ' + selectedUser.firstname}</h6>
              </div>
              <div className='d-flex align-items-center'>
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
              </div>
            </header>
          </div>

          <ChatWrapper ref={chatArea} className='user-chats' options={{ wheelPropagation: false }}>
            {selectedUser ? <div className='chats'>{renderChats()}</div> : null}
          </ChatWrapper>

          <Form className='chat-app-form' onSubmit={e => handleSendMsg(e)}>
            <InputGroup className='input-group-merge me-1 form-send-message'>
              <InputGroupText>
                <Mic className='cursor-pointer' size={14} />
              </InputGroupText>
              <Input
                value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder='Type your message or use speech to text'
              />
              <InputGroupText>
                <Label className='attachment-icon mb-0' for='attach-doc'>
                  <Image className='cursor-pointer text-secondary' size={14} />
                  <input type='file' id='attach-doc' hidden />
                </Label>
              </InputGroupText>
            </InputGroup>
            <Button className='send' color='primary'>
              <Send size={14} className='d-lg-none' />
              <span className='d-none d-lg-block'>Send</span>
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  )
}

export default ChatLog

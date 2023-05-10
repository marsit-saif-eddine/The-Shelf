import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { io } = require("socket.io-client");

export const getClubConversation = createAsyncThunk(
  "clubs/getClubConversation",
  (club_id) =>
    axios
      .get("clubs/getClubConversation", {
        params: { club_id },
      })
      .then((resp) => {
        return {
          data: resp.data,
        };
      })
);

export const getPrivateConversation = createAsyncThunk(
  "chat/getPrivateConversation",
  (user_id) =>
    axios
      .get("chat/getPrivateConversation", {
        params: { user_id },
      })
      .then((resp) => {
        return {
          participant: user_id,
          messages: resp.data,
        };
      })
);

export const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    chatBubbles: [],
    chatBox: null,

    // ARRAY OF:
    //{participant: other_user's id, messages: [{message, sender: ShortUserData}]}
    privateConversations: [],
    // ARRAY OF:
    // {club_id, me}
    clubConversations: [],
    socket: null,
  },
  reducers: {
    // PAYLOAD TYPE : {
    //   _id: ''
    //   lastname: '',
    //   firstname: '',
    //   photo: '',
    //   newContent: ''
    // }
    addChatBubble: (state, action) => {
      if (state.chatBubbles.findIndex((x) => x._id === action.payload._id) < 0)
        state.chatBubbles.push(action.payload);
    },

    onPrivateMessageReceived: (state, action) => {
      const data = action.payload;
      if (!state.chatBox || state.chatBox._id != data.sender._id) {
        const index = state.chatBubbles.findIndex(x => x._id == data.sender._id);
        if (index > -1) {
          state.chatBubbles[index].newContent = data.message;
        } else {
          state.chatBubbles.push({...data.sender, newContent: data.message});
        }
      }

      const conversation = state.privateConversations.find(x => x.participant == data.sender._id);
      if (conversation != undefined) {
        conversation.messages.push({...data, creation_date: new Date()});
      } else {
        state.privateConversations.push({participant: data.sender._id, messages: [{...data, creation_date: new Date()}]});
      }

    },

    onPrivateMessageSent: (state, action) => {
      const data = action.payload;

      const conversation = state.privateConversations.find(x => x.participant == data.participant);

      if (conversation != undefined) {
        conversation.messages.push({sender: data.sender, message: data.message, creation_date: new Date()});
      } else {
        state.privateConversations.push({participant: data.participant, messages: [{sender: data.sender, message: data.message, creation_date: new Date()}]});
      }
    },

    addChatBox: (state, action) => {
      if (state.chatBox) {
        state.chatBubbles.push(state.chatBox);
      }

      state.chatBox = {_id: action.payload._id, lastname: action.payload.lastname, firstname: action.payload.firstname, photo: action.payload.photo};

      const bubbleIndex = state.chatBubbles.findIndex(x => x._id == action.payload._id);
      if (bubbleIndex > -1) {
        state.chatBubbles.splice(bubbleIndex, 1);
      }

    },

    // PAYLOAD index: int
    closeChatBubble: (state, action) => {
      state.chatBubbles.splice(action.payload, 1);
    },

    closeChatBox: (state, action) => {
      state.chatBox = null;
    },

    markNewContentAsRead: (state, action) => {
      state.chatBubbles[action.payload].newContent = null;
    },

    initSocketConnection: (state, action) => {
      console.log('init connection executed');
      state.socket = io("http://localhost:5000", {
        auth: {
          token: localStorage.getItem("accessToken"),
        },
      });

      state.socket.on("connect", () => {
        console.log('this is from on connect');
      });
    },

    clubMessageReceived: (state, action) => {
      const conversation = state.clubConversations.find(
        (x) => x.club_id === action.payload.club_id
      );
      if (conversation) {
        delete action.payload.club_id;
        conversation.messages.push(action.payload);
      }
    },


  },
  extraReducers: (builder) => {
    builder.addCase(getClubConversation.fulfilled, (state, action) => {
      const data = action.payload.data;
      if (data) {
        const index = state.clubConversations.findIndex(
          (x) => x.club_id === action.payload.club_id
        );
        if (index < 0) {
          state.clubConversations.push(data);
        } else {
          state.clubConversations[index] = data;
        }
      } else {
        state.clubConversations.push({
          club_id: action.payload,
          messages: [],
        });
      }
    }).addCase(getPrivateConversation.fulfilled, (state, action) => {
      const index = state.privateConversations.findIndex(x => x.participant == action.payload.participant);
      if (index > -1) {
        state.privateConversations[index] = action.payload;
      } else {
        state.privateConversations.push(action.payload);
      }
    });
  },
});

export const {
  addChatBubble,
  closeChatBubble,
  markNewContentAsRead,
  clubMessageReceived,
  initSocketConnection,
  onPrivateMessageReceived,
  onPrivateMessageSent,
  closeChatBox,
  addChatBox
} = ChatSlice.actions;

export default ChatSlice.reducer;

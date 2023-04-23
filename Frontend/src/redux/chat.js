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
          data: resp.data,
        };
      })
);

export const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    chatBubbles: [],
    chatBoxes: [],
    privateConversations: [],
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

    addChatBox: (state, action) => {
      if (state.chatBoxes.findIndex((x) => x._id === action.payload._id) < 0) {
        state.chatBoxes.push(action.payload);
      }
    },

    // PAYLOAD index: int
    closeChatBubble: (state, action) => {
      state.chatBubbles.splice(action.payload, 1);
    },

    closeChatBox: (state, action) => {
      state.chatBoxes.splice(action.payload, 1);
    },

    markNewContentAsRead: (state, action) => {
      state.chatBubbles[action.payload].newContent = null;
    },

    initSocketConnection: (state, action) => {
      state.socket = io("http://localhost:5000", {
        auth: {
          token: localStorage.getItem("accessToken"),
        },
      });

      state.socket.on("connect", () => {});
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
    });
  },
});

export const {
  addChatBubble,
  closeChatBubble,
  markNewContentAsRead,
  clubMessageReceived,
  initSocketConnection,
  closeChatBox,
  addChatBox
} = ChatSlice.actions;

export default ChatSlice.reducer;

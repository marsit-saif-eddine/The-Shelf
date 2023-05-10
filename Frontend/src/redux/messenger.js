import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLatestMessages = createAsyncThunk(
  "chat/getLatestMessages",
  () =>
    axios
      .get("chat/getLatestMessages")
      .then((resp) => {
        return resp.data;
      })
);

export const getPrivateConversation = createAsyncThunk(
  "chatt/getPrivateConversation",
  (user_id) =>
    axios
      .get("chat/getPrivateConversation", {
        params: { user_id },
      })
      .then((resp) => {
        return resp.data;
      })
);

export const MessengerSlice = createSlice({
  name: "messenger",
  initialState: {
    //ShortUserData
    selectedUser: null,
    //ARRAY OF:
    // {sender: ShortUserData, message, creation_date}
    conversation: [],

    // array of:
    // {user: ShortUserData, message, creation_date}
    recentMessages: [],

    //array of:
    //{user: ShortUserData}
    contacts: []
  },
  reducers: {
    // on message sent/received add it to state (object send differs (currentUser/another user))
    addMessage: (state, action) => {
      console.log('FROM REDUX ADD MESSAGE', action.payload);
        state.conversation.push(action.payload);
    },

    setSelectedUser: (state, action) => {
        state.selectedUser = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(getLatestMessages.fulfilled, (state, action) => {
      const data = action.payload;
      state.recentMessages = data.recentChats;
      state.contacts = data.contacts;

    }).addCase(getPrivateConversation.fulfilled, (state, action) => {
        state.conversation = action.payload;
      });
  },
});

export const {
    setSelectedUser,
    addMessage
} = MessengerSlice.actions;

export default MessengerSlice.reducer;

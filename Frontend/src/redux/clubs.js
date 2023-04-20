import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem('userData'));

export const getClubs = createAsyncThunk("clubs/getClubs", () =>
  axios.get("clubs/getClubs").then((resp) => {
    return resp.data;
  })
);

export const deleteClub = createAsyncThunk("clubs/deleteClub", payload =>
  axios.delete("clubs/deleteClub", { params: { club_id: payload.club_id } }).then((resp) => {
    return {
      data: resp.data,
      ...payload,
    };
  })
);

export const sendJoinClubRequest = createAsyncThunk(
  "clubs/sendJoinClubRequest",
  payload =>
    axios
      .post(
        "clubs/sendJoinClubRequest",
        { ...currentUser, pending: true },
        { params: { club_id: payload.club_id } }
      )
      .then((resp) => {
        return {
          data: resp.data,
          ...payload,
        };
      })
);

export const cancelJoinRequest = createAsyncThunk(
  "clubs/cancelJoinRequest",
  payload =>
    axios
      .put("clubs/cancelJoinRequest", { user_id: payload.user_id }, { params: { club_id: payload.club_id } })
      .then((resp) => {
        return {
          data: resp.data,
          ...payload
        };
      })
);

export const clubsSlice = createSlice({
  name: "clubs",
  initialState: {
    currentClub: {},
    clubsList: [],
  },
  reducers: {
    setCurrentClub: (state, action) => {
      state.currentClub = action.payload;
    },
    acceptMember: (state, action) => {
      const member = state.currentClub.members.find(
        (x) => x._id === action.payload
      );
      delete member.pending;
    },
    rejectMember: (state, action) => {
      const index = state.currentClub.members.findIndex(
        (x) => x._id === action.payload
      );
      state.currentClub.members.splice(index, 1);
    },
    joinClub: (state, action) => {
      state.currentClub.members.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClubs.fulfilled, (state, action) => {
        const data = action.payload;
        if (data) {
          state.clubsList = data;
        }
      })
      .addCase(deleteClub.fulfilled, (state, action) => {
        console.log(action.payload.club_id)
        console.log(state.clubsList[5]._id);
        if (action.payload.data) {
          const index = state.clubsList.findIndex(
            (x) => x._id === action.payload.club_id
          );
          if (index > -1) {
            state.clubsList.splice(index, 1);
          }
        }
      })
      .addCase(sendJoinClubRequest.fulfilled, (state, action) => {
        if (action.payload.data) {
        
        }
      })
      .addCase(cancelJoinRequest.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.data) {
          const club = state.clubsList.find(
            (x) => x._id === action.payload.club_id
          );
          if (club) {
            const index = club.members.findIndex(
              (x) => x._id === action.payload.user_id
            );
            if (index > -1) {
              club.members.splice(index, 1);
            }
          }
        }
      });
  },
});

export const { setCurrentClub, acceptMember, rejectMember } =
  clubsSlice.actions;

export default clubsSlice.reducer;

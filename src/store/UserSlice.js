import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isComposed: false,
  viewMail: false,
  userEmail: "",
  userId: "",
  sentMail: false,
  viewSent: false,
  inbox: true,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ChangeLoggedIn: (state, action) => {
      state.isLoggedIn = true;
    },
    ChangeComposed: (state, action) => {
      state.isComposed = !state.isComposed;
    },
    ChangeViewMail: (state, action) => {
      // const { id, inboxMail, sentMail } = action.payload;
      // state.viewMail = inboxMail;
      // state.viewSent = sentMail;
      // state.userId = id;
      const { inbox, viewinbox, sent, viewSend, id } = action.payload;
      state.sentMail = sent;
      state.inbox = inbox;
      state.viewMail = viewinbox;
      state.viewSent = viewSend;
      state.userId = id;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
      state.isLoggedIn = true;
    },
    setLogoutUser: (state, action) => {
      state.isLoggedIn = false;
      state.userEmail = "";
    },
    ChangeMailSent: (state, action) => {
      const { inbox, viewinbox, sent, viewSend } = action.payload;
      state.sentMail = sent;
      state.inbox = inbox;
      state.viewMail = viewinbox;
      state.viewSent = viewSend;
    },
  },
});

export const {
  ChangeLoggedIn,
  ChangeComposed,
  ChangeViewMail,
  setUserEmail,
  setLogoutUser,
  ChangeMailSent,
} = UserSlice.actions;

export default UserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  profilePic: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinUser: (state, action) => {
      state.name = action.payload.userName;
      state.email = action.payload.userEmail;
      state.profilePic = action.payload.userProfilePic;
      state.id = action.payload.userID;
    },
    signoutUser: (state, action) => {
      state.name = null;
      state.email = null;
      state.profilePic = null;
      state.id = null;
    },
  },
});

export const { signinUser, signoutUser } = userSlice.actions;

export const userName = (state) => state.user.name;
export const userEmail = (state) => state.user.email;
export const userProfilePic = (state) => state.user.profilePic;
export const userID = (state) => state.user.id;

export default userSlice.reducer;

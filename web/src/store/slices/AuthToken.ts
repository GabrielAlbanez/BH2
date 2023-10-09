import { createSlice } from "@reduxjs/toolkit";

const AuthToken = createSlice({
  name: "AuthToken",
  initialState: {
    token: [],
    dataUser: [],
  },

  reducers: {
    takeToken: (state, action) => {
      state.token = action.payload[0];
      state.dataUser = action.payload[1];
      console.log(state.token);
      console.log(state.dataUser);
    },
  },
});

export const Token = AuthToken.reducer;

export const { takeToken } = AuthToken.actions;

import { createSlice } from "@reduxjs/toolkit";

const AuthToken = createSlice({
  name: "AuthToken",
  initialState: {
    token: [],
    dataUser: [],
    isLoged : false,
    url : []
  },

  reducers: {
    takeToken: (state, action) => {
      state.url = action.payload[0];
      state.dataUser = action.payload[1];
      state.token = action.payload[2];

    },
    LogUser : (state,action)=>{
      state.isLoged = action.payload
    }
  },
});

export const Token = AuthToken.reducer;

export const { takeToken, LogUser } = AuthToken.actions;
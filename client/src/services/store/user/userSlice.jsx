import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state) => {},
    logout: (state) => {},
  },
});

export const {login,logout} = userSlice.actions
export default userSlice.reducer


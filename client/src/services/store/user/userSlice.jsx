import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userInfo = localStorage.getItem("user");
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userInfo ? JSON.parse(userInfo) : null,
  },
  reducers: {
    login: (state, action) => {
      console.log("Login function from reducer");
      state.user = action.payload;
    },
    signup: (state) => {},
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;

//Thunks
export function loginUser(userCredentials) {
  return async function loginUserThunk(dispatch, getState) {
    try {
      const { data } = await axios.post(
        "api/v1/student/login",
        userCredentials
      );
      dispatch(login(data));
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
}


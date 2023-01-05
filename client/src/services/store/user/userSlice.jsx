import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userInfo = localStorage.getItem("user");
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userInfo ? JSON.parse(userInfo) : null,
    loading: false,
    error: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, signup, setError, setLoading } =
  userSlice.actions;
export default userSlice.reducer;

//Thunks
export function loginUser(userCredentials) {
  return async function loginUserThunk(dispatch, getState) {
    try {
      const { data } = await axios.post(
        "api/v1/student/login",
        userCredentials
      );
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setError(error.response.data.msg));
      // dispatch(setLoading(false));
    }
  };
}

export function createAccount(userCredentials) {
  return async function createAccountThunk(dispatch, getState) {
    try {
      const { data } = await axios.post(
        "api/v1/student/createAccount",
        userCredentials
      );
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setError(error.response.data.msg));
      setTimeout(() => {
        dispatch(setError(""));
      }, 1000);
    }
  };
}

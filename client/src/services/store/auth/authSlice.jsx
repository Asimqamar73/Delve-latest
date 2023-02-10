import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authFetch } from "../../../lib/axios/authFetch";
import { STATUSES } from "../../requestStatues"


const userInfo = localStorage.getItem("user");
const JWToken = localStorage.getItem("token");
const initialState = {
  user: userInfo ? JSON.parse(userInfo) : null,
  token: JWToken || "",
  message: "",
  course: null,
  isEmailSend: false,
  status: STATUSES.IDLE
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.student;
      localStorage.setItem("user", JSON.stringify(action.payload.student));
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetState: (state) => {
      state.status = STATUSES.IDLE;
      state.message = ""
    }
  },
});

export const {
  setUser,
  setCourse,
  setStatus,
  logout,
  signup,
  setMessage,
  resetState
} = authSlice.actions;
export default authSlice.reducer;

//Thunks
export function loginUser(userCredentials) {
  return async function loginUserThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING))
    try {
      const { data } = await axios.post(
        "/api/v1/student/login",
        userCredentials
      );
      dispatch(setUser(data));
      dispatch(setStatus(STATUSES.IDLE))
    } catch (error) {
      dispatch(setMessage(error.response.data.msg));
      dispatch(setStatus(STATUSES.ERROR))
    }
  };
}

export function createAccount(userCredentials) {
  return async function createAccountThunk(dispatch, getState) {
    try {
      const { data } = await authFetch.post(
        "/student/createAccount",
        userCredentials
      );
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setMessage(error.response.data.msg));
      dispatch(setStatus(STATUSES.ERROR))
    }
  };
}
export function changePassword(userPasswords) {
  return async function changePasswordThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await authFetch.patch(
        "/student/changePassword",
        userPasswords
      );
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));

    }
  };
}
export function forgotPassord(userEmail) {
  return async function forgotPasswordThunk(dispatch, getState) {
    try {
      const { data } = await authFetch.post("/student/forgotPassword", {
        userEmail,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function changeAvatar(avatarInfo) {
  return async function changeAvatarThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await authFetch.patch(
        "/student/changeAvatar",
        avatarInfo
      );
      dispatch(setUser(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function enrollCourse(courseId) {
  return async function enrollCourseThunk(dispatch, getState) {
    console.log(courseId);
    try {
      const { data } = await authFetch.patch("/student/courseEnrollment", {
        courseId,
      });
      dispatch(setUser(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error);
    }
  };
}





// export function fetchEnrolledCourses(studentId) {
//   return async function fetchEnrolledCoursesThunk(dispatch, getState) {
//     try {
//       const { data } = await authFetch.get(
//         `/student/enrolledCourses/${studentId}`
//       );
//     } catch (error) {}
//   };
// }

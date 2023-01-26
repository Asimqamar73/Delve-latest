import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authFetch } from "../../../lib/axios/authFetch";
// import { authFetch } from "../../../lib/axios/authFetch";

const userInfo = localStorage.getItem("user");
const JWToken = localStorage.getItem("token");
const initialState = {
  user: userInfo ? JSON.parse(userInfo) : null,
  token: JWToken || "",
  isLoading: false,
  error: "",
  // courses: null,
  course: null,
};

export const userSlice = createSlice({
  name: "user",
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
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setCourse, logout, signup, setError, setLoading } =
  userSlice.actions;
export default userSlice.reducer;

//Thunks
export function loginUser(userCredentials) {
  return async function loginUserThunk(dispatch, getState) {
    try {
      const { data } = await axios.post(
        "/api/v1/student/login",
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

export function createAccount(userCredentials) {
  return async function createAccountThunk(dispatch, getState) {
    try {
      const { data } = await authFetch.post(
        "/student/createAccount",
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

export function changeAvatar(avatarInfo) {
  return async function changeAvatarThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await authFetch.patch(
        "/student/changeAvatar",
        avatarInfo
      );

      dispatch(setUser(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
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
      console.log(data);
      dispatch(setUser(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  };
}

export function learnCourse(courseId) {
  return async function learnCourseThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await authFetch.get(`course/learnCourse/${courseId}`);
      dispatch(setCourse(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));

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

import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";

const statuses = Object.freeze({
  IDLE: "idle",
  SUCCESS: "success",
  FAILED: "failed",
});

const initialState = {
  instructor: null,
  isLoading: false,
  status: statuses.IDLE,
  courses: [],
  course: null,
};

export const instructorDashboardSlice = createSlice({
  name: "instructorDashboard",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});
export const { setLoading, setStatus, setCourses, setCourse } =
  instructorDashboardSlice.actions;
export default instructorDashboardSlice.reducer;

//Thunks
export function publishCourse(courseDetails) {
  return async function publishCourseThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      await authFetch.post("/course/createCourse", courseDetails);
      dispatch(setLoading(false));
      dispatch(setStatus(statuses.SUCCESS));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setStatus(statuses.FAILED));
    }
  };
}

export function getOwnCourses(id) {
  return async function getOwnCoursesThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await authFetch.get(`/course/getOwnCourses/${id}`);
      dispatch(setCourses(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
}

export function manageCourse(courseId) {
  return async function courseDetailsThunk(dispatch, getState) {
    // This is used because when we logout out an account and login to  other account
    //we get courses of previous logged in account
    //(Only when we not refresh page by oueself after logged out from 1st account.)
    // Thats why we set couuse at initially null
    // We can achieve it by putting loading state in here.
    //  dispatch(setCourse(null))
    dispatch(setLoading(true));
    try {
      const { data } = await authFetch.get(`/course/courseDetails/${courseId}`);
      dispatch(setCourse(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
}

export function modifyCourse(updatedData) {
  return async function manageCourseThunk(dispatch, getState) {
    try {
      const { data } = await authFetch.post("/course/editCourse2", updatedData);
      dispatch(setCourse(data));
    } catch (error) {
      console.log(error);
    }
  };
}

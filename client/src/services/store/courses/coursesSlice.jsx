import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";

export const coursesSlice = createSlice({
  name: "Courses",
  initialState: {
    courses: null,
    course: null,
    isLoading: false,
  },
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
  },
});

export const { setCourses, setCourse, setLoading } = coursesSlice.actions;
export default coursesSlice.reducer;

// Thunks

export function fetchAllCourses() {
  return async function (dispatch, getState) {
    try {
      const { data } = await authFetch.get("/courses/publishedCourses");
      dispatch(setCourses(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchCourseDetails(courseId) {
  return async function fetchCourseDetailsThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await authFetch.get(`/course/courseDetails/${courseId}`);
      // console.log(data);
      dispatch(setLoading(false));
      dispatch(setCourse(data));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
}

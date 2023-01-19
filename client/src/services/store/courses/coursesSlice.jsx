import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";

export const coursesSlice = createSlice({
  name: "Courses",
  initialState: {
    courses: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;

// Thunks

export function fetchAllCourses() {
  return async function (dispatch, getState) {
    try {
      const { data } = await authFetch.get("/courses/publishedCourses");
      console.log(data)
      dispatch(setCourses(data));
    } catch (error) {
      console.log(error);
    }
  };
}

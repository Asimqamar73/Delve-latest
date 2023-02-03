import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";

export const coursesSlice = createSlice({
  name: "Courses",
  initialState: {
    courses: null,
    course: null,
    searchResult: null,
    isLoading: false,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearSearchCourses: (state) => {
      state.searchResult = null;
    },
  },
});

export const {
  setCourses,
  setCourse,
  setSearchResult,
  clearSearchCourses,
  setLoading,
} = coursesSlice.actions;
export default coursesSlice.reducer;

// Thunks

export function fetchAllCourses() {
  return async function (dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await authFetch.get("/courses/publishedCourses");
      dispatch(setCourses(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error);
    }
  };
}

export function fetchCourseDetails(courseId) {
  return async function fetchCourseDetailsThunk(dispatch, getState) {
    dispatch(setLoading(true));
    try {
      const { data } = await authFetch.get(`/course/courseDetails/${courseId}`);
      dispatch(setLoading(false));
      dispatch(setCourse(data));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
}

export function searchCourse(search) {
  return async function searchCourseThunk(dispatch, getState) {
    try {
      const { data } = await authFetch.post("/course/searchCourse", { search });
      dispatch(setSearchResult(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCoursesbyCategory(category) {
  return async function getCoursesByCategoryThunk(dispatch, getSatate) {
    dispatch(setLoading(true));
    try {
      const { data } = await authFetch.get(`/courses/category/${category}`);
      console.log(data);
      dispatch(setCourses(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error);
    }
  };
}

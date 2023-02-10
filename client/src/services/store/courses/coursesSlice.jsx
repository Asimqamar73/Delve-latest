import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";

export const coursesSlice = createSlice({
  name: "Courses",
  initialState: {
    courses: null,
    course: null,
    totalCourses: 0,
    noOfPages: 0,
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
    setPaginationInfo: (state, action) => {
      state.noOfPages = action.payload.totalPages;
      state.totalCourses = action.payload.totalCourses;
    },
  },
});

export const {
  setCourses,
  setCourse,
  setSearchResult,
  setPaginationInfo,
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
      dispatch(setCourse(data[0]));
      console.log(data[0])
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
}

export function searchCourse(search) {
  return async function searchCourseThunk(dispatch, getState) {
    dispatch(setLoading(true));

    try {
      const { data } = await authFetch.post("/course/searchCourse", { search });
      dispatch(setSearchResult(data));
      dispatch(setLoading(false));

      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));

    }
  };
}

export function getCoursesbyCategory(category, filter, sort) {
  return async function getCoursesByCategoryThunk(dispatch, getSatate) {
    dispatch(setLoading(true));
    const { language, level, rating } = filter;
    // console.log(sort)
    try {
      const { data } = await authFetch.get(
        `/courses/category/${category}?courseLanguage=${JSON.stringify(
          language
        )}&courseLevel=${JSON.stringify(level)}&rating=${rating}&sort=${sort}`
      );

      // console.log(data);
      console.log(data.courses);
      dispatch(setCourses(data.courses));
      dispatch(
        setPaginationInfo({
          totalCourses: data.totalCourses,
          totalPages: data.totalPages,
        })
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error);
    }
  };
}



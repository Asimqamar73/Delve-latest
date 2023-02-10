import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";
import { STATUSES } from "../../requestStatues";
import { setMessage } from "../auth/authSlice";

const initialState = {
  status: STATUSES.IDLE,
  message: "",
  courses: [],
  course: null,
};

export const courseListingSlice = createSlice({
  name: "instructorDashboard",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload
    },
    resetState: (state) => {
      state.status = STATUSES.IDLE
      state.message = ""

    }
  },
});
export const { setStatus, setCourses, setCourse, resetState } =
  courseListingSlice.actions;
export default courseListingSlice.reducer;

//Thunks
export function publishCourse(courseDetails) {
  return async function publishCourseThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await authFetch.post("/course/createCourse", courseDetails);
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      setMessage(error.response.data.msg)
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function getOwnCourses(id) {
  return async function getOwnCoursesThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await authFetch.get(`/course/getOwnCourses/${id}`);
      dispatch(setCourses(data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.msg)
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function manageCourse(courseId) {
  return async function courseDetailsThunk(dispatch, getState) {
    // This is used because when we logout out an account and login to  other account
    //we get courses of previous logged in account
    //(Only when we not refresh page by ourself after logged out from 1st account.)
    // Thats why we set course at initially null
    // We can achieve it by putting loading state in here.
    //*  dispatch(setCourse(null)) here or use below loading approach.
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await authFetch.get(`/course/ownCourseDetails/${courseId}`);
      dispatch(setCourse(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function modifyCourse(updatedData) {
  return async function manageCourseThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await authFetch.post("/course/editCourse2", updatedData);
      dispatch(setCourse(data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));

    }
  };
}

export function manageCourseCurriculumSection(courseData) {
  return async function updateCourseCurriculumSectionThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const { data } = await authFetch.patch(
        "/course/manageCourseCurriculumSection",
        courseData
      );
      dispatch(setCourse(data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));

    }
  };
}

export function manageCourseCurriculumContent(courseData) {
  return async function updateCourseCurriculumContentThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      // console.log(courseData);
      const { data } = await authFetch.patch(
        "/course/manageCourseCurriculumContent",
        courseData
      );
      // console.log(data);
      dispatch(setCourse(data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/user/userSlice";
import instructorReducer from "../store/instructor/instructorDashboardSlice";
import coursesReducer from "../store/courses/coursesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    instructor: instructorReducer,
    courses: coursesReducer,
  },
});

export default store;

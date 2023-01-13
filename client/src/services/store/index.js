import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/user/userSlice";
import instructorReducer from "../store/instructor/instructorDashboardSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    instructor: instructorReducer,
  },
});

export default store;

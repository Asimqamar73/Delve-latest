import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Login2 from "../pages/login/Login2";
import SignUp from "../pages/signUp/SignUp";
import SignUp2 from "../pages/signUp/SignUp2";
import Login3 from "../pages/login/Login3";
import InstructorSignUp from "../pages/signUp/InstructorSignUp";
import InstructorLogin from "../pages/login/InstructorLogin";
import AddCourse from "../pages/course/AddCourse";
import InstructorPrivateRoute from "./InstructorPrivateRoute";
import Dashboard from "../pages/instructorDashboard/Dashboard";
import Courses from "../pages/instructorDashboard/Courses";
import Communication from "../pages/instructorDashboard/Communication";
import Performance from "../pages/instructorDashboard/Performance";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/login2" element={<Login2 />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/login3" element={<Login3 />} />
        <Route path="/instructor-login" element={<InstructorLogin />} />
        <Route path="/signup2" element={<SignUp2 />} />
        <Route path="/instructor-signUp" element={<InstructorSignUp />} />
        <Route
          path="/instructor/dashboard"
          element={
            <InstructorPrivateRoute>
              <Dashboard />
            </InstructorPrivateRoute>
          }
        >
          <Route index element={<Courses />} />
          <Route path="communication" element={<Communication />} />
          <Route path="performance" element={<Performance />} />
        </Route>
        <Route
          path="instructor/create-course"
          element={
            <InstructorPrivateRoute>
              <AddCourse />
            </InstructorPrivateRoute>
          }
        />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

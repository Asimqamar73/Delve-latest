import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/home/Home";
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
import StudentDashboard from "../pages/studentDashboard/StudentDashboard";
import Profile from "../pages/studentDashboard/Profile";
import Security from "../pages/studentDashboard/Security";
import ManageCourse from "../pages/course/ManageCourse";
import Audience from "../pages/course/Audience";
import Curriculum from "../pages/course/Curriculum";
import CourseLandingPageInfo from "../pages/course/CourseLandingPageInfo";
import CourseDetails from "../pages/home/CourseDetails";
import EnrolledCourses from "../pages/home/EnrolledCourses";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
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
        <Route
          path="/instructor/dashboard/manage-course/:id"
          element={
            <InstructorPrivateRoute>
              <ManageCourse />
            </InstructorPrivateRoute>
          }
        >
          <Route path="audience" element={<Audience />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="basics" element={<CourseLandingPageInfo />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="course-details/:courseId" element={<CourseDetails />} />
          <Route
            path="course/enrolledCourses"
            element={
              <InstructorPrivateRoute>
                <EnrolledCourses />
              </InstructorPrivateRoute>
            }
          />
          <Route
            path="student/dashboard"
            element={
              <InstructorPrivateRoute>
                <StudentDashboard />
              </InstructorPrivateRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="security" element={<Security />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

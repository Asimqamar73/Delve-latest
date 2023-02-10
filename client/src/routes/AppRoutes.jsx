import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/home/Home";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import InstructorSignUp from "../pages/signUp/InstructorSignUp";
import InstructorLogin from "../pages/login/InstructorLogin";
import AddCourse from "../pages/course/AddCourse";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/instructorDashboard/Dashboard";
import Courses from "../pages/instructorDashboard/Courses";
import Communication from "../pages/instructorDashboard/Communication";
import Performance from "../pages/instructorDashboard/Performance";
import StudentDashboard from "../pages/studentDashboard/StudentDashboard";
import Profile from "../pages/studentDashboard/Profile";
import Security from "../pages/studentDashboard/Security";
import ManageCourse from "../pages/course/ManageCourse";
import CourseDetails from "../pages/home/CourseDetails";
import EnrolledCourses from "../pages/home/EnrolledCourses";
import ScrollToTop from "../lib/scroll/ScrollToTop";
import WatchCourse from "../pages/home/WatchCourse";
import ForgotPassword from "../pages/forgot password/ForgotPassword";
import CoursesByCategory from "../pages/home/CoursesByCategory";
import { CourseLandingPageInfo, CourseOutcome, Curriculum } from "../pages/course";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/instructor-login" element={<InstructorLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/instructor-signUp" element={<InstructorSignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route
            path="/instructor/dashboard/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route exact index element={<Courses />} />
            <Route path="communication" element={<Communication />} />
            <Route path="performance" element={<Performance />} />
          </Route>
          <Route
            path="instructor/create-course"
            element={
              <PrivateRoute>
                <AddCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/instructor/dashboard/manage-course/:id/"
            element={
              <PrivateRoute>
                <ManageCourse />
              </PrivateRoute>
            }
          >
            <Route path="requirements-and-objectives" element={<CourseOutcome />} />
            <Route path="curriculum" element={<Curriculum />} />
            <Route path="basics" element={<CourseLandingPageInfo />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route
              path="course-details/:courseId"
              element={<CourseDetails />}
            />
            <Route
              path="courses/category/:category"
              element={<CoursesByCategory />}
            />
            <Route
              path="course/enrolledCourses"
              element={
                <PrivateRoute>
                  <EnrolledCourses />
                </PrivateRoute>
              }
            />
            <Route
              path="student/dashboard/"
              element={
                <PrivateRoute>
                  <StudentDashboard />
                </PrivateRoute>
              }
            >
              <Route exact index element={<Profile />} />
              <Route path="security" element={<Security />} />
            </Route>
          </Route>
          <Route
            path="/course/watchCourse/:courseId"
            element={
              <PrivateRoute>
                <WatchCourse />
              </PrivateRoute>
            }
          />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default AppRoutes;

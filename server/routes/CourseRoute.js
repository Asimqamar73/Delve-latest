import express from "express";
import auth from "../middlewares/auth.js";
import {
  createCourse,
  editCourse,
  // findCourse,
  getOwnCourses,
  // courseDetails,
  editCourse2,
  fetchAllPublishedCourses,
  manageCourseCurriculumSection,
  manageCourseCurriculumContent,
  ownCourseDetails,
  fetchCourseDetails,
  fetchCourse,
  searchCourse,
  fetchCoursesByCategory,
} from "../controllers/CourseController.js";

const router = express.Router();

router.get("/course/courseDetails/:courseId", fetchCourseDetails);
router.get("/courses/category/:category", fetchCoursesByCategory);
router.post("/course/searchCourse", searchCourse);
router.get("/courses/publishedCourses", fetchAllPublishedCourses);
router.get("/course/learnCourse/:courseId", auth, fetchCourse);
router.get("/course/getOwnCourses/:id", auth, getOwnCourses);
router.get("/course/ownCourseDetails/:id", auth, ownCourseDetails);
router.get("/course/editCourse", auth, editCourse);
router.post("/course/createCourse", auth, createCourse);
router.post("/course/editCourse2", auth, editCourse2);

router.patch(
  "/course/manageCourseCurriculumSection",
  auth,
  manageCourseCurriculumSection
);
router.patch(
  "/course/manageCourseCurriculumContent",
  auth,
  manageCourseCurriculumContent
);

// router.post("/course/findCourse", findCourse);

export default router;

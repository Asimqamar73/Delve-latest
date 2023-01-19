import express from "express";
import auth from "../middlewares/auth.js";
import {
  createCourse,
  editCourse,
  // findCourse,
  getOwnCourses,
  courseDetails,
  editCourse2,
  fetchAllPublishedCourses,
} from "../controllers/CourseController.js";


const router = express.Router();

router.get("/course/editCourse", auth, editCourse);
router.get("/course/courseDetails/:id",auth, courseDetails);
router.get("/course/getOwnCourses/:id",auth, getOwnCourses);
router.get("/courses/publishedCourses", fetchAllPublishedCourses);
router.post("/course/createCourse",auth, createCourse);
router.post("/course/editCourse2",auth, editCourse2);

// router.post("/course/findCourse", findCourse);

export default router;

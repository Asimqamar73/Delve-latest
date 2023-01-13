import express from "express";
import {
  createCourse,
  editCourse,
  // findCourse,
  getOwnCourses,
  courseDetails,
  editCourse2,
} from "../controllers/CourseController.js";

const router = express.Router();

router.post("/course/createCourse", createCourse);
router.get("/course/editCourse", editCourse);
router.post("/course/editCourse2", editCourse2);
router.get("/course/courseDetails/:id", courseDetails);
router.get("/course/getOwnCourses/:id", getOwnCourses);
// router.post("/course/findCourse", findCourse);


export default router;

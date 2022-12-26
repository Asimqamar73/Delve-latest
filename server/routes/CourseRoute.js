import express from "express";
import {
  createCourse,
  editCourse,
  findCourse,
} from "../controllers/CourseController.js";

const router = express.Router();

router.post("/course/createCourse", createCourse);
router.get("/course/editCourse", editCourse);
router.post("/course/findCourse", findCourse);

export default router;

import express from "express";
import {
  changeAvatar,
  changePassword,
  courseEnrollment,
  forgotPassword,
  login,
  register,
  studentCount,
} from "../controllers/StudentController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get("/student", studentCount)
router.post("/student/login", login);
router.post("/student/createAccount", register);
router.patch("/student/courseEnrollment", auth, courseEnrollment);
router.patch("/student/changeAvatar", auth, changeAvatar);
router.patch("/student/changePassword", auth, changePassword);
router.post("/student/forgotPassword", forgotPassword);

export default router;

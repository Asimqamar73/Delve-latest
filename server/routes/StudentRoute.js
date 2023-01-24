import express from "express";
import {
  changeAvatar,
  courseEnrollment,
  login,
  register,
} from "../controllers/StudentController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/student/login", login);
router.post("/student/createAccount", register);
router.patch("/student/courseEnrollment", auth, courseEnrollment);
router.patch("/student/changeAvatar", auth, changeAvatar);

export default router;

import express from "express"
import { changeAvatar, login, register } from "../controllers/StudentController.js"
import auth from "../middlewares/auth.js"
const router = express.Router();

router.post("/student/login", login);
router.post("/student/createAccount", register);
router.patch("/student/changeAvatar",auth, changeAvatar);


export default router
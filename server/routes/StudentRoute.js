import express from "express"
import { login, register } from "../controllers/StudentController.js"



const router = express.Router();

router.post("/student/login", login);
router.post("/student/register", register);

export default router
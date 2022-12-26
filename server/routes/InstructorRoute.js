import express from "express"
import { login, register } from "../controllers/InstructorController.js"


const router = express.Router();

router.post("/instructor/login", login);
router.post("/instructor/register", register);


export default router
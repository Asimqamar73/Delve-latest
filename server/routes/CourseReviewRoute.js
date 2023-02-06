import express from "express";
import { postFeedback } from "../controllers/CourseReviewController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/courseReview/postFeedback", auth, postFeedback);

export default router;

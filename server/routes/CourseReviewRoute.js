import express from "express";
import { fetchCourseReviews, postFeedback } from "../controllers/CourseReviewController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/courseReview/postFeedback", auth, postFeedback);
router.get("/courseReview/reviews/:courseId", auth, fetchCourseReviews);


export default router;

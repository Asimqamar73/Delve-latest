import express from "express";
import { postFeedback } from "../controllers/InstructorReviewController.js";

const router = express.Router();

router.post("/instructorReview", postFeedback);
router.post("/editInstructorReview", postFeedback);

export default router;

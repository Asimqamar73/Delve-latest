import express from "express";
import {
  postFeedback,
  editFeedback,
} from "../controllers/InstructorReviewController.js";

const router = express.Router();

router.post("/instructorReview", postFeedback);
router.get("/editInstructorReview", editFeedback);

export default router;

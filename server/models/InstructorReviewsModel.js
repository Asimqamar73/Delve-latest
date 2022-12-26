import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Please provide id"],
    },
    review: {
      type: String,
      required: [true, "Please provide your feedback."],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: [true, "Please provide rating."],
    },
  },
  {
    timestamps: true,
  }
);

const instructorReviewSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  feedbacks: [reviewSchema],
});

const InstructorReview = mongoose.model(
  "Instructor-review",
  instructorReviewSchema
);
export default InstructorReview;

import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, "Please provide course title."],
    },
    courseDescription: {
      type: String,
      required: [true, "Please provide description"],
    },
    courseCategory: {
      type: String,
      required: [true, "Please provide description"],
    },
    courseThumbnail: {
      type: String,
      required: [true, "Please provide course thumbnail"],
    },
    cloudniaryCourseThumbnailId: {
      type: String,
      required: [true, "Please provide cloudniary ID"],
    },
    courseLevel: {
      type: String,
      enum: [
        "Beginner Level",
        "Intermediate Level",
        "Expert Level",
        "All Level",
      ],
      default: "All Level",
    },
    courseLanguage:{
      type:String,
      default:"English"
    },
    courseInstructor: {
      type: Schema.Types.ObjectId,
      // ref: "Instructor",
      ref: "Student",
      required: true,
    },
    courseObjectives: {
      type: Array,
    },
    courseRequirements: {
      type: Array,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;

import mongoose, { Schema } from "mongoose";

const sectionVideosSchema = new mongoose.Schema({
  videoTitle: {
    type: String,
  },
  content: {
    type: String,
  },
  contentCloudinaryId: {
    type: String,
  },
});

const courseCurriculumSchema = new mongoose.Schema({
  sectionTitle: {
    type: String,
  },
  sectionVideos: [sectionVideosSchema],
});

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
      enum: ["Beginner", "Intermediate", "Expert", "All Levels"],
      default: "All Levels",
    },
    courseLanguage: {
      type: String,
      default: "English",
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
    courseCurriculum: [courseCurriculumSchema],
    // courseCurriculum: {

    // type: [
    // {
    // sectionTitle: {
    // type: String,
    // default: "Section title",
    // required: true,
    // },
    // sectionContent: [
    // {
    // videoTitle: {
    // type: String,
    // required: true,
    // default: "Video title",
    // },
    // videoUrlCloudinary: {
    // type: String,
    // default: "Video Url",
    // },
    // cloudinaryVideoId: {
    // type: String,
    // default: "Video Id",
    // },
    // },
    // ],
    // },
    // ],
    // },
    // courseCurriculum: {
    //   type: Array,
    // },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: { virtuals: true },
  }
);

courseSchema.virtual("totalVideos").get(function () {
  var countVideos = 0;
  if (this.courseCurriculum) {
    this.courseCurriculum.map((section) => {
      countVideos += section.sectionVideos.length;
    });
  }

  return countVideos;
});

const Course = mongoose.model("Course", courseSchema);
export default Course;

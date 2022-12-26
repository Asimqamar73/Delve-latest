import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: [true, "Please provide course title."]
    },
    courseInstructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
        required: true
    }
})

const Course = mongoose.model("Course", courseSchema)
export default Course
import mongoose, { Schema } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";
import InstructorReview from "./InstructorReviewsModel.js";

// const reviewSchema = new mongoose.Schema(
//   {
//     reviewerId: {
//       type: Schema.Types.ObjectId,
//       ref: "Student",
//       required: [true, "Please provide id"],
//     },
//     review: {
//       type: String,
//       required: [true, "Please provide your feedback."],
//     },
//     rating: {
//       type: Number,
//       min: 0,
//       max: 5,
//       required: [true, "Please provide rating."],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 25,
      minLength: 5,
      required: [true, "Please provide name."],
    },
    email: {
      type: String,
      required: [true, "Please provide email."],
      unique: true,
    },
    // feedback: [reviewSchema],
    password: {
      type: String,
      minLength: 8,
      required: [true, "Please provide password."],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// To hash password...
instructorSchema.pre("save", async function () {
  console.log("object");
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});
instructorSchema.post("save", async function (doc) {
  // doc is the one document we get
  // after instructor creates it's account
  try {
    await InstructorReview.create({ _id: doc._id });
  } catch (error) {
    console.log(error);
  }
});

instructorSchema.methods.comparePassword = async function (inputPassword) {
  const isMatch = await compare(inputPassword, this.password);
  return isMatch;
};

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;

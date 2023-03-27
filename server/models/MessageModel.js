import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Please provide message"],
      trim: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Message = mongoose.model("Message", messageSchema);
export default Message;

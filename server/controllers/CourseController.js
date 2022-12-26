import Course from "../models/CourseModel.js";
import "express-async-errors";
import CustomAPIError from "../errors/CustomAPIError.js";
import { BadRequest } from "../errors/IndexErrors.js";

const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.send(course);

  // res.send("Create coures route")
};
const editCourse = async (req, res) => {
  res.send("Edit course route");
};
const findCourse = async (req, res) => {
  const course = await Course.find({
    courseTitle: "Javascript advanced course",
  }).populate("courseInstructor");
  res.send(course);
};

export { createCourse, editCourse, findCourse };

import Course from "../models/CourseModel.js";
import "express-async-errors";
import CustomAPIError from "../errors/CustomAPIError.js";
import { BadRequest } from "../errors/IndexErrors.js";
import Cloudniary from "cloudinary";
import fs from "fs";
import { StatusCodes } from "http-status-codes";

const createCourse = async (req, res) => {
  if (req.files && req.files.courseThumbnail.mimetype.startsWith("image")) {
    const courseThumbnailToCloud = await Cloudniary.v2.uploader.upload(
      req.files.courseThumbnail.tempFilePath,
      {
        use_filename: true,
        folder: "Courses-thumbnail",
      }
    );
    const course = await Course.create({
      courseTitle: req.body.courseTitle,
      courseCategory: req.body.courseCategory,
      courseDescription: req.body.courseDescription,
      courseThumbnail: courseThumbnailToCloud.secure_url,
      courseInstructor: req.user.userID,
      cloudniaryCourseThumbnailId: courseThumbnailToCloud.public_id,
    });
    res.status(StatusCodes.CREATED).json(course);
  }
  // res.send(course);
  // res.send({ data: courseThumbnailToCloud });
};

const editCourse = async (req, res) => {
  res.send("Edit course route");
};

const editCourse2 = async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  const course = await Course.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  // if(!course){
  //   throw new BadRequest("Someting went wrong, Please try again later.");
  // }
  res.send(course);
};

const courseDetails = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  res.send(course);
};
// const findCourse = async (req, res) => {
//   const course = await Course.find({
//     courseTitle: "Javascript advanced course",
//   }).populate("courseInstructor");
//   res.send(course);
// };

const getOwnCourses = async (req, res) => {
  const id = req.params.id;
  const courses = await Course.find({ courseInstructor: id });
  res.status(StatusCodes.OK).json(courses);
};

export { createCourse, editCourse, editCourse2, courseDetails, getOwnCourses };

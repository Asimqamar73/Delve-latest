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

const manageCourseCurriculumSection = async (req, res) => {
  const courseId = req.body.id;
  delete req.body.id;
  const course = await Course.findByIdAndUpdate(
    courseId,
    {
      $push: { courseCurriculum: req.body },
    },
    { new: true }
  );
  res.send(course);
};
const manageCourseCurriculumContent = async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  // const course = await Course.findById({
  // _id: req.body.courseId,
  // courseCurriculum: { $elemMatch: { _id: req.body.sectionId } },
  // });

  if (req.files && req.files.content.mimetype.startsWith("video")) {
    const courseVideoToCloud = await Cloudniary.v2.uploader.upload(
      req.files.content.tempFilePath,
      {
        resource_type: "video",
        use_filename: true,
        folder: `Courses-Content`,
      }
    );
    // const updatedCourse = await Course.updateOne(
    console.log(req.body);
    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: req.body.courseId,
        "courseCurriculum._id": req.body.sectionId,
        // courseCurriculum: { $elemMatch: { _id: req.body.sectionId } },
      },
      {
        $push: {
          "courseCurriculum.$.sectionVideos": {
            videoTitle: req.body.videoTitle,
            content: courseVideoToCloud.secure_url,
            contentCloudinaryId: courseVideoToCloud.public_id,
          },
        },
      },
      { new: true }
    );

    res.send(updatedCourse);
  }

  // const courseId = req.body.id;
  // delete req.body.id;
  // const course = await Course.findByIdAndUpdate(courseId, {
  //   $push: { courseCurriculum: req.body },
  // });
  // res.send(updatedCourse);
  // res.send(course);
};

const ownCourseDetails = async (req, res) => {
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

const fetchAllPublishedCourses = async (req, res) => {
  const courses = await Course.find({}).populate("courseInstructor");
  // if (!courseDetails) {
  //   BadRequest("Something went wrong, Please try again later.");
  // }
  res.send(courses);
};
const fetchCourseDetails = async (req, res) => {
  const course = await Course.findById({ _id: req.params.courseId }).populate(
    "courseInstructor"
  );
  res.status(StatusCodes.OK).json(course);
};
const fetchCourse = async (req, res) => {
  const course = await Course.findById({ _id: req.params.courseId }).populate(
    "courseInstructor"
  );
  res.status(StatusCodes.OK).json(course);
};

const searchCourse = async (req, res) => {
  const { search } = req.body;
  const courses = await Course.find(
    {
      courseTitle: { $regex: search, $options: "i" },
    },
    {
      courseTitle: 1,
      courseLevel: 1,
      courseCategory: 1,
      courseInstructor: 1,
      courseThumbnail: 1,
    }
  ).populate("courseInstructor");
  res.send(courses);
};

const fetchCoursesByCategory = async (req, res) => {
  const {category} = req.params;
  const courses = await Course.find({ courseCategory: category });
  res.send(courses);
};

export {
  createCourse,
  editCourse,
  editCourse2,
  manageCourseCurriculumSection,
  manageCourseCurriculumContent,
  fetchCourseDetails,
  ownCourseDetails,
  fetchCourse,
  getOwnCourses,
  fetchAllPublishedCourses,
  fetchCoursesByCategory,
  searchCourse,
};

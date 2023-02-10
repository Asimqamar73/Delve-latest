import Course from "../models/CourseModel.js";
import "express-async-errors";
import Cloudniary from "cloudinary";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

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
  if (req.files && req.files.content.mimetype.startsWith("video")) {
    const courseVideoToCloud = await Cloudniary.v2.uploader.upload(
      req.files.content.tempFilePath,
      {
        resource_type: "video",
        use_filename: true,
        folder: `Courses-Content`,
      }
    );
    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: req.body.courseId,
        "courseCurriculum._id": req.body.sectionId,
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
};

const ownCourseDetails = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  res.send(course);
};


const getOwnCourses = async (req, res) => {
  const id = req.params.id;
  const courses = await Course.find({ courseInstructor: id });
  res.status(StatusCodes.OK).json(courses);
};

const fetchAllPublishedCourses = async (req, res) => {
  const courses = await Course.find({}).populate("courseInstructor");
  res.status(StatusCodes.OK).json(courses);
};
const fetchCourseDetails = async (req, res) => {
  const { courseId } = req.params
  const queryResult = await Course.aggregate([
    {
      // aggregate does access id so we haveto convert it ObjectId
      $match: { _id: new mongoose.Types.ObjectId(courseId) }
    },
    {
      $lookup: {
        from: "course-reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews"
      }
    }, {
      $addFields: {
        averageRating: {
          $avg: "$reviews.rating"
        }
      }
    },
  ])

  const course = await Course.populate(queryResult, { path: "courseInstructor" })



  // const course = await Course.findById({ _id: courseId }).populate(
  //   "courseInstructor"
  // );
  res.status(StatusCodes.OK).json(course);
};

const fetchCourse = async (req, res) => {
  const course = await Course.findById({ _id: req.params.courseId }).populate(
    "courseInstructor"
  );
  // const { courseId } = req.params
  // const course = await Course.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(courseId) } }, {
  //   $lookup: {
  //     from: "course-reviews",
  //     localField: "_id",
  //     foreignField: "courseId",
  //     as: "reviews"
  //   }
  // },
  // ])
  // const result = await Course.populate(course, { path: "courseInstructor" })
  // console.log(result)
  // res.status(StatusCodes.OK).json(result);
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
  const { category } = req.params;
  const { courseLanguage, courseLevel, rating, sort, } = req.query;
  const queryObject = { courseCategory: category };
  if (JSON.parse(courseLanguage).length > 0) {
    queryObject.courseLanguage = { $in: JSON.parse(courseLanguage) };
  }
  if (JSON.parse(courseLevel).length > 0) {
    queryObject.courseLevel = { $in: JSON.parse(courseLevel) };
  }
  let sortBy = {}
  if (sort) {
    if (sort === "Trending") {
    }
    else if (sort === "Newest") {
      sortBy = { createdAt: -1 }
    }
    else {
      sortBy = { averageRating: -1 }
    }
  }
  if (rating) {
    // write rating logic here.
  }

  const totalCourses = await Course.countDocuments(queryObject);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(totalCourses / limit);
  // const courses = await Course.find(queryObject)
  //   .populate("courseInstructor")
  //   .sort({
  //     createdAt: -1,
  //   })
  //   .limit(limit)
  //   .skip(skip);



  const result = await Course.aggregate([{
    $lookup: {
      from: "course-reviews",
      localField: "_id",
      foreignField: "courseId",
      as: "reviews"
    }
  },
  { $addFields: { averageRating: { $avg: "$reviews.rating" } } },
  {
    $match: queryObject
  },
  {
    $sort: sortBy
  },
  ])
  console.log(result)
  const courses = await Course.populate(result, { path: "courseInstructor" })
  res.send({ courses, totalCourses, totalPages });
  // res.send({ courses, totalCourses });
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

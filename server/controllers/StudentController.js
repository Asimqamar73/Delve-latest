import BadRequest from "../errors/BadRequest.js";
import Student from "../models/StudentModel.js";
import { StatusCodes } from "http-status-codes";
import Cloudniary from "cloudinary";

const login = async (req, res, err) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide all values.");
  }
  const student = await Student.findOne({ email: email })
    .select("+password")
    .populate("enrolledCourses.courseId");
  if (!student) {
    throw new BadRequest("Invalid credentials.");
  }
  const isPasswordCorrect = await student.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequest("Invalid credentials.");
  }
  student.password = undefined;
  const token = student.createJWT();
  res.status(StatusCodes.OK).json({ student, token });
};

const register = async (req, res) => {
  //No nedd to find user email that already exist or not because unique attribute checks at student model (schema)
  // const student = await Student.findOne({email:email})
  const student = await Student.create(req.body);
  student.password = undefined;
  const token = student.createJWT();
  res.status(StatusCodes.OK).json({ token, student: student });
};
const changeAvatar = async (req, res) => {
  // console.log(req.files)
  console.log(req.user.userID);
  const student = await Student.findById(req.user.userID);
  if (req.files && req.files.avatar.mimetype.startsWith("image")) {
    if (student.avatarCloudinayId) {
      await Cloudniary.v2.uploader.destroy(student.avatarCloudinayId);
    }
    const avatarToCloud = await Cloudniary.v2.uploader.upload(
      req.files.avatar.tempFilePath,
      {
        use_filename: true,
        folder: "Students-avatar",
      }
    );
    student.avatar = avatarToCloud.secure_url || null;
    student.avatarCloudinayId = avatarToCloud.public_id || null;
    await student.save();
  }
  res.status(StatusCodes.OK).json({ student });
};

const courseEnrollment = async (req, res) => {
  console.log(req.user.userID), console.log(req.body);
  const student = await Student.findByIdAndUpdate(
    req.user.userID,
    {
      $push: { enrolledCourses: req.body },
    },
    { new: true }
  ).populate("enrolledCourses.courseId")
  res.status(StatusCodes.OK).json({ student });
};

export { login, register, changeAvatar, courseEnrollment };

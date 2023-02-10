import BadRequest from "../errors/BadRequest.js";
import Student from "../models/StudentModel.js";
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
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

const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = await Student.findById(req.user.userID).select("+password");
  if (!user) {
    throw new BadRequest("Something went wrong. Please try again later.");
  }
  i;
  const isPasswordCorrect = await user.comparePassword(currentPassword);
  if (!isPasswordCorrect) {
    throw new BadRequest("Please provide correct current password.");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ msg: "Password changed." });
};

const forgotPassword = async (req, res) => {
  console.log(req.body);
  const user = await Student.findOne({ email: req.body.userEmail });
  console.log(user);
  if (!user) {
    throw new BadRequest("Account email invalid.");
  }

  const n = crypto.randomInt(0, 1000000)
  console.log(n)
  const verificationCode = n.toString().padStart(6, "0");
  console.log(verificationCode)
  res.send("Email sent");
};

const changeAvatar = async (req, res) => {
  // console.log(req.files)
  console.log(req.user.userID);
  const student = await Student.findById(req.user.userID).populate(
    "enrolledCourses.courseId"
  );
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
const studentCount = async (req, res) => {
  const totalUsers = await Student.estimatedDocumentCount()
  res.status(StatusCodes.OK).json(totalUsers)

}

const courseEnrollment = async (req, res) => {
  console.log(req.user.userID), console.log(req.body);
  const student = await Student.findByIdAndUpdate(
    req.user.userID,
    {
      $push: { enrolledCourses: req.body },
    },
    { new: true }
  ).populate("enrolledCourses.courseId");
  res.status(StatusCodes.OK).json({ student });
};

export {
  login,
  register,
  changePassword,
  forgotPassword,
  changeAvatar,
  courseEnrollment,
  studentCount

};

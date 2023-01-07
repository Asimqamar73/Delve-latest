import BadRequest from "../errors/BadRequest.js";
import Student from "../models/StudentModel.js";
import { StatusCodes } from "http-status-codes";

const login = async (req, res, err) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide all values.");
  }
  const student = await Student.findOne({ email: email }).select("+password");
  if (!student) {
    throw new BadRequest("Invalid credentials.");
  }
  const isPasswordCorrect = await student.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequest("Invalid credentials.");
  }
  student.password = undefined;

  const token = student.createJWT();
  res.status(StatusCodes.OK).json({student,token});
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //No nedd to find user email that already exist or not because unique attribute checks at student model (schema)
  // const student = await Student.findOne({email:email})

  const response = await Student.create(req.body);
  response.password = undefined;
  res.status(StatusCodes.OK).json(response);
};

export { login, register };

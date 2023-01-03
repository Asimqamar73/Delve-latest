import BadRequest from "../errors/BadRequest.js";
import Student from "../models/StudentModel.js";

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
  res.status(200).json(student);
};

const register = async (req, res) => {
  // throw new BadRequest("hello")
  const response = await Student.create(req.body);
  res.status(200).json(response);
  // } catch (error) {
  //     res.status(400).json(error)
  // }
};

export { login, register };

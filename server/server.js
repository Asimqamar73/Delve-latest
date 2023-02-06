import express from "express";
import dotenv from "dotenv";
import StudentRouter from "./routes/StudentRoute.js";
import InstructorRouter from "./routes/InstructorRoute.js";
import CourseRoute from "./routes/CourseRoute.js";
import CourseReviewRouter from "./routes/CourseReviewRoute.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import connectDB from "./db/connection.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.js";
import fileUpload from "express-fileupload";
import * as Cloudinary from "cloudinary";

dotenv.config();
const app = express();

Cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const fun = (req, res) => {
  const name = "Asim";
  if (name == "Asim") {
    res.send("Asim route.");
  } else if (name == "hasnain") {
    res.send("hasnain route.");
  }
};
// app.use("/", fun)

app.use("/api/v1", StudentRouter);
app.use("/api/v1", InstructorRouter);
app.use("/api/v1", CourseRoute);
app.use("/api/v1", CourseReviewRouter);

app.use("/*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

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
import http from "http";
import { Server } from "socket.io";
import Message from "./models/MessageModel.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

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

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);
  // app.use("/api/v1/messages/sendMessage", async(req,res)=>{
  //   const messages = await fin
  // })
  socket.on("sendMessage", (message) => {
    Message.create;
    // console.log(message);
    io.emit("displayMessage", message);
  });
  //Server.engine.clientsCount
  console.log("connected users: ", io.engine.clientsCount);
  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});
app.use("/api/v1", StudentRouter);
app.use("/api/v1", InstructorRouter);
app.use("/api/v1", CourseRoute);
app.use("/api/v1", CourseReviewRouter);
app.use("/*", notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT} 👍`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

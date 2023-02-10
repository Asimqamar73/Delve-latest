import mongoose from "mongoose";

mongoose.set('strictQuery', true);
const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log("MongoDB Connected...")
    } catch (error) {
        console.log("Error")
        console.log(error)
    }
}

export default connectDB
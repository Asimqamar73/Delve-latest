import mongoose from "mongoose"
import bcrypt from "bcrypt"

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 25,
        min: 5,
        required: [true, "Please provide name."]
    },
    email: {
        type: String,
        required: [true, "Please provide email."],
        unique: true
    },
    password: {
        type: String,
        min: 8,
        required: [true, "Please provide password."],
        select: false
    }
}, {
    timestamps: true
})

// To hash password...
studentSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    // console.log("Pre hook triggered... student schema")
})
studentSchema.methods.comparePassword = async function (inputPassword) {
    const isMatch = await bcrypt.compare(inputPassword, this.password)
    return isMatch
}
const Student = mongoose.model("Student", studentSchema)
export default Student

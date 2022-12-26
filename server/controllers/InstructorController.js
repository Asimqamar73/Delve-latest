import Instructor from "../models/InstructorModel.js"
const login = async (req, res) => {
    const { email, password } = req.body
    const instructor = await Instructor.findOne({ email: email }).select("+password").populate("feedbacks")
    if(!instructor){
    }
    instructor.comparePassword(password)

    res.status(200).json(instructor)

}

const register = async (req, res) => {
    console.log(req.body)
    const response = await Instructor.create(req.body)
    res.status(200).json(response)
}

export {
    login,
    register
}
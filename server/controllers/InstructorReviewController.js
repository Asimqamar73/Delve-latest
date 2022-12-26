import InstructorReview from "../models/InstructorReviewsModel.js";

const postFeedback = async (req, res) => {
  const instructor = await InstructorReview.findOne({
    _id: "6399856ed4c19abad86b0b8f",
  });
  instructor.feedbacks.push({
    reviewerId: "6391f4efb945e3229c0b90b6",
    review: "This is a feedback from Asim to Asim",
    rating: 4,
  });
  const doc = await instructor.save();

  res.send(doc);

  // res.send("Post feedback...");
};

const editFeedback = async (req, res) => {
  res.send("edit feedback");
};

export { postFeedback, editFeedback };

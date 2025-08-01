const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const doctorReviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reply: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

doctorReviewSchema.plugin(timestamps);
module.exports = mongoose.model("DoctorReview", doctorReviewSchema);

const express = require("express");
const DoctorReview = require("../model/doctorReview.Schema");
const { sendResponse } = require("../utils/common");
const doctorReviewController = express.Router();
require("dotenv").config();
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

doctorReviewController.post(
  "/create",
  upload.single("video"),
  async (req, res) => {
    try {
      const { type, review, rating, userId } = req.body;

      if (!type || !rating || !userId) {
        return sendResponse(res, 400, "Failed", {
          message: "Required fields are missing.",
        });
      }

      let videoUrl = "";

      if (type === "video") {
        if (!req.file) {
          return sendResponse(res, 400, "Failed", {
            message: "Video file is required for video type.",
          });
        }
        const uploadedVideo = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "video",
        });
        videoUrl = uploadedVideo.secure_url;
      }

      const newReview = await DoctorReview.create({
        type,
        review: type === "text" ? review : "",
        videoUrl: type === "video" ? videoUrl : "",
        rating,
        userId,
      });

      const allReviews = await DoctorReview.find({});
      const avgRating = (
        allReviews.reduce((sum, r) => sum + Number(r.rating), 0) /
        allReviews.length
      ).toFixed(1);

      sendResponse(res, 200, "Success", {
        message: "Review submitted successfully!",
        data: newReview,
        averageRating: avgRating,
      });
    } catch (error) {
      sendResponse(res, 500, "Failed", { message: error.message });
    }
  }
);

doctorReviewController.post("/list", async (req, res) => {
  try {
    const {
      searchKey = "",
      status,
      pageNo = 1,
      pageCount = 10,
      sortByField = "createdAt",
      sortByOrder = "desc",
    } = req.body;

    const query = {};
    if (status !== undefined) query.status = status;
    if (searchKey) query.review = { $regex: searchKey, $options: "i" };

    const sort = { [sortByField]: sortByOrder === "asc" ? 1 : -1 };

    const reviews = await DoctorReview.find(query)
      .populate("userId", "firstName lastName location profilePic")
      .sort(sort)
      .skip((pageNo - 1) * pageCount)
      .limit(pageCount);

    const total = await DoctorReview.countDocuments(query);

    sendResponse(res, 200, "Success", {
      message: "List fetched",
      data: reviews,
      total,
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", { message: error.message });
  }
});

doctorReviewController.put("/update", async (req, res) => {
  try {
    const updated = await DoctorReview.findByIdAndUpdate(
      req.body._id,
      req.body,
      {
        new: true,
      }
    );
    sendResponse(res, 200, "Success", {
      message: "Review updated",
      data: updated,
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", { message: error.message });
  }
});

doctorReviewController.delete("/delete/:id", async (req, res) => {
  try {
    await DoctorReview.findByIdAndDelete(req.params.id);
    sendResponse(res, 200, "Success", {
      message: "Review deleted",
    });
  } catch (error) {
    sendResponse(res, 500, "Failed", { message: error.message });
  }
});

module.exports = doctorReviewController;

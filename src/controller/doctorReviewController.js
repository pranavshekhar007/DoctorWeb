const express = require("express");
const DoctorReview = require("../model/doctorReview.Schema");
const { sendResponse } = require("../utils/common");
require("dotenv").config();
const doctorReviewController = express.Router();

doctorReviewController.post("/create", async (req, res) => {
    try {
      const review = await DoctorReview.create(req.body);
  
      const allReviews = await DoctorReview.find({});
      const avgRating = (
        allReviews.reduce((sum, r) => sum + Number(r.rating), 0) / allReviews.length
      ).toFixed(1);
  
      sendResponse(res, 200, "Success", {
        message: "Review submitted successfully!",
        data: review,
        averageRating: avgRating,
      });
    } catch (error) {
      sendResponse(res, 500, "Failed", { message: error.message });
    }
  });
  

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
      if (searchKey)
        query.review = { $regex: searchKey, $options: "i" };
  
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
      const updated = await DoctorReview.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
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

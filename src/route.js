const express = require("express");
const router = express.Router();
const userController = require("./controller/userController");
const bannerController = require("./controller/bannerController");
const venderController = require("./controller/venderController");
const driverController = require("./controller/driverController");
const categoryController = require("./controller/categoryController");
const subCategory = require("./controller/subCategoryController");
const brandController = require("./controller/brandController");
const attributeSetController = require("./controller/attributeSetController");
const attributeController = require("./controller/attributeController");
const adminController = require("./controller/adminController");
const productController = require("./controller/productController");
const addressController = require("./controller/addressController");
const tagController = require("./controller/tagController");
const taxController = require("./controller/taxController");
const locationController = require("./controller/locationController");
const productTypeController = require("./controller/productTypeController");
const productManufactureLocationController = require("./controller/productManufactureLocationController");
const zipcodeController = require("./controller/zipcodeController");
const productRatingController = require("./controller/productRatingController");
const bookingController = require("./controller/bookingController");
const supportController = require("./controller/supportController");
const notificationController = require("./controller/notificationController");
const roleController = require("./controller/roleController");
const permissionController = require("./controller/permissionController");
const ticketCategoryController = require("./controller/ticketCategoryController");
const ticketController = require("./controller/ticketController");
const chatController = require("./controller/chatController");
const notifyController = require("./controller/notifyController");
const productFaqController = require("./controller/productFaqController");
const comboProductController = require("./controller/comboProductController");
const bulkOrderController = require("./controller/bulkOrderController");
const stateController = require("./controller/stateController");
const cityController = require("./controller/cityController");
const excelController = require("./controller/excelController");
const pincodeController = require("./controller/pincodeController");
const areaController = require("./controller/areaController");
const bulkLocationController = require("./controller/bulkLocationController");
const subscriptionChitController = require("./controller/subscriptionChitController");
const schemeConfigController = require("./controller/schemeConfigController");
const googleReviewController = require("./controller/googleReviewController");
const doctorReviewController = require("./controller/doctorReviewController");
const appointmentController = require("./controller/appointmentController");

router.use("/user", userController);
router.use("/driver", driverController);
router.use("/admin", adminController);
router.use("/banner", bannerController);
router.use("/vender", venderController);
router.use("/category", categoryController);
router.use("/sub-category", subCategory);
router.use("/brand", brandController);
router.use("/attribute-set", attributeSetController);
router.use("/attribute", attributeController);
router.use("/product", productController);
router.use("/combo-product", comboProductController);
router.use("/address", addressController);
router.use("/tag", tagController);
router.use("/tax", taxController);
router.use("/location", locationController);
router.use("/product-type", productTypeController);
router.use("/product-manufacture-location", productManufactureLocationController);
router.use("/zipcode", zipcodeController);
router.use("/rating", productRatingController);
router.use("/booking", bookingController);
router.use("/support", supportController);
router.use("/notification", notificationController);
router.use("/role", roleController);
router.use("/permission", permissionController);
router.use("/ticket-category", ticketCategoryController);
router.use("/ticket", ticketController);
router.use("/chat", chatController);
router.use("/notify", notifyController);
router.use("/productFaq", productFaqController);
router.use("/bulk-order", bulkOrderController);
router.use("/state", stateController);
router.use("/city", cityController);
router.use("/excel", excelController);
router.use("/pin-code", pincodeController);
router.use("/area", areaController);
router.use("/bulk-location", bulkLocationController);
router.use("/subscription", subscriptionChitController);
router.use("/scheme", schemeConfigController);
router.use("/review", googleReviewController);
router.use("/doctor-review", doctorReviewController);
router.use("/appointment", appointmentController);

module.exports = router;
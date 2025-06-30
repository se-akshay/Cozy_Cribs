const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewConteroller = require("../controllers/reviews.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

// Reviews routes

// Post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewConteroller.createNewReview)
);

// Delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewConteroller.destroyReview)
);

module.exports = router;

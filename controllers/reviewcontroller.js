import Review from "../models/review.js";

export function addReview(req, res) {
  if (!req.user) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  const data = req.body;

  data.name = req.user.firstName + " " + req.user.lastName;
  data.profilePicture = req.user.profilePicture;
  data.email = req.user.email;

  const newReview = new Review(data);

  newReview
    .save()
    .then(() => {
      res.status(201).json({
        message: "Review added successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to add review",
        error: error.message,
      });
    });
}

export function getReview(req, res) {
  const user = req.user;

  // Public users and non-admin users
  if (!user || user.role !== "admin") {
    Review.find({ isApproved: true })
      .then((reviews) => {
        res.json(reviews);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed to get reviews",
          error: error.message,
        });
      });

    return;
  }

  // Admin users
  Review.find()
    .then((reviews) => {
      res.json(reviews);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to get reviews",
        error: error.message,
      });
    });
}
export function deleteReview(req, res) {
  if (!req.user) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  const email = req.params.email;

  Review.findOne({ email: email })
    .then((review) => {
      if (!review) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      // ✅ Allow if admin OR owner
      if (req.user.role !== "admin" && req.user.email !== email) {
        return res.status(403).json({
          message: "You are not allowed to delete this review",
        });
      }

      return Review.deleteOne({ email: email });
    })
    .then(() => {
      res.json({
        message: "Review deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Review deletion failed",
        error: error.message,
      });
    });
}
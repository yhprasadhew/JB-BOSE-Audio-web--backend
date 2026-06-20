import Review from "../models/review.js";

export async function addReview(req, res) {
  if (!req.user) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  try {
    const data = req.body;

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data);

    await newReview.save();

    res.status(201).json({
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add review",
      error: error.message,
    });
  }
}

export async function getReview(req, res) {
  try {
    const user = req.user;

    // Public users and non-admin users
    if (!user || user.role !== "admin") {
      const reviews = await Review.find({ isApproved: true });
      return res.json(reviews);
    }

    // Admin users
    const reviews = await Review.find();
    return res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get reviews",
      error: error.message,
    });
  }
}

export async function deleteReview(req, res) {
  if (!req.user) {
    return res.status(401).json({
      message: "Please login first",
    });
  }

  try {
    const email = req.params.email;

    const review = await Review.findOne({ email });

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Allow if admin OR owner
    if (req.user.role !== "admin" && req.user.email !== email) {
      return res.status(403).json({
        message: "You are not allowed to delete this review",
      });
    }

    await Review.deleteOne({ email });

    res.json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Review deletion failed",
      error: error.message,
    });
  }
}

export async function approveReview(req, res) {
  const email = req.params.email;

  // Check login
  if (!req.user) {
    return res.status(401).json({
      message: "Please login and try again",
    });
  }

  // Only admin allowed
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Only admin can approve reviews",
    });
  }

  try {
    const result = await Review.updateOne(
      { email: email },
      { isApproved: true }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.json({
      message: "Review approved successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve review",
      error: error.message,
    });
  }
}
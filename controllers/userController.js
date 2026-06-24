import User from "../models/user.js";
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken";

export function RegisterUser(req, res) {

  const data = req.body ;

  data.password = bcrypt.hashSync(data.password,10)
  const newUser = new User(data);

  newUser
    .save().then(() => {
   
      res.json({
        message: "User registered successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "User registration failed",
        error: error.message,
      });
    });
}

//login
export function loginUser(req, res) {
  const data = req.body;

  User.findOne({
    email: data.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (user.isSuspended) {
        return res.status(403).json({
          message: "Your account has been suspended. Please contact support. ❌",
        });
      }

      const isPasswordCorrect = bcrypt.compareSync(
        data.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          profilePicture : user.profilePicture,
          phone :user.phone
        },
        process.env.JWT_SECRET
      );

      res.json({
        message: "Login successful",
        token: token,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Login failed",
        error: error.message,
      });
    });
}

export function isItCustomer(req){
    let isCustomer = false ;

    if(req.user != null){
        if(req.user.role == "customer"){
            isCustomer = true;
        }
    }
    return isCustomer ;
}

export function updateProfile(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { firstName, lastName, phone, address, profilePicture } = req.body;

  User.findOneAndUpdate(
    { email: req.user.email },
    { firstName, lastName, phone, address, profilePicture },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a new token with updated information
      const newToken = jwt.sign(
        {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          role: updatedUser.role,
          profilePicture: updatedUser.profilePicture,
          phone: updatedUser.phone
        },
        process.env.JWT_SECRET
      );

      res.json({
        message: "Profile updated successfully",
        token: newToken,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to update profile",
        error: error.message,
      });
    });
}

export function getUsers(req, res) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  User.find({}, { password: 0 })
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to fetch users", error: error.message });
    });
}

export function deleteUser(req, res) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const email = req.params.email;

  if (email === req.user.email) {
    return res.status(400).json({ message: "You cannot delete your own admin account!" });
  }

  User.findOneAndDelete({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to delete user", error: error.message });
    });
}

export function toggleSuspendUser(req, res) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const email = req.params.email;

  if (email === req.user.email) {
    return res.status(400).json({ message: "You cannot suspend your own admin account!" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isSuspended = !user.isSuspended;
      return user.save();
    })
    .then((updatedUser) => {
      res.json({
        message: `User account has been ${updatedUser.isSuspended ? "suspended" : "activated"} successfully`,
        user: updatedUser,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to update suspension status", error: error.message });
    });
}
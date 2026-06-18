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
        },
        "prasadjwt-123"
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
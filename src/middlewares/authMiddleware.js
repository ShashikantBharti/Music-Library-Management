import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized Access" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decodedToken?.email }).select(
      "-password"
    );

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  try {
    // Get token
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized Access" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decodedToken?.email }).select(
      "-password"
    );

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
});

export const isEditorOrAdmin = asyncHandler(async (req, res, next) => {
  try {
    // Get token
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized Access" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decodedToken?.email }).select(
      "-password"
    );

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    if (user.role === "viewer") {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
});

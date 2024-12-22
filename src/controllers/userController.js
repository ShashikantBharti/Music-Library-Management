import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAdminToken } from "../utils/createToken.js";

export const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to log out" });
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
      } else {
        res.cookie("token", user.token, { httpOnly: true });
        res.status(200).json({ message: "Login Successfull!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to login" });
  }
});

export const signup = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      const user = await User.create({ name, email, password, token });
      res.status(201).json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to sign up" });
  }
});

export const addUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role?.toLowerCase() === "admin") {
      return res.status(400).json({ message: "Role cannot be admin" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const if_token = generateAdminToken({
      email: email,
    });
    if (!if_token) {
      return res
        .status(401)
        .json({ status: false, message: "Error while generating token" });
    }

    await User.create({
      name,
      email,
      password,
      role,
      token: if_token,
    });
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to add user" });
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const { limit = 10, offset = 0, role } = req.query;
    const query = {};

    if (role) {
      query.role = role;
    }

    const parsedLimit = parseInt(limit, 10);
    const parsedOffset = parseInt(offset, 10);

    const users = await User.find(query)
      .select("-password")
      .skip(parsedOffset)
      .limit(parsedLimit);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to get users" });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "User ID is required" });
    } else {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json({ message: "User deleted successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid old password" });
      } else {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to update password" });
  }
});
export const addSuperAdmin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      // creating JWT tokekn for user base authentication
      const if_token = generateAdminToken({
        email: email,
      });
      if (!if_token) {
        return res
          .status(401)
          .json({ status: false, message: "Error while generating token" });
      }
      await User.create({
        email,
        password,
        role: "admin",
        token: if_token,
      });

      res.status(201).json({ message: "Super admin added successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to add super admin" });
  }
});

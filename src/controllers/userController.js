import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const logout = asyncHandler(async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to log out" });
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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        res.status(200).json({ token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
});

export const signup = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.status(201).json({ token });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to sign up" });
  }
});

export const addUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ message: "User added successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to add user" });
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to get users" });
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
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

export const addSuperAdmin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      await User.create({
        email,
        password,
        role: "admin",
      });
      res.status(201).json({ message: "Super admin added successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to add super admin" });
  }
});

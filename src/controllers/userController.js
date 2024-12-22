import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const logout = asyncHandler(async (req, res) => {
  res.send("Logout");
});

export const login = asyncHandler(async (req, res) => {
  res.send("login");
});

export const signup = asyncHandler(async (req, res) => {
  res.send("SIgn Up");
});

export const addUser = asyncHandler(async (req, res) => {
  res.send("Add New User");
});

export const getUsers = asyncHandler(async (req, res) => {
  res.send("Get All User");
});

export const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete single User");
});

export const updatePassword = asyncHandler(async (req, res) => {
  res.send("Update password");
});

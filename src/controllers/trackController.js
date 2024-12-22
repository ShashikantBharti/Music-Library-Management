import Track from "../models/Track.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteTrack = asyncHandler(async (req, res) => {
  res.send("Delete Track");
});

export const updateTrack = asyncHandler(async (req, res) => {
  res.send("Update Track");
});

export const getTracks = asyncHandler(async (req, res) => {
  res.send("Get All Track");
});

export const getTrack = asyncHandler(async (req, res) => {
  res.send("Get single Track");
});

export const addTrack = asyncHandler(async (req, res) => {
  res.send("Add New Track");
});

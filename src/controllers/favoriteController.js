import Favorite from "../models/Favorite.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteFavorite = asyncHandler(async (req, res) => {
  res.send("Delete Favorite");
});

export const getFavorites = asyncHandler(async (req, res) => {
  res.send("Get All Favorite");
});

export const addFavorite = asyncHandler(async (req, res) => {
  res.send("Add New Favorite");
});

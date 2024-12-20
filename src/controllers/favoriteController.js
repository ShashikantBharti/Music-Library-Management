import Favorite from "../models/Favorite.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const addFavorite = async (req, res) => {
  res.send("Add New Favorite");
};

import Artist from "../models/Artist.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const addArtist = async (req, res) => {
  res.send("Add New Artist");
};

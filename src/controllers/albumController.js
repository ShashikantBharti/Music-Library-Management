import Album from "../models/Album.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const addAlbum = async (req, res) => {
  res.send("Add New Album");
};

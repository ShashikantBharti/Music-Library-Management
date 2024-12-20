import Track from "../models/Track.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const addTrack = async (req, res) => {
  res.send("Add New Track");
};

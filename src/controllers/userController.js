import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const addUser = async (req, res) => {
  res.send("Add New User");
};

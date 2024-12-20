import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const logout = async (req, res) => {
  res.send("Logout");
};

export const login = async (req, res) => {
  res.send("login");
};

export const signup = async (req, res) => {
  res.send("SIgn Up");
};

export const addUser = async (req, res) => {
  res.send("Add New User");
};

export const getUsers = async (req, res) => {
  res.send("Get All User");
};

export const deleteUser = async (req, res) => {
  res.send("Get single User");
};

export const updatePassword = async (req, res) => {
  res.send("Update password");
};

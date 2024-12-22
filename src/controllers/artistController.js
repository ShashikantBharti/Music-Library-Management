import Artist from "../models/Artist.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteArtist = asyncHandler(async (req, res) => {
  res.send("Get all artists");
});

export const updateArtist = asyncHandler(async (req, res) => {
  res.send("Get all artists");
});

export const getArtist = asyncHandler(async (req, res) => {
  res.send("Get Single artists");
});

export const getArtists = asyncHandler(async (req, res) => {
  res.send("Get all artists");
});

export const addArtist = asyncHandler(async (req, res) => {
  res.send("Add New Artist");
});

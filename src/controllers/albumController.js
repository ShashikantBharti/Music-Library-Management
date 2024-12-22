import Album from "../models/Album.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteAlbum = asyncHandler(async (req, res) => {
  res.send("Delete Album");
});

export const updateAlbum = asyncHandler(async (req, res) => {
  res.send("Update Album");
});

export const getAlbums = asyncHandler(async (req, res) => {
  res.send("Get All Album");
});

export const getAlbum = asyncHandler(async (req, res) => {
  res.send("Get Single Album");
});

export const addAlbum = asyncHandler(async (req, res) => {
  res.send("Add New Album");
});

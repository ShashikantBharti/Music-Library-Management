import Album from "../models/Album.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteAlbum = asyncHandler(async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);
    if (!album) {
      res.status(404).json({ message: "Album not found" });
    } else {
      await Album.findByIdAndDelete(albumId);
      res.status(200).json({ message: "Album deleted successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete album", error: error.message });
  }
});

export const updateAlbum = asyncHandler(async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);
    if (!album) {
      res.status(404).json({ message: "Album not found" });
    } else {
      const updatedAlbum = await Album.findByIdAndUpdate(albumId, req.body, {
        new: true,
      });
      res
        .status(200)
        .json({ message: "Album updated successfully", album: updatedAlbum });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update album", error: error.message });
  }
});

export const getAlbums = asyncHandler(async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).json({ message: "Albums retrieved successfully", albums });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve albums", error: error.message });
  }
});

export const getAlbum = asyncHandler(async (req, res) => {
  try {
    const albumId = req.params.id;
    const album = await Album.findById(albumId);
    if (!album) {
      res.status(404).json({ message: "Album not found" });
    } else {
      res.status(200).json({ message: "Album retrieved successfully", album });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve album", error: error.message });
  }
});

export const addAlbum = asyncHandler(async (req, res) => {
  try {
    const { name, artist, year } = req.body;
    const album = await Album.create({ name, artist, year });
    res.status(201).json({ message: "Album added successfully", album });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add album", error: error.message });
  }
});

import Artist from "../models/Artist.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteArtist = asyncHandler(async (req, res) => {
  try {
    const artistId = req.params.id;
    const artist = await Artist.findByIdAndDelete(artistId);
    if (!artist) {
      res.status(404).send({ message: "Artist not found" });
    } else {
      res.send({ message: "Artist deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting artist" });
  }
});

export const updateArtist = asyncHandler(async (req, res) => {
  try {
    const artistId = req.params.id;
    const updatedArtist = await Artist.findByIdAndUpdate(artistId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedArtist) {
      res.status(404).send({ message: "Artist not found" });
    } else {
      res.send(updatedArtist);
    }
  } catch (error) {
    res.status(500).send({ message: "Error updating artist" });
  }
});

export const getArtist = asyncHandler(async (req, res) => {
  try {
    const artistId = req.params.id;
    const artist = await Artist.findById(artistId);
    if (!artist) {
      res.status(404).send({ message: "Artist not found" });
    } else {
      res.send(artist);
    }
  } catch (error) {
    res.status(500).send({ message: "Error getting artist" });
  }
});

export const getArtists = asyncHandler(async (req, res) => {
  try {
    const artists = await Artist.find().select("-password");
    if (!artists) {
      res.status(404).send({ message: "No artists found" });
    } else {
      res.send(artists);
    }
  } catch (error) {
    res.status(500).send({ message: "Error getting artists" });
  }
});

export const addArtist = asyncHandler(async (req, res) => {
  try {
    const { name, grammy, hidden } = req.body;
    const artistExists = await Artist.findOne({ name });
    if (artistExists) {
      res.status(400).send({ message: "Artist already exists" });
    } else {
      const newArtist = await Artist.create({ name, grammy, hidden });
      res.send(newArtist);
    }
  } catch (error) {
    res.status(500).send({ message: `Error adding artist: ${error.message}` });
  }
});

import Track from "../models/Track.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteTrack = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: "Track ID is required" });
  }

  try {
    const track = await Track.findByIdAndDelete(id);
    if (!track) {
      return res.status(404).send({ message: "Track not found" });
    }

    res.send({ message: "Track deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting track" });
  }
});

export const updateTrack = asyncHandler(async (req, res) => {
  const trackId = req.params.id;
  if (!trackId) {
    res.status(400).send({ message: "Track ID is required" });
    return;
  }

  try {
    const track = await Track.findById(trackId);
    if (!track) {
      res.status(404).send({ message: "Track not found" });
      return;
    }

    const updatedTrack = await Track.findByIdAndUpdate(trackId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(updatedTrack);
  } catch (error) {
    res.status(500).send({ message: "Error updating track" });
  }
});

export const getTracks = asyncHandler(async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 });
    res.send(tracks);
  } catch (error) {
    res.status(500).send({ message: "Error fetching tracks" });
  }
});

export const getTrack = asyncHandler(async (req, res) => {
  const trackId = req.params.id;
  if (!trackId) {
    res.status(400).send({ message: "Track ID is required" });
    return;
  }

  try {
    const track = await Track.findById(trackId);
    if (!track) {
      res.status(404).send({ message: "Track not found" });
      return;
    }

    res.send(track);
  } catch (error) {
    res.status(500).send({ message: "Error fetching track" });
  }
});

export const addTrack = asyncHandler(async (req, res) => {
  try {
    const { name, artist, album, duration } = req.body;
    if (!name || !artist || !album || !duration) {
      res.status(400).send({ message: "All fields are required" });
      return;
    }

    const newTrack = await Track.create(req.body);
    res.send(newTrack);
  } catch (error) {
    res.status(500).send({ message: "Error adding track" });
  }
});

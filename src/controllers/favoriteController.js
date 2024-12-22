import Favorite from "../models/Favorite.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";

export const deleteFavorite = asyncHandler(async (req, res) => {
  try {
    const favoriteId = req.params.id;
    const favorite = await Favorite.findByIdAndDelete(favoriteId);
    if (!favorite) {
      res.status(404).send({ message: "Favorite not found" });
    } else {
      res.send({ message: "Favorite deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting favorite" });
  }
});

export const getFavorites = asyncHandler(async (req, res) => {
  try {
    const favorites = await Favorite.find();
    if (!favorites) {
      res.status(404).send({ message: "No favorites found" });
    } else {
      res.send(favorites);
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching favorites" });
  }
});

export const addFavorite = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;
    const favorite = new Favorite({ name, description });
    const createdFavorite = await favorite.save();
    res.send({ message: "Favorite added successfully", favorite: createdFavorite });
  } catch (error) {
    res.status(500).send({ message: "Error adding favorite" });
  }
});

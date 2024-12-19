import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";

const favoriteSchema = new mongoose.Schema(
  {
    favorite_id: {
      type: mongoose.Schema.Types.String,
      default: uuid4,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    entityType: {
      type: String,
      enum: ["artist", "album", "track"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
export default Favorite;

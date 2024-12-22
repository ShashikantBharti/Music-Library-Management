import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";
const albumSchema = new mongoose.Schema(
  {
    album_id: {
      type: mongoose.Schema.Types.String,
      default: uuid4,
      unique: true,
    },
    name: {
      type: String,
      index: true,
      required: [true, "Album name is required!"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "Album release year is required!"],
      min: [1900, "Year cannot be earlier than 1900"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

albumSchema.pre("save", function (next) {
  if (this.isNew) {
    this.album_id = uuid4();
  }
  next();
});

const Album = mongoose.model("Album", albumSchema);
export default Album;

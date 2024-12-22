import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";

const trackSchema = new mongoose.Schema(
  {
    track_id: {
      type: String,
      default: uuid4,
      unique: true,
    },
    name: {
      type: String,
      index: true,
      required: [true, "Track name is required!"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Track duration is required!"],
      min: [1, "Duration must be greater than 0"],
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

trackSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.name = this.name.trim();
  next();
});

trackSchema.pre("save", function (next) {
  if (!this.isModified("duration")) return next();
  if (this.duration <= 0) {
    this.invalidate("duration", "Duration must be greater than 0");
  }
  next();
});

const Track = mongoose.model("Track", trackSchema);
export default Track;

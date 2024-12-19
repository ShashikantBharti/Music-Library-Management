import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";

const trackSchema = new mongoose.Schema(
  {
    track_id: {
      type: mongoose.Schema.Types.String,
      default: uuid4,
    },
    name: {
      type: String,
      index: true,
      required: [true, "Track name is required!"],
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
  }
);

trackSchema.pre("save", function (next) {
  this.name = this.name.trim();
  next();
});

const Track = mongoose.model("Track", trackSchema);
export default Track;

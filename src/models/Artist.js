import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";

const artistSchema = new mongoose.Schema(
  {
    artist_id: {
      type: mongoose.Schema.Types.String,
      default: uuid4,
    },
    name: {
      type: String,
      index: true,
      required: [true, "Artist name is required"],
    },
    grammy: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

artistSchema.pre("save", function (next) {
  this.name = this.name.trim();
  this.name = this.name.toLowerCase();
  next();
});

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;

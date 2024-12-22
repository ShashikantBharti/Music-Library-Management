import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid";

const artistSchema = new mongoose.Schema(
  {
    artist_id: {
      type: mongoose.Schema.Types.String,
      default: uuid4,
      unique: true,
    },
    name: {
      type: String,
      index: true,
      required: [true, "Artist name is required"],
      trim: true,
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
    toJSON: {
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

artistSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  next();
});

artistSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;

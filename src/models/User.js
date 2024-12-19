import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid"; // Import UUID generator
import bcrypt from "bcrypt"; // For Passord Hashing

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuid4, // Automatically Generates UUID
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Passord is required"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "viewer"], // Allow only these role
      default: "viewer", // default viewer
    },
  },
  {
    timestamps: true,
  }
);

// Hash Password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip is password is not changed
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export mode
const User = mongoose.model("User", userSchema);
export default User;

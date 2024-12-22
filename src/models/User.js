import mongoose from "mongoose";
import { v4 as uuid4 } from "uuid"; // Import UUID generator
import bcrypt from "bcrypt"; // For Passord Hashing

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.String,
      default: uuid4,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.",
      ],
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "viewer"],
      default: "viewer",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(`Error hashing password: ${error}`);
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

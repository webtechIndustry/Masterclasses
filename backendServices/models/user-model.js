import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    imgURL: { type: String },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    households: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Household",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

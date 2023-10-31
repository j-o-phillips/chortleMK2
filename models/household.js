import mongoose, { Schema } from "mongoose";
import { choreSchema } from "./chores";

const householdSchema = new Schema(
  {
    name: { type: String, required: true },
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    chores: [choreSchema],
  },
  {
    timestamps: true,
  }
);

const Household =
  mongoose.models.Household || mongoose.model("Household", householdSchema);

export default Household;

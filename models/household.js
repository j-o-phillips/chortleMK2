import mongoose, { Schema } from "mongoose";


const householdSchema = new Schema(
  {
    name: { type: String, required: true },
    users: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    chores: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Chore',
      },
  },
  {
    timestamps: true,
  }
);

const Household =
  mongoose.models.Household || mongoose.model("Household", householdSchema);

export default Household;

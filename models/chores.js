import mongoose, { Schema } from "mongoose";

const choreSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    assignees: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Household',
    },
  },
  {
    timestamps: true,
  }
);

const Chore = mongoose.models.Chore || mongoose.model("Chore", choreSchema);

export default Chore;

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
  },
  {
    timestamps: true,
  }
);

const Chore = mongoose.model("Chore", choreSchema);

export { Chore, choreSchema };

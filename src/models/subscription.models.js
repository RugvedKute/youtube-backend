import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      // The one who is subscribing
      typeof: Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      
      typeof: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const subscription = mongoose.model("Subscription", subscriptionSchema);

import mongoose from "mongoose";

const productTagsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    collection: "productTags",
  },
);

export default mongoose.models.productTags ||
  mongoose.model("productTags", productTagsSchema);

import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrize: { type: String, required: true },
  productImage: {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productTags",
    },
  ],
});

export default mongoose.models.Products ||
  mongoose.model("Products", ProductsSchema);

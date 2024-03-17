import mongoose, { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  sizes?: string[];
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;

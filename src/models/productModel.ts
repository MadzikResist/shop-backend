import mongoose, { Document, Schema } from "mongoose";

interface Price {
  formattedValue: string;
}
interface Product {
  code: string;
  name: string;
  price: Price;
  sizes?: string[];
  galleryImages: string[];
}

const productSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Schema.Types.Mixed,
      required: true,
    },
    sizes: {
      type: [String],
      default: [],
    },
    galleryImages: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

const Product = mongoose.model<Product & Document>("Product", productSchema);

export default Product;

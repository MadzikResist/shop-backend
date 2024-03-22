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
  category: string;
  colorNames: string[];
  colorsHex: string[];
  articleCodes: string[];
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
    category: {
      type: String,
      required: true,
    },
    colorNames: {
      type: [String],
      required: true,
    },
    colorsHex: {
      type: [String],
      required: true,
    },
    articleCodes: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model<Product & Document>("Product", productSchema);

export default Product;

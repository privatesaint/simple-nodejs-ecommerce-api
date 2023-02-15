import mongoose, { PaginateModel, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface ProductDocument extends Document {
  name: string;
  category: string;
  description: string;
  quantity: number;
  fileName: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    fileName: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.plugin(paginate);

schema.virtual("imageUrl").get(function () {
  return this.fileName
    ? `${process.env.CLOUDINARY_BASE_URL}product/${this.fileName}`
    : "";
});

export default mongoose.model<ProductDocument, PaginateModel<ProductDocument>>(
  "Product",
  schema,
  "products"
);

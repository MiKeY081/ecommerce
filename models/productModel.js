import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    description: String,
    price: { type: Number, required: true },
    discountRate: Number,
    image: [{ type: String }],
    imageLink: [{ type: String }],
    rating: { type: Number },
    userName: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);
// const userSchema = new Schema({
//     email: {type: String,
//             unique: true,
//             required: true,
//     },
//     password: { type: String,
//                 required: true,
//                 select: fasle,
//     }
// })
export const Product = models.Product || model("Product", ProductSchema);

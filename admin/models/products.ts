import { model, models, Schema } from "mongoose";


const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
//   image: {
//     type: String,
//     required: true,
//   },
});

export const Product = models.Product || model('Product', ProductSchema);

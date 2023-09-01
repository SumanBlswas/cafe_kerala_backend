import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  name: String,
  stars: String,
  price: String,
  size: String,
  volume: String,
  quantity: String,
  image: String,
});

const cartModel = mongoose.model("cart", cartSchema);

export { cartModel };

import mongoose from "mongoose";

const coffeeSchema = mongoose.Schema({
  name: String,
  volume: String,
  stars: String,
  price: String,
  description: String,
  image: String,
});

const coffeeModel = mongoose.model("coffee", coffeeSchema);

export { coffeeModel };

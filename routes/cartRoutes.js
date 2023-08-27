import express from "express";
import { cartModel } from "../models/cartModel.js";

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    const carts = new cartModel(req.body);
    await carts.save();
    res.status(200).send({ message: "carrt product added successfully" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

cartRouter.delete("/:id", async (req, res) => {
  try {
    await cartModel.findByIdAndDelete(id);
    res.status(200).send({ message: `successfully deleted the ${id}` });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

cartRouter.patch("/:id", async (req, res) => {
  try {
    await cartModel.findByIdAndUpdate(id);
    res.status(200).send({ message: `successfully updated the ${id}` });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export { cartRouter };

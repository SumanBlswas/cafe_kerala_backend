import express from "express";
import { coffeeModel } from "../models/coffeeModel.js";

const coffeeRouter = express.Router();

coffeeRouter.get("/", async (req, res) => {
  try {
    let coffees = await coffeeModel.find();
    res.status(200).send(coffees);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

coffeeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let coffees = await coffeeModel.findById(id);
    res.status(200).send(coffees);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

export { coffeeRouter };

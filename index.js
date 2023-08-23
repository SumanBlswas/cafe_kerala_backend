import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { coffeeRouter } from "./routes/coffeeRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Hello");
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

app.use("/users", userRouter);
app.use("/coffees", coffeeRouter);

app.listen(process.env.PORT_LINK, async () => {
  try {
    await connection;
    console.log(`connected to DB`);
  } catch (error) {
    console.log(error);
  }
  console.log(`connected to port no ${process.env.PORT_LINK}`);
});

export { app };

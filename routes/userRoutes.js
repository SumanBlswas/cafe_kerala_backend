import express from "express";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { validator } from "../validator/validator.js";
import jwt from "jsonwebtoken";
import { checkMe } from "../middleware/checkMe.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    let users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.find({ email });
    if (user.length > 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            userID: user[0]._id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          "suman"
        );
        res.status(200).send({
          msg: "Login Successfull",
          token,
        });
      } else {
        res.status(404).send({ msg: "Wrong Credential" });
      }
    } else {
      res.status(404).send({ msg: "Wrong Credential" });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

// userRouter.use("/google_register", async (req, res) => {});

userRouter.use(validator);

userRouter.post("/add", async (req, res) => {
  const { email, password, name, dob, gender, picture, subscribed, sharedata } =
    req.body;
  try {
    let userEmail = await userModel.find({ email });
    if (userEmail.length > 0) {
      res.status(404).send({
        msg: "User Already Exist pls try to login with your email and password or you can simply use google to login.",
      });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const userData = {
          email,
          password: hash,
          name,
          dob,
          gender,
          picture,
          subscribed,
          sharedata,
        };
        let user = new userModel(userData);
        await user.save();
        res.status(200).send({ msg: "A new user added" });
      });
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

userRouter.use(checkMe);

userRouter.get("/account", async (req, res) => {
  const { userID } = req.body;
  try {
    const user = await userModel.findById({
      _id: userID,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

export { userRouter };

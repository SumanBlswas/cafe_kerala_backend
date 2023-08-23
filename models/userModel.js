import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  name: String,
  dob: String,
  gender: String,
  picture: String,
  subscribed: Boolean,
  sharedata: Boolean,
});

userSchema.index({ email: 1 }, { unique: true });

const userModel = mongoose.model("user", userSchema);

export { userModel };

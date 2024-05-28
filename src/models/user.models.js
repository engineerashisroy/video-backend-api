import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      requied: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      requied: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary
      requied: true,
    },
    coverImage: {
      type: String, //cloudinary
      requied: true,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password requied"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  //both method are correct
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hashedPasword = await bcrypt.hash(this.password, salt);
  this.password = hashedPasword;
  next();
  //simple way to bcrypt our password
  // try {
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(this.password, salt);
  //   this.password = hashedPassword;
  //   next();
  // } catch (error) {
  //   next(error);
  // }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);

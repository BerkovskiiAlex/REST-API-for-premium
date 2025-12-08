import { Schema, model } from "mongoose";
import Joi from "joi";

import { handleSaveError, preUpdate } from "./hooks.js";

const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    premium: { type: Boolean, default: false },
    premiumExpires: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findByIdAndUpdate", preUpdate);

userSchema.post("findByIdAndUpdate", handleSaveError);

export const userLoginSchema = Joi.object({
  userId: Joi.string().required(),
});

export const userUpdatePremiumSchema = Joi.object({
  userId: Joi.string().required(),
});

export const userCheckPremiumSchema = Joi.object({
  userId: Joi.string().required(),
});

const User = model("User", userSchema);

export default User;

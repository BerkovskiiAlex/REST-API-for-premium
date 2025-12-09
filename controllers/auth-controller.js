import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";
import HttpError from "../helpers/HttpError.js";

const loginOrSignup = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw HttpError(400, "userId is required");
  }

  let user = await User.findOne({ userId });

  if (!user) {
    user = new User({ userId });
    await user.save();
    return res.status(201).json({ message: "User created", user });
  }

  return res.status(200).json({ message: "User logged in", user });
};

const setPremium = async (req, res) => {
  const { userId, days } = req.body;

  if (!userId) {
    throw HttpError(400, "userId is required");
  }

  const user = await User.findOne({ userId });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const expires = new Date();
  expires.setDate(expires.getDate() + (days || 30));

  user.premium = true;
  user.premiumExpires = expires;

  await user.save();

  res.json({ success: true, premium: true, premiumExpires: expires });
};

const checkPremium = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    throw HttpError(400, "userId is required");
  }

  const user = await User.findOne({ userId });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.premiumExpires && user.premiumExpires < new Date()) {
    user.premium = false;
    await user.save();
  }

  return res.json({
    exists: true,
    premium: user.premium,
    premiumExpires: user.premiumExpires,
  });
};

export default {
  loginOrSignup: ctrlWrapper(loginOrSignup),
  setPremium: ctrlWrapper(setPremium),
  checkPremium: ctrlWrapper(checkPremium),
};

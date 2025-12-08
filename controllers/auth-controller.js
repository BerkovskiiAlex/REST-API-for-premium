import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";

const loginOrSignup = async (req, res) => {
  console.log("Server using DB_HOST:", process.env.DB_HOST);

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId });
      await user.save();
      return res.status(201).json({ message: "User created", user });
    }

    return res.status(200).json({ message: "User logged in", user });
  } catch (error) {
    console.error("loginOrSignup error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const setPremium = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + 30);

    user.premium = true;
    user.premiumExpires = expires;

    await user.save();

    res.json({ success: true, premium: true, premiumExpires: expires });
  } catch (error) {
    console.error("setPremium error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const checkPremium = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ premium: false, exists: false });
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
  } catch (error) {
    console.error("checkPremium error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default {
  loginOrSignup: ctrlWrapper(loginOrSignup),
  setPremium: ctrlWrapper(setPremium),
  checkPremium: ctrlWrapper(checkPremium),
};

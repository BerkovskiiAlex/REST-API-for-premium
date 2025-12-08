import express from "express";

import { validateBody } from "../decorators/index.js";

import {
  userCheckPremiumSchema,
  userLoginSchema,
  userUpdatePremiumSchema,
} from "../models/User.js";

import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/loginOrSignup",
  validateBody(userLoginSchema),
  authController.loginOrSignup
);

authRouter.post(
  "/updatePremium",
  validateBody(userUpdatePremiumSchema),
  authController.setPremium
);

authRouter.get(
  "/checkPremium",
  validateBody(userCheckPremiumSchema),
  authController.checkPremium
);

export default authRouter;

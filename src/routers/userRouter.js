import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  getChangePassword,
  postChangePassword,
} from "../controller/userController";
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get(":id([0-9a-f]{24})", see);

export default userRouter;

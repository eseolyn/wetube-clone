import express from "express";
import { edit, remove, logout, see } from "../controller/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get(":id([0-9a-f]{24})", see);

export default userRouter;

import express from "express";
import { userRegistration } from "../controllers/user-controllers";

const userRouter = express.Router();

userRouter.post("/register", userRegistration);

export default userRouter;

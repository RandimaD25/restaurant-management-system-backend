import express from "express";
import { userRegistration, userLogin } from "../controllers/user-controllers";

const userRouter = express.Router();

userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);

export default userRouter;

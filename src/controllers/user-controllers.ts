import { Request, Response } from "express";
import {
  registerUser,
  generateToken,
  loginUser,
} from "../services/user-service";

export const userRegistration = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const newUser = await registerUser(email, password);
    const token = generateToken(newUser.userId);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        userId: newUser.userId,
        email: newUser.email,
      },
      token,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

export const userLogin = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { id, data, token } = await loginUser(email, password);
    return res.status(200).json({
      id,
      data,
      message: "User logged in successfully",
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

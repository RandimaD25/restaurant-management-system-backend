import { Request, Response } from "express";
import { registerUser, generateToken } from "../services/user-service";

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
    console.log("Error:", error.message);
  }
};

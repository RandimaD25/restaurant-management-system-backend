import { Request, Response } from "express";
import { registerUser } from "../services/user-service";

export const userRegistration = async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const newUser = await registerUser(email, password);
    const token = await registerUser(email, password);

    res.json({
      success: true,
      message: "User registered successfully",
      data: newUser,
      token: token,
    });
  } catch (error: any) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

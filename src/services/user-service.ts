import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Generate JWT token for a user
export const generateToken = function (userId: number) {
  const payload = {
    userId,
    date: new Date().toISOString(),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "1h",
  });

  return token;
};

// Register a new user
export const registerUser = async function (email: string, password: string) {
  if (!email || !password) {
    throw new Error("Please enter all the details");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists with the given email address");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return newUser;
};

//user login
export const loginUser = async function (email: string, password: string) {
  if (!email || !password) {
    throw new Error("Please enter all details");
  }

  const userExist = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!userExist) {
    throw new Error("Email Address is incorrect");
  }

  const isPasswordMatched = await bcrypt.compare(password, userExist.password);
  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  const token = generateToken(userExist.userId);
  return { id: userExist.userId, data: email, token };
};

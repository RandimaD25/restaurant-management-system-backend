import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const generateToken = function (userId: number) {
  let data = {
    userId: userId,
    date: Date(),
  };

  const token = jwt.sign(data, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "1h",
  });
  return token;
};

export const registerUser = async function (email: string, password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const userExist = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!email || !password) {
    throw new Error("Please enter all the details");
  }

  if (userExist) {
    throw new Error("User already exist with the given email address");
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashPassword,
    },
  });

  const token = generateToken(newUser.userId);
};

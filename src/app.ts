import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/auth-route";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API working");
});

// api endpoints
app.use("/api/user", userRouter);

app.listen(port, () => console.log("Server started"));

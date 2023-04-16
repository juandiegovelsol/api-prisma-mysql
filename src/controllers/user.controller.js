import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const user = {
  username: "email@test.com",
  passwd: "secret_passwd",
};

export const generateToken = (req, res) => {
  try {
    const { user } = req.body;
    const payload = { ...user };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    res.status(200).json({ ...user, token });
  } catch (error) {
    res.status(500).json({ error: false });
  }
};

//midleware
export const login = async (req, res, next) => {
  const { username, passwd } = req.body;
  try {
    if (username === user.username && passwd === user.passwd) {
      req.body.user = {
        name: "Juan",
        lastName: "Velasco",
      };
      next();
    } else {
      res.status(401);
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  console.log(token);
  next();
};

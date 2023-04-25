import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/* const user = {
  username: "email@test.com",
  passwd: "secret_passwd",
}; */

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
  const { username: email, passwd: password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    const isValidUser = bcrypt.compareSync(password, user.password);
    if (isValidUser) {
      next();
    } else {
      res
        .status(401)
        .json({ error: true, message: "Invalid user or password" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { exp: expDate } = decoded;

    //expired? verificar esta validacion
    if (Date.now / 1000 > expDate) {
      res.status(401);
    } else {
      //should verify token is correct and could verify if username exists in db
      next();
    }
  } catch (error) {}
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hash },
  });
  res.status(201).json(user);
};

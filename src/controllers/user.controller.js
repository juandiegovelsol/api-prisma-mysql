import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  const { username: email, passwd: password } = req.body;
  try {
    const hash = bcrypt.hashSync(password, 12);
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: hash,
      },
    });
    console.log("user", user);
    /*     if (username === user.username && passwd === user.passwd) {
      req.body.user = {
        name: "Juan",
        lastName: "Velasco",
      };
      next();
    } else {
      res.status(401).send();
    } */
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { exp: expDate } = decoded;

    console.log(decoded);

    //expired? verificar esta validacion
    if (expDate < Date.now() / 1000) {
      console.log(expDate, Date.now());
      res.status(401);
      console.log("expired");
    } else {
      //should verify token is correct and could verify if username exists in db
      next();
    }
    /*  next(); */
  } catch (error) {}

  /*   console.log(token);
  next(); */
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hash },
  });
  res.status(201).json(user);
};

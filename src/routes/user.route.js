import express from "express";
import {
  login,
  generateToken,
  register,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", login, generateToken);
router.post("/", register);
export default router;

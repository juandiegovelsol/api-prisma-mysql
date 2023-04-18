import express from "express";
import {
  getAllGestor,
  getOneGestor,
  createGestor,
  updateGestor,
  deleteOneGestor,
} from "../controllers/gestor.controller.js";
import { verifyToken } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllGestor);

router.get("/:id", verifyToken, getOneGestor);

router.post("/", createGestor);

router.put("/:id", verifyToken, updateGestor);

router.delete("/:id", verifyToken, deleteOneGestor);

export default router;

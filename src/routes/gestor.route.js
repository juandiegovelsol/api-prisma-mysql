import express from "express";
import {
  getAllGestor,
  getOneGestor,
  createGestor,
  updateGestor,
  deleteOneGestor,
} from "../controllers/gestor.controller.js";

const router = express.Router();

router.get("/", getAllGestor);

router.get("/:id", getOneGestor);

router.post("/", createGestor);

router.put("/:id", updateGestor);

router.delete("/:id", deleteOneGestor);

export default router;

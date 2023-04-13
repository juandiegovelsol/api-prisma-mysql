import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllGestor = async (req, res) => {
  try {
    const gestors = await prisma.gestor.findMany();
    if (gestors.length >= 1) {
      res.status(200).json(gestors);
    } else {
      res.status(200).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const getOneGestor = async (req, res) => {
  try {
    const { id } = req.params;
    const gestor = await prisma.gestor.findUnique({
      where: {
        idgestor: +id,
      },
    });
    if (Object.keys(gestor).length > 0) {
      res.status(200).json(gestor);
    } else {
      res.status(200).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const createGestor = async (req, res) => {
  try {
    const newGestor = await prisma.gestor.create({
      data: req.body,
    });
    res.status(201).json(newGestor);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const updateGestor = async (req, res) => {
  try {
    const { id } = req.params;
    const gestor = await prisma.gestor.update({
      where: {
        idgestor: +id,
      },
      data: req.body,
    });
    res.json(gestor);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const deleteOneGestor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.gestor.delete({
      where: {
        idgestor: +id,
      },
    });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

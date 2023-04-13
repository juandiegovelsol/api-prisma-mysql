import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createGestorProject = async (req, res) => {
  try {
    const newGestorProject = await prisma.gestor_project.create({
      data: req.body,
    });
    res.status(201).json(newGestorProject);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const getAllGestorProject = async (req, res) => {
  try {
    const allGestorProject = await prisma.gestor_project.findMany({
      include: {
        gestor: {
          select: {
            name: true,
            lastName: true,
          },
        },
        project: true,
      },
    });

    const computedData = allGestorProject.map(
      ({ idgestor, idproject, gestor, project }) => {
        return {
          idgestor,
          idproject,
          project: project.name,
          prokectDescription: project.description,
          gestor: `${gestor.name} ${gestor.lastName}`,
        };
      }
    );
    res.status(200).json(computedData);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

import { db as prisma } from "../../shared/db";
import { Request, Response } from "express";

export const getAllOngs = async (req: Request, res: Response) => {
  try {
    const allOngs = await prisma.ong.findMany({
      include: {
        rifas: true,
        trabalhos: true,
        Voluntarios: true,
      },
    });
    res.status(200).json({ ongs: allOngs });
  } catch (error) {
    res.status(404).json({ message: `error ao buscar ongs${error}` });
  }
};

export const getByNameOng = async (req: Request, res: Response) => {
  try {
    const nome = req.body.nome;
    const getOngByName = await prisma.ong.findMany({
      where: {
        nome: nome,
      },
      include: {
        rifas: true,
        trabalhos: true,
        Voluntarios: true,
      },
    });
    res.status(200).json({ ong: getOngByName });
  } catch (error) {
    res.status(404).json({ message: `erro ao achar essa ong ${error}` });
  }
};

export const createOng = async (req: Request, res: Response) => {
  try {
    const { nome, endereco } = req.body;

    const createOng = await prisma.ong.create({
      data: {
        nome: nome,
        endereco: endereco,
      },
    });
    res.status(200).json({ ong: createOng });
  } catch (error) {
    res.status(404).json({ fail: error });
  }
};

export const deleteOng = async (req: Request, res: Response) => {
  try {
    const id = req.body.id

    const deleteOng = await prisma.ong.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ success: deleteOng})
  } catch (error) {
    res.status(404).json({ fail: error });
  }
};

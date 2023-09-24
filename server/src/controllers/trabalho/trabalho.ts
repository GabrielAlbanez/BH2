import { db as prisma } from "../../shared/db";
import { Request, Response } from "express";

export const getAlltrabalhos = async (req: Request, res: Response) => {
  try {
    const allTrabalhos = await prisma.trabalho.findMany({
      include: {
        ong: true,
      },
    });
    res.status(200).json({
      works: allTrabalhos,
    });
  } catch (error) {
    res.status(404).json({
      message: "erro ao pegar todos os trabalhos",
    });
  }
};

export const getByWorksNameOng = async (req: Request, res: Response) => {
  try {
    const nameOng = req.body.nameOng;

    const getWorksWithNameOng = await prisma.trabalho.findMany({
      where: {
        nome: nameOng,
      },
      include: {
        ong: true,
      },
    });

    res.status(200).json({works : getWorksWithNameOng})

  } catch (error) {
    res.status(404).json({ message: `erro ao achar trabalho ${error}` });
  }
};


export const createWorks = async (req: Request, res: Response) => {
  try {

    const {nome,descricao,idOng} = req.body

     const createWork  =  await prisma.trabalho.create({
      data : {
       nome : nome,
       descricao : descricao,
       idOng
      }
     })

     res.status(200).json({
      work : createWork
     })

  } catch (error) {
    res.status(404).json({ message: `erro ao criar trabalho ${error}` });
  }
};


export const deleteWorks = async (req: Request, res: Response) => {
  try {

    const {id} = req.body

     const deleteWork  =  await prisma.trabalho.delete({
      where : {
        id
      }
     })

     res.status(200).json({
      workDeleted : deleteWork
     })

  } catch (error) {
    res.status(404).json({ message: `erro ao deletar trabalho ${error}` });
  }
};
import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";

export const validTypeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userCPf = req.params.userCPf;

  const adminCpf = await prisma.usuario.findMany({
    where: {
      tipo: "admin",
    },
    select: {
      cpf: true,
    },
  });

  const adminCpfs = adminCpf.map((admin) => admin.cpf);

  if (adminCpfs.includes(userCPf)) {
    //se bater quer dizer que o cpf do cara e de adm
    return next();
  } else {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
};

export const validaDataOngs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, endereco } = req.body;

  if (!nome || !endereco) {
    return res.status(404).json({ message: "pré encha todos os campos" });
  }

  const nameOngs = await prisma.ong.findMany({
    where: {
      nome: nome,
    },
  });

  const enderecoOng = await prisma.ong.findMany({
    where: {
      endereco: endereco,
    },
  });

  if (nameOngs.length > 0) {
     return res.status(200).json({ message: "ong ja cadastrada" });
  }

  if (enderecoOng.length > 0) {
   return res.status(200).json({ message: "ong ja cadastrada" });
  }

  next();
};

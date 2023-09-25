import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";

export const validateOngUserAndUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const NameOrCpf = req.params.NameOrCpf;

  const nomeOng = await prisma.ong.findMany({
    where: {
      nome: NameOrCpf,
    },
    select: {
      nome: true,
    },
  });

  const ongNomes = nomeOng.map((nome) => nome.nome);


  const adminCpf = await prisma.usuario.findMany({
    where: {
      tipo: "admin",
    },
    select: {
      cpf: true,
    },
  });

  const adminCpfs = adminCpf.map((admin) => admin.cpf);

  if (ongNomes.includes(NameOrCpf) || adminCpfs.includes(NameOrCpf)) {
    next();
  } else {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
};

export const validateDataRifa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, preco, descricaon, idOng } = req.body;

  if (!nome || !preco || !descricaon || !idOng) {
    return res.status(404).json({ error: "favor pré encher todos os campos" });
  }

  const nameRifaExisting = await prisma.rifa.findMany({
    where: {
      nome: nome,
    },
  });

  if (nameRifaExisting.length > 0) {
    return res.status(404).json({ message: "essa rifa ja existe" });
  }

  next();
};

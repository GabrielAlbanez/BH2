import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import { cnpj as cnpjValid } from "cpf-cnpj-validator";

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
    return res.status(203).json({ error: "Acesso não autorizado" });
  }
};

export const validateDataRifa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, preco, descricaon, cnpj } = req.body;
  const cnpjValido = cnpjValid.isValid(cnpj);

  if (!nome || !preco || !descricaon || !cnpj) {
    return res.status(203).json({ error: "favor pré encher todos os campos" });
  }

  if(!cnpjValid){
    return res.status(203).json({message : "cnpj da ong invalido"})
  }

  const nameRifaExisting = await prisma.rifa.findMany({
    where: {
      nome: nome,
    },
  });

  if (nameRifaExisting.length > 0) {
    return res.status(203).json({ message: "essa rifa ja existe" });
  }

  next();
};

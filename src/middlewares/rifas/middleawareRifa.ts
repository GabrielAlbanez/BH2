import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import { cnpj as cnpjValid } from "cpf-cnpj-validator";

export const validateOngUserAndUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cnpjOng = req.body.cnpjOng;

  const nomeOng = await prisma.ong.findMany({
    where: {
      cnpj: cnpjOng,
    },
    select: {
      cnpj: true,
    },
  });

  const ongCnpjs = nomeOng.map((cnpj) => cnpj.cnpj);


  const adminCpf = await prisma.usuario.findMany({
    where: {
      tipo: "admin",
    },
    select: {
      cpf: true,
    },
  });

  const adminCpfs = adminCpf.map((admin) => admin.cpf);

  if (ongCnpjs.includes(cnpjOng) || adminCpfs.includes(cnpjOng)) {
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
    return res.status(203).json({error : "cnpj da ong invalido"})
  }

  const nameRifaExisting = await prisma.rifa.findMany({
    where: {
      idOng: cnpj
    },
    select: {
      nome: true
    }
  });
  
  const namesRifas = nameRifaExisting.map((name) => name.nome);
  
  if (namesRifas.includes(nome)) {
    return res.status(201).json({ error: "Esse  rifa já existe." });
  }

  next()
};



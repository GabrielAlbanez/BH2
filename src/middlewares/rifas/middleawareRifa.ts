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


export const validateIdRifa = async(req : Request, res : Response, next : NextFunction)=>{

  const id = req.params.id;

  const idInt = parseInt(id);
  
  console.log(idInt);
  
  if (isNaN(idInt)) {
    return res.status(400).json({ error: "O id deve ser um número válido." });
  }
  
  const idsRifasExisting = await prisma.rifa.findMany({
    where: {
      id: idInt
    },
    select: {
      id: true
    }
  });
  
  const ids = idsRifasExisting.map((rifa) => rifa.id);
  
  if (ids.includes(idInt)) {
    next();
  } else {
    return res.status(200).json({ error: "Esse id de rifa não existe." });
  }

}



import { NextFunction, Request, Response } from "express";
import { cpf as cpfValid } from "cpf-cnpj-validator";
import { db as prisma } from "../../shared/db";

export const validateDataVoluntario = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { cpf, nome, idOng } = req.body;

  const cpfValido = cpfValid.isValid(cpf)

  if(!cpf || !nome || !idOng){
    return res.status(404).json({message : "por favor pre encha todos os campos"})
  }

  if(!cpfValido){
    return res.status(404).json({message : "cpf invalido " })
  }

  const idsOng = await prisma.ong.findMany({
    where : {
      id : idOng
    },
    select : {
      id : true
    }
  })

  const idssOng = idsOng.map((ong)=>ong.id)

  if(idssOng.includes(idOng)){
    next()
  }
  else{
    res.status(404).json('essa ong n existe')
  }



};

export const validateTypeUser= async(
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



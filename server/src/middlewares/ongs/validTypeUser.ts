import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { cnpj as cnpjValid } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";

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
  const { nome, endereco,cnpj,email,senha,telefone,redesSociais } = req.body;

  const cnpjValido = cnpjValid.isValid(cnpj);
  const emailValido = EmailValidator.validate(email);
  const phoneNumberObject = parsePhoneNumberFromString(telefone);

  if (!nome || !endereco || !cnpj || !email || !senha || !telefone || !redesSociais) {
    return res.status(404).json({ message: "pré encha todos os campos" });
  }

  
  if (!emailValido) {
    return res.status(400).json({ error: "Email inválido" });
  }


  const emailExisting = await prisma.ong.findMany({
    where : {
      email : email,
    }
  })

  if(emailExisting.length > 0){
    return res.status(404).json({message : "email ja cadastrado"})
  }







  if (!cnpjValido) {
    return res.status(400).json({ error: "cnpj inválido" });
  }
 
  const cnpjValidoExisting = await prisma.ong.findMany({
    where : {
       cnpj : cnpj,
    }
  })

  if(cnpjValidoExisting.length > 0){
    return res.status(404).json({message : "cnpj ja cadastrado"})
  }






  if (!phoneNumberObject || !phoneNumberObject.isValid()) {
    return res.status(404).json({message : "telefone invalido"})
  } 

  
  const telefoneExisting = await prisma.ong.findMany({
    where : {
       telefone : telefone,
    }
  })


  if(telefoneExisting.length > 0){
    return res.status(404).json({message : "telefone ja cadastrado"})
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

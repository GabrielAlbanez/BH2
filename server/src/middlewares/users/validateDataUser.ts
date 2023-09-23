import { NextFunction, Request, Response } from "express";
import { cpf as cpfValid } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";
import { db as prisma } from "../../shared/db";

export const validateDataUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf, nome, email, senha, sexo, endereco, type } = req.body;
  const cpfValido = cpfValid.isValid(cpf);
  const emailValido = EmailValidator.validate(email);

  if (!nome || !email || !cpf || !senha || !sexo || !endereco || !type) {
    return res.status(404).json({ message: "favor pre-encher todos os dados" });
  }

  if (!emailValido) {
    return res.status(400).json({ error: "Email inválido" });
  }

  const existingEmail = await prisma.usuario.findMany({
    where: {
      email: email,
    },
  });

  if (existingEmail.length > 0) {
    return res.status(400).json({ error: "Email ja cadastrado" });
  }

  if (!cpfValido) {
    return res.status(400).json({ error: "cpf inválido" });
  }

  const cpfExisting = await prisma.usuario.findMany({
    where : {
      cpf : cpf
    }
  })

  if(cpfExisting.length > 0){
    return res.status(200).json({error : "cpf ja cadastrado"})
  }

  if(sexo !== "masculino" && sexo !== "feminino"){
    return res.status(404).json({error : 'sexo nao existente'})
  }

  if(type !== "default" && type !=="admin" ){
    return res.status(404).json({error : 'tipo de usuario inexistente'})
  }

  next();

};

export const validateByRifas = async(req : Request, res : Response, next : NextFunction) => {

  const {cpf, id} = req.body

  const cpfValido = cpfValid.isValid(cpf)

  if(!cpfValido){
    res.status(404).json({err : "cpf invalid"})
  }

  const idssRRifas = await prisma.rifa.findMany({
    where : {
      id : id
    },
    select : {
      id : true
    }
  })

  const TodosIds = idssRRifas.map((rifa)=>rifa.id)

  const cpfsUSers = await prisma.usuario.findMany({
    where  : {
      cpf : cpf
    },
    select : {
      cpf : true
    }
  })

  const pegarCpf = cpfsUSers.map((user)=>user.cpf)

  if(TodosIds.includes(id) && pegarCpf.includes(cpf)){
    next()
  }
  else{
    res.status(404).json('rifa ou cpf inexistente')
  }

  const rifasCompradas = await prisma.usuario.findMany({
    where : {
      cpf : cpf
    },
    select : {
      rifas : true
    }
  })

  const Allrifas = rifasCompradas.map((rifa)=>rifa.rifas)


  if(Allrifas.includes(id)){
    res.status(404).json({rifa : "essa rifa ja foi comprada"})
  }

}

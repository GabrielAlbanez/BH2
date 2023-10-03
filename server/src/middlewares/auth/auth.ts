import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(404)
      .json({ message: "favor pre-encher todos os campos" });
  }

  const emailValid = await prisma.usuario.findMany({
    where: {
      email: email,
    },
  });

  if (emailValid.length == 0) {
    return res.status(404).json({ message: "E-Mail Invalido" });
  }

  const senhaUser = await prisma.usuario.findFirst({
    where: {
      email: email,
    },
    select: {
      senha: true,
    },
  });

  const senhaValida = await bcrypt.compare(senha, senhaUser.senha);

  if (!senhaValida) {
    return res.status(404).json({ message: "senha invalida" });
  }

  const dataUser = await prisma.usuario.findMany({
    where : {
        email : email
    },
    select : {
        cpf : true,
        email : true,
        numerosComprados :true,
        sexo  : true,
        tipo : true
    }
  })

  const generateToken = jwt.sign({dataUser},"8080",{
    expiresIn : 30
  })
   
  if(generateToken){
    req.session['token'] = generateToken
    next()
  }

};
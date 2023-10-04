import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { cnpj as cnpjValid } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";
import nodemailer from "nodemailer";
import fetch from 'node-fetch';

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


export const validateDataOnsForAdmin = async (req: Request,
res: Response,
next: NextFunction
) => {

  const { nome, endereco,cnpj,email,senha,telefone,redesSociais } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Exemplo: "Gmail", "Outlook", ou use as configurações SMTP do seu serviço de email
    auth: {
      user: "gabriel.g.albanez@gmail.com", // Seu endereço de email
      pass: "b f b q q r x n b g a b u u j u", // A senha do seu email
    },
  });

  const cnpjFormatted = cnpj.replace(/[^\d]+/g, ''); 
  const mailOptions = {
    from: "gabriel.g.albanez@gmail.com", // Seu endereço de email
    to: "gabriel.g.albanez@gmail.com", // O endereço de email do destinatário
    subject: "Dados da ongs para serem avaliados",
    text: `
      Nome: ${nome}
      Endereço: ${endereco}
      CNPJ: ${cnpj}
      Email: ${email}
      Senha: ${senha}
      Telefone: ${telefone}
      Redes Sociais: ${redesSociais}
      <a href="http://localhost:8080/BeHuman/avaliar/${cnpjFormatted}">Avaliar</a>
      <a href="http://localhost:8080/BeHuman/naoAvaliar/${cnpjFormatted}">Não Avaliar</a>
    `,
  };
  

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      // Lidar com erros
      console.error("Erro ao enviar o email: ", error);
      return res.status(404).json({ message: `Erro ao enviar o email: ${error.message}` });
    } else {
      // Aguardar a resposta da solicitação HTTP após o envio do email
      try {
        const cnpjFormatted = cnpj.replace(/[^\d]+/g, ''); 
        const avaliarResponse = await fetch(`http://localhost:8080/BeHuman/avaliar/${cnpjFormatted}`);
        const naoAvaliarResponse = await fetch(`http://localhost:8080/BeHuman/naoAvaliar/${cnpjFormatted}`);
  
        const avaliar = await avaliarResponse.text();
        const naoAvaliar = await naoAvaliarResponse.text();
  
        // Tomar medidas com base nas respostas
        if (avaliar === 'true') {
          // ONG avaliada com sucesso
          next()
          return res.status(200).json({message : "ong avaliada com sucesso"})
        } else if (naoAvaliar === 'false') {
          return res.status(400).json({message : "ong não avaliada com sucesso"})
        } else {
          return res.status(400).json({message : "penis"})
        }
      } catch (fetchError) {
        console.error("Erro ao fazer a solicitação HTTP: ", fetchError);
        return res.status(500).json({ message: "Erro ao fazer a solicitação HTTP." });
      }
    }
  });


}

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

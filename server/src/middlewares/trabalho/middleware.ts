import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";

export const validateDataWokr = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, descricao, idOng } = req.body;

  if (!nome || !descricao || !idOng) {
    return res.status(404).json({
      message: "pre encha todos os campos",
    });
  }

  const nameWorks = await prisma.trabalho.findMany({
    where : {
      nome : nome
    },
    select : {
      nome : true
    }
  })

  const names = nameWorks.map((work)=>work.nome)


  const idssOng = await prisma.ong.findMany({
    where: {
      id: idOng,
    },
    select: {
      id: true,
    },
  });

  const pegarTodos = idssOng.map((ong) => ong.id);

  if (pegarTodos.includes(idOng) && !names.includes(nome)) {
    next();
  } else {
    return res.status(404).json({
      message: "essa ong n existe, ou o trabalho ja esta cadastrado",
    });
  }
};

export const validateUserAdmOrOng = async (
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

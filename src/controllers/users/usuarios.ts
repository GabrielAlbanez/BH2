import { db as prisma } from "../../shared/db";
import { Errback, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.usuario.findMany({
      include: {

        numerosComprados: true,
        galeryImagesLogoUser : true

      },
    });
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.log(error);
  }
};

export const getByCpfUser = async (req: Request, res: Response) => {
  try {
    const userCpf = req.params.cpf;
    //http://example.com/users/viria o cpf aq assim que tem que ficar a rota
    const userFltrado = await prisma.usuario.findMany({
      where: {
        cpf: userCpf,
      },
      include: {
        numerosComprados: true,

      },
    });
    res.status(200).json({ user: userFltrado });
  } catch (error) {
    res.status(404).json({ err: `error ao buscar usuario ${error}` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { cpf, nome, email, senha, sexo, endereco, type, telefone } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 5)

    const userCreate = await prisma.usuario.create({
      data: {
        cpf: cpf,
        email: email,
        endereco: endereco,
        nome: nome,
        senha: hashedPassword,
        sexo: sexo,
        tipo: type,
        telefone: telefone

      },
    });

    console.log(userCreate)
    res.status(201).json({ user: `usuario criado` });
  } catch (error) {
    res.status(403).json({ err: `erro ao criar usuario${error}` });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const cpf = req.body.cpf

    const userDeletado = await prisma.usuario.delete({
      where: {
        cpf: cpf
      }
    })
    res.status(200).json({ userDeleted: userDeletado })
  }
  catch (error) {
    res.status(403).json({ err: `erro ao deletar usuario${error}` });
  }
}

export const byRifas = async (req: Request, res: Response) => {






  try {

    const { cpf, id, numero } = req.body





    const byNumber = await prisma.numeroComprado.create({
      data: {
        numero: numero,
        rifaId: id,
        usuarioCpf: cpf
      }
    })



    res.status(200).json({ sucessful: byNumber, message: 'rifa comprada com sucesso' })


  }
  catch (error) {
    res.status(201).json({ message: `erro ao compra rifa ${error}` })
  }


}


export const Login = (req: Request, res: Response) => {

  const token = req.session['token']



  res.status(200).json({ message: "Usuario Logado", token: token })

}


export const byLogoDoacao = async (req: Request, res: Response) => {

  const { idLogo, emailUser } = req.body

  try {

    const byLogo = await prisma.galeryImagesLogoUser.create({
      data: {
        LogoDoacaoId: idLogo,
         emaillUser : emailUser
      }
    })

    res.status(201).json({message : 'logo comprada com sucesso'})

  } catch (errorr) {
    res.status(201).json({ error: `erro ao comprar logo ${errorr.message}` })
  }

}

export const getAllLogosByUser = async(req : Request, res : Response)=>{

  const {email} = req.body

  try {


    const allLogosBy = await prisma.galeryImagesLogoUser.findMany({
      where : {
        emaillUser : email
      },
      select : {
        LogoDoacao : true
      }
    })

    res.status(201).json({message : allLogosBy})
  
    
  } catch (error) {
     res.status(201).json({err : "erro ao pegar logos compradas",error})
  }



}

export const updateImgUser = async(req : Request, res : Response)=>{
  const {img,cpf} = req.body

  try {

    const updateImg  = await prisma.usuario.update({
        where : {
          cpf : cpf
        },
        data : {
          imgPerfilAbsolute : img
        }
    })
    
  } catch (error) {
    res.status(201).json({err : `erro ao fazer update da img de perfil usuario`,error})
  }

}
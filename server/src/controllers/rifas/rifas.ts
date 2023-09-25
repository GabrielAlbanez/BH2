import { db as prisma } from "../../shared/db";
import { Request, Response } from "express";

export const getAllRifas = async(req: Request, res: Response)=>{

  try{

    const allrifas  = await prisma.rifa.findMany({
      include : {
        ong : true,
        NumeroComprado : true,
      }
    })
    res.status(200).json({rifas : allrifas})

  }
  catch(error){
    res.status(404).json({message : `error ao buscar rifas ${error}`})
  }

}

export const getByRifasOng  = async(req : Request, res : Response)=>{
  try{

    const idOng = req.body.idOng

    const AllRifasOng = await prisma.rifa.findMany({
      where : {
        idOng : idOng
      },
      include : {
        NumeroComprado : true,
        ong :  true
      }
    })

    res.status(200).json({rifas : AllRifasOng})

  }
  catch(error){
    res.status(404).json({message : `erro ao busca rifa de um certa ong${error}`})
  }
}

export const createRifas = async(req : Request, res : Response)=>{

  try{

    const {nome,preco,descricaon,idOng} = req.body

    const createRifa = await prisma.rifa.create({
      data : {
        nome : nome,
        preco : preco,
        descricao : descricaon,
        idOng : idOng
      }
    })

    res.status(201).json({rifaCriada : createRifa})

  }
  catch(error){
    res.status(404).json({err : error})
  }
}

export const deleteRifa = async(req : Request, res : Response) => {

  try{

     const idRifa = req.body.idRifa

     const deleteRifa = await prisma.rifa.delete({
      where : {
        id : idRifa
      }
     })

     res.status(203).json({sucess : deleteRifa})


  }
  catch(error){
    res.status(404).json({err : `erro ao deletar rifa ${error}`})
  }

}
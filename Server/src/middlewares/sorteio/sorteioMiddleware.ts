import { NextFunction, Request, Response } from "express";
import { db as prisma } from "../../shared/db";


export const validateIdRifa = async(req : Request, res : Response, next : NextFunction) => {

    const idRifa = req.params


    const idRifaExisting =  await prisma.rifa.findMany({
        where : {
            id : idRifa
        }
    })

    if(idRifaExisting.length <= 0){
        return res.status(203).json({
          message : "essa rifa não existe para fazer sorteio"
        })
    }
    else { 
        next()
    }

}

export const validateNumbersforDraw = async (req: Request, res: Response, next: NextFunction) => {
    const idRifa = req.body.idRifa;
  
    console.log('id rifa',idRifa);
  
    const numbersCompradosRifas = await prisma.numeroComprado.findMany({
      where: {
        rifaId: idRifa,
      },
      select: {
        numero: true,
      },
    });
  
    console.log('numeros comprados', numbersCompradosRifas);
  
    if (numbersCompradosRifas != null && numbersCompradosRifas.length > 0) {
      next();
    } else {
      res.status(201).json({ error: 'Não há números a serem sorteados' });
    }
  };
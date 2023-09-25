import { db as prisma } from "../../shared/db";
import { Request, Response } from "express";

export const sorteioUsers = async (req: Request, res: Response) => {
  try {
    const idRifa = req.body.idRifa;

    const numberRifas = await prisma.rifa.findMany({
      where: {
        id: idRifa,
      },
      select: {
        NumeroComprado: {
          select: {
            numero: true,
          },
        },
      },
    });


    const arrayFora = numberRifas[0];

    const numerosComprados = arrayFora.NumeroComprado;

    const valores = numerosComprados.map((objeto) => objeto.numero);



    const numeroSorteado = valores[Math.floor(Math.random() * valores.length)];

    console.log(numeroSorteado)

    const nameRifas = await prisma.rifa.findMany({
        where : {
         id  : idRifa   
        },
        select : {
            NumeroComprado : true
        }
    })

 

    // const infAll = nameRifas.map((valor)=>valor.NumeroComprado)

    // console.log(infAll)

    const objetoSorteado = nameRifas[0].NumeroComprado.find((numeroComprado) => numeroComprado.numero === numeroSorteado);
 
    console.log(objetoSorteado)

    const ganhador = await prisma.usuario.findMany({
        where : {
            cpf : objetoSorteado.usuarioCpf
        },
    
        select : {
            nome  : true,
            rifas : {
               where : {
                id : idRifa
               },
               include : {
                NumeroComprado : {
                    where : {
                        numero : numeroSorteado
                    }
                }
               }
            }
         
        }
    })
    
    res.status(200).json({ganhador : ganhador})
    


  } catch (error) {
    res.status(404).json({ message: `erro ao fazer sorteio ${error}` });
  }
};

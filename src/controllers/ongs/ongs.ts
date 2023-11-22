import { db as prisma } from "../../shared/db";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

export const getAllOngs = async (req: Request, res: Response) => {
  try {
    const allOngs = await prisma.ong.findMany({
      include: {
        rifas: true,
        trabalhos: true,
        Voluntarios: true,
      },
    });
    res.status(200).json({ ongs: allOngs });
  } catch (error) {
    res.status(404).json({ message: `error ao buscar ongs${error}` });
  }
};

export const getByNameOng = async (req: Request, res: Response) => {
  try {
    const nome = req.body.nome;
    const getOngByName = await prisma.ong.findMany({
      where: {
        nome: nome,
      },
      include: {
        rifas: true,
        trabalhos: true,
        Voluntarios: true,
      },
    });
    res.status(200).json({ ong: getOngByName });
  } catch (error) {
    res.status(404).json({ message: `erro ao achar essa ong ${error}` });
  }
};





export const createOng = async (req: Request, res: Response) => {
  try {
    const { nome, endereco,cnpj,email,senha,telefone,redesSociais } = req.body;

    
    const hashedPassword = await bcrypt.hash(senha,5)


    const file = req.file
    

    const createOng = await prisma.ong.create({
      data: {
        cnpj,
        email,
        nome,
        senha : hashedPassword,
        endereco,
        telefone,
        redesSociais,
        Logo : file.path
      },
    });
    res.status(200).json({ ong: createOng });
  } catch (error) {
    res.status(404).json({ fail: error });
  }
};




export const AvaliarOng = async(req : Request,res : Response)=>{
  
  const cnpj = req.params.cnpj

  try{

    const ongPega = await prisma.ong.update({
      where  :{
        cnpj : cnpj
      },
      data : {
        aprovado : true
      },
      select : {
        cnpj : true
      }
    })
    
    res.status(200).json({message : `ong autorizada ${ongPega}`})
  }
  catch(error){
    res.status(404).json({message : `cnpj não pego ou invalido ${cnpj}`})
  }

  



}



export const DesaAvaliarOng = async(req : Request,res : Response)=>{

  const cnpj = req.params.cnpj

  try{

    const ongPega = await prisma.ong.delete({
      where  :{
        cnpj : cnpj
      },

    })
    
    res.status(200).json({message : `ong não autorizada deletada com sucesso ${ongPega}`})
  }
  catch(error){
    res.status(404).json({message : "error ao autoriazar a ong"})
  }

  
}

export const deleteOng = async (req: Request, res: Response) => {
  try {
    const cnpj = req.body.cnpj

    const deleteOng = await prisma.ong.delete({
      where: {
        cnpj: cnpj,
      },
    });

    res.status(200).json({ success: deleteOng})
  } catch (error) {
    res.status(404).json({ fail: error });
  }
};


export const LoginOng = (req : Request, res : Response) =>{
  
  const token = req.session['tokenOng']



  res.status(200).json({message : "Ong Logada", token : token})

} 



export const getBySaldoForCnpjOng = async (req: Request, res: Response) => {
  const cnpj = req.body.cnpj;

  console.log(cnpj);

  try {
    const NumerosCompradosForong = await prisma.ong.findMany({
      where: {
        cnpj: cnpj,
      },
      select: {
        rifas: {
          where: {
            idOng: cnpj,
          },
          select: {
            NumeroComprado: {
              select: {
                rifa: {
                  select: {
                    nome: true,
                    preco: true,
                  },
                },
                numero: true,
              },
            },
          },
        },
      },
    });

    if (!NumerosCompradosForong || NumerosCompradosForong.length === 0 || !NumerosCompradosForong[0]?.rifas) {
      return res.status(404).json({ error: "Nenhuma correspondência encontrada para o CNPJ fornecido." });
    }

    const Rifas = NumerosCompradosForong[0].rifas;

    if (!Rifas || Rifas.length === 0) {
      return res.status(404).json({ error: "Nenhuma rifa encontrada para o CNPJ fornecido." });
    }

    let total = 0;

    Rifas.forEach((numeroComprado: any) => {
      const quantidade = numeroComprado.NumeroComprado.length;
      const precoRifa = parseFloat(numeroComprado.NumeroComprado[0]?.rifa.preco);

      if (!isNaN(precoRifa)) {
        total += quantidade * precoRifa;
        console.log('total', total);
      } else {
        console.log('precoRifa não é um número válido:', numeroComprado.NumeroComprado[0]?.rifa.preco);
      }
    });

    res.status(201).json({ total: total });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Erro ao calcular o total." });
  }
};

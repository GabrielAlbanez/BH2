import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useAppSelector } from "../../store/intex";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";

export default function Rifas() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  type dataNuemerosComprados = {
    numerosComprados: [
      {
        numero: number;
        rifa: 
        {
          id: number;
          imgRifa: string;
          nome: string;
          preco: number;
          descricao: string;
        }
        
      }
    ];
  };

  const [dataNumerosComprados, setDataNumerosComprados] = useState<dataNuemerosComprados[]>([]);

  const getNumerosComprados = async () => {
    const req = await axios.post("http://localhost:8080/getAllRifasByCpfUser", {
      cpf: User[0]?.cpf,
    });
    setDataNumerosComprados(req.data.message);
  };

  useEffect(() => {
    getNumerosComprados();

  }, [User[0]?.cpf]);
  

  console.log(dataNumerosComprados)


    const url = dataNumerosComprados.map((valor)=>valor.numerosComprados.map((valor)=>valor.rifa.imgRifa.slice(24)))
    console.log(url)

   



  return (
    <>
      {dataNumerosComprados.length > 0 ? (
        <div className="h-[91vh w-full]">
          {dataNumerosComprados.map((numero) => (
            <div>
              {numero.numerosComprados.map((valor, index) => (
                <div key={index}>
                  <h1>{valor.numero}</h1>
                  <img src={require(`../../uploadsImgRifas/${url[0][index]}`)} alt="" />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[91vh] w-full text-3xl">
          <h1>vc ainda não comprou nehuma rifa</h1>
        </div>
      )}


      <h1>RIfa</h1>
    </>
  );
}

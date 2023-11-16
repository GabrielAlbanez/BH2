import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

import axios from "axios";
import { useAppSelector } from "../../store/intex";
import toast from "react-hot-toast";
import { useTema } from "../../common/context/Tema";

export default function Rifas() {
  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  type DataNumerosComprados = {
    numerosComprados: [
      {
        numero: number;
        rifa: {
          id: number;
          imgRifa: string;
          nome: string;
          preco: number;
          descricao: string;
          ganhador : string
          sorteado : true;
          ong: {
            nome: string
          }
        };

   
      }
    ];
  };

  const [dataNumerosComprados, setDataNumerosComprados] = useState<DataNumerosComprados[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await axios.post("http://localhost:8080/getAllRifasByCpfUser", {
          cpf: User[0]?.cpf,
        });
        setDataNumerosComprados(req.data.message);
      } catch (error) {
        console.error("Erro ao obter números comprados:", error);
      }
    };

    fetchData();
  }, [User[0]?.cpf,dataNumerosComprados]);

  console.log(dataNumerosComprados)


  const { pegarTema } = useTema() as {
    pegarTema: string;
  };


  const notify = (message: string) => {
    toast(`${message}`, {
      icon: `${pegarTema === "dark" ? "✔" : " ✔"}`,
      style: {
        borderRadius: "10px",
        background: `${pegarTema === "dark" ? "#333" : "white"}`,
        color: `${pegarTema === "dark" ? "white" : "black"}`,
      },
    });
  };

  const verySortRifa = (sorteado : boolean)=>{
    if(sorteado === true){
      notify('essa rifa ja foi sorteada')
    } else {
      notify('essa rifa ainda n foi sorteada')
    }
}


  return (
    <>
      <h1 className="text-3xl text-center">Minhas rifas</h1>

      {dataNumerosComprados && dataNumerosComprados[0]?.numerosComprados.length > 0 ? (
        <div className="h-[91vh] w-full flex gap-5 flex-wrap items-center justify-center">
          {dataNumerosComprados.map((numero, outerIndex) => (
            <React.Fragment key={outerIndex}>
              {numero.numerosComprados.map((valor, innerIndex) => (
                
                <div key={innerIndex} onMouseEnter={()=>{verySortRifa(valor.rifa.sorteado)}} className={`m-4 w-[300px] cursor-pointer  ${valor.rifa.sorteado === true ? 'opacity-50 hover:opacity-100' : 'opacity-100'}`}>
                  {valor.rifa.ganhador === User[0]?.cpf ? (<>
                    
                    <div className="max-w-sm rounded overflow-hidden shadow-xl mx-auto shadow-yellow-400 hover:shadow-2xl hover:scale-110 transition-all hover:shadow-yellow-600">
                    <h1 className="text-2xl text-center">vc ganhou essa rifa</h1>
                    <img
                      src={require(`../../uploadsImgRifas/${valor.rifa.imgRifa.slice(24)}`)}
                      alt=""
                      className="w-full h-48 object-cover"
                    />
                      
                    <div className="px-6 py-4">
                      {/* <h1 className="font-bold text-xl mb-2">Número: {valor.numero}</h1> */}
                      <QRCode  value={JSON.stringify({
                        "nome " : valor.rifa.nome,
                        "numero" : valor.numero,
                        "preço" : valor.rifa.preco,
                        "ong" : valor.rifa.ong.nome
                        
                      })} />
                    </div>
                  </div>

                  </>) : (<>
                    <div className="max-w-sm rounded overflow-hidden shadow-xl mx-auto shadow-fuchsia-500 hover:shadow-2xl hover:scale-110 transition-all hover:shadow-fuchsia-500">
                      {valor.rifa.sorteado === true && valor.rifa.ganhador !== User[0]?.cpf ? (<h1>vc perdeu</h1>) : (<></>)}
                    <img
                      src={require(`../../uploadsImgRifas/${valor.rifa.imgRifa.slice(24)}`)}
                      alt=""
                      className="w-full h-48 object-cover"
                    />
                    <div className="px-6 py-4">
                      {/* <h1 className="font-bold text-xl mb-2">Número: {valor.numero}</h1> */}
                      <QRCode  value={JSON.stringify({
                        "nome " : valor.rifa.nome,
                        "numero" : valor.numero,
                        "preço" : valor.rifa.preco,
                        "ong" : valor.rifa.ong.nome
                        
                      })} />
                    </div>
                  </div></>)}
           
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[91vh] w-full text-3xl">
          <h1>Você ainda não comprou nenhuma rifa</h1>
        </div>
      )}
    </>
  );
}

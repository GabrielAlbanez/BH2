import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

import axios from "axios";
import { useAppSelector } from "../../store/intex";
import toast from "react-hot-toast";
import { useTema } from "../../common/context/Tema";
import { ImSpinner2 } from "react-icons/im";

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
          ganhador: string
          sorteado: true;
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
        const req = await axios.post("https://bh2-upl7.onrender.com/getAllRifasByCpfUser", {
          cpf: User[0]?.cpf,
        });
        setDataNumerosComprados(req.data.message);
      } catch (error) {
        console.error("Erro ao obter números comprados:", error);
      }
    };

    fetchData();
  }, [User[0]?.cpf, dataNumerosComprados]);



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

  const verySortRifa = (sorteado: boolean) => {
    if (sorteado === true) {
      notify('essa rifa ja foi sorteada')
    } else {
      notify('essa rifa ainda n foi sorteada')
    }
  }


  return (
    <div className={`transition-all py-10 duration-1000 w-full min-h-[100vh] sm:min-h-[91vh]  ${pegarTema === "dark" ? "bg-black text-white" : "bg-[#CEF3FF]"
      }`}>
      <h1 className="text-3xl text-center " >Minhas rifas</h1>

      {dataNumerosComprados && dataNumerosComprados[0]?.numerosComprados.length > 0 ? (<>
        {dataNumerosComprados && dataNumerosComprados[0]?.numerosComprados.length > 0 ? (
          <div className=" pt-10 h-full  w-full flex gap-5 flex-wrap items-center justify-center">
            {dataNumerosComprados.map((numero, outerIndex) => (
              <React.Fragment key={outerIndex}>
                {numero.numerosComprados.map((valor, innerIndex) => (

                  <div key={innerIndex} onClick={() => { verySortRifa(valor.rifa.sorteado) }} className={`m-4 w-[300px] cursor-pointer  `}>
                    {valor.rifa.ganhador === User[0]?.cpf ? (<>

                      <div className={`max-w-sm rounded-2xl overflow-hidden shadow-xl mx-auto bg-white text-black  hover:scale-110 opacity-60 transition-all hover:opacity-100`}>
                        <img
                          src={`https://bh2-upl7.onrender.com/uploadsImgRifas/${valor.rifa.imgRifa.slice(16)}`}
                          alt=""
                          className="w-full h-48 object-cover transform transition-transform duration-[1500ms] hover:scale-110"
                        />

                        <div className="px-6 py-4 w-full flex justify-center items-center">
                          {/* <h1 className="font-bold text-xl mb-2">Número: {valor.numero}</h1> */}
                          <QRCode value={JSON.stringify({
                            "nome ": valor.rifa.nome,
                            "numero": valor.numero,
                            "preço": valor.rifa.preco,
                            "ong": valor.rifa.ong.nome

                          })} />
                        </div>
                        <h1 className="text-md text-center">Essa Rifa ja foi Sorteada</h1>

                      </div>

                    </>) : (<>
                      <div className={`max-w-sm rounded-2xl overflow-hidden shadow-xl mx-auto  hover:scale-110 transition-all bg-white text-black ${valor.rifa.sorteado === true && valor.rifa.ganhador !== User[0]?.cpf ? 'opacity-60' : 'opacity-100'} `}>
                        <img
                          src={`https://bh2-upl7.onrender.com/uploadsImgRifas/${valor.rifa.imgRifa.slice(16)}`}
                          alt=""
                          className="w-full h-48 object-cover transform transition-transform duration-[1500ms] hover:scale-110"
                        />
                        <div className="px-6 py-4 flex items-center justify-center">
                          {/* <h1 className="font-bold text-xl mb-2">Número: {valor.numero}</h1> */}
                          <QRCode value={JSON.stringify({
                            "nome ": valor.rifa.nome,
                            "numero": valor.numero,
                            "preço": valor.rifa.preco,
                            "ong": valor.rifa.ong.nome

                          })} />

                        </div>
                        {valor.rifa.sorteado === true && valor.rifa.ganhador !== User[0]?.cpf ? (<h1 className="text-center">Essa Rifa ja foi Sorteada</h1>) : (<></>)}

                      </div></>)}

                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[91vh] w-full text-center text-md sm:text-lg md:text-2xl 2x:text-3xl">
            <h1>Você ainda não comprou nenhuma rifa</h1>
          </div>
        )}
      </>) : (<div className="w-full h-[91vh] flex flex-col items-center justify-center text-center text-md sm:text-lg md:text-2xl 2x:text-3xl">
      <h1>Você ainda não comprou nenhuma rifa</h1>
      </div>)}


    </div>
  );
}

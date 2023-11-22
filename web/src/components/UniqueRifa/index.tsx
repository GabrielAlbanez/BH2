import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { useTema } from "../../common/context/Tema";

export default function UniqueRifa() {
  const { id } = useParams();

  type dataRifa = {
    imgRifa: string;
    nome: string;
    preco: number;
    descricao: string;
    NumeroComprado: [{ numero: string }];
    sorteado: boolean;
    ganhador: string;
    numeroSorteado: string;
  };

  const [dataRifa, setDataRifa] = useState<dataRifa[]>([]);

  const getaDataRifaById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getByidRifa/${id}`
      );
      setDataRifa(response.data.rifa);
    } catch (error) {
      console.error("Erro ao obter rifa por ID:", error);
    }
  };

  useEffect(() => {
    getaDataRifaById();
  }, [id, dataRifa]);

  const url = dataRifa.map((valor) => valor.imgRifa.slice(24));

  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  const numerosComprados = dataRifa[0]?.NumeroComprado;

  return (
    <div
      className={`transition-all duration-1000 ${
        pegarTema === "dark" ? "bg-zinc-950 text-white" : "bg-[#CEF3FF]"
      } min-h-screen flex items-center justify-center`}
    >
      {dataRifa.length > 0 ? (
        dataRifa.map((valor, index) => (
          <div key={index} className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-28">
              <section className="flex flex-col items-center justify-center gap-6">
                <div className="text-center">
                  <h1 className="text-4xl font-semibold">{valor.nome}</h1>
                  <p className="text-xl mt-4">{valor.descricao}</p>
                </div>
                <div className="w-full h-[30rem] md:mt-6 lg:mt-0">
                  <img
                    src={require(`../../uploadsImgRifas/${url}`)}
                    alt=""
                    className="w-full h-full object-cover shadow-2xl rounded-lg"
                  />
                </div>
              </section>
              <section className="flex flex-col items-center justify-center mt-6 md:gap-10 lg:mt-0 ">
                <div className="text-center ">
                  {valor.sorteado === true ? (
                    <h1 className="text-4xl font-semibold underline mb-4">
                      Números Sorteado
                    </h1>
                  ) : (
                    <h1 className="text-4xl font-semibold underline mb-4">
                      Números Comprados
                    </h1>
                  )}
                  <div className={`grid grid-cols-1 md:grid-cols-${numerosComprados.length > 0 ? '2' : '1'} gap-4`}>
                    {numerosComprados.length > 0 ? (
                      <>
                        {numerosComprados.map((numero, index) => (
                          <div
                            key={index}
                            className={`${
                              numero.numero ==
                              valor.numeroSorteado.replace(/\./g, "")
                                ? "bg-green-500"
                                : "bg-gray-400"
                            } p-4 rounded-md text-center mb-4 md:mb-0 px-2`}
                          >
                            <p className={`text-2xl  `}>{numero.numero}</p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="p-4 rounded-md text-center mb-4 md:mb-0 px-2"><h1 className="text-center w-full">ainda não tem numeros comprados dessa rifa</h1></div>
                    )}
                  </div>
                </div>
                {valor.sorteado == true && (
                  <>
                    <h1 className="text-2xl">
                      cpf do ganhador: {valor.ganhador}
                    </h1>
                  </>
                )}
              </section>
            </div>
          </div>
        ))
      ) : (
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl">Carregando Dados</h1>
          <div className="animate-spin h-5 mt-4">
            <ImSpinner2 />
          </div>
        </div>
      )}
    </div>
  );
}

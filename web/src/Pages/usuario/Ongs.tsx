import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useParams } from "react-router-dom";

export default function Ongs() {
  const { cnpj } = useParams();

  const cnpjFormatado =
    cnpj?.slice(0, 2) +
    "." +
    cnpj?.slice(2, 5) +
    "." +
    cnpj?.slice(5, 8) +
    "/" +
    cnpj?.slice(8, 12) +
    "-" +
    cnpj?.slice(12);

  type dataOng = {
    nome: string;
    Logo: string;
    trabalhos: [];
    Voluntarios: [];
    rifas: [
      {
        descricao: string;
        idOng: number;
        imgRifa: string;
        nome: string;
        preco: string;
      }
    ];
    endereco: string;
    redesSociais: string;
    telefone: string;
  };
  const [dataReq, setDataReq] = useState({
    cnpjOng: cnpjFormatado,
  });
  const [dataOng, setDataOng] = useState<dataOng[]>([]);

  const getByDataOngsForCnpj = async () => {
    const request = await axios.post(
      "http://localhost:8080/getByRifaForCnpjOng",
      dataReq
    );
    // console.log('dados da req',request.data)
    setDataOng(request.data.dataOng);
  };

  useEffect(() => {
    getByDataOngsForCnpj();
  }, [cnpj]);

  const url = dataOng[0]?.Logo.slice(16);

  console.log(url);

  console.log("rifas", dataOng[0]?.rifas);

  const urlsImgRifas = dataOng[0]?.rifas.map((data) => data.imgRifa.slice(24));

  console.log(urlsImgRifas);

  return (
    <div className="w-full h-[91vh] bg">
      {dataOng.length > 0 ? (
        <div className="h-full w-full">
          <section className="w-full  h-[20%] flex  gap-2 items-center justify-center pt-7">
            <img
              src={require(`../../uploads/${url}`)}
              alt=""
              className="w-20 h-20 rounded-full mr-4"
            />
            <p className="text-2xl ">{dataOng[0].nome}</p>
          </section>
          <section className="w-full flex justify-between pt-16 h-[70%] ">
            <div className="w-[50%] h-full flex  justify-center border-r-[1px] border-black">
              <h2 className="text-2xl">Informaçoes Ong</h2>
            </div>
            <div className="w-[50%] h-full flex  justify-center gap-10 flex-wrap items-center">
              {dataOng[0]?.rifas.map((data, index) => (
                <div className="max-w-sm rounded-xl overflow-hidden shadow-lg w-[60%] h-[50%] p-4   gap-20">
                  <img
                    src={require(`../../uploadsImgRifas/${urlsImgRifas[index]}`)}
                    alt=""
                    className="w-[30%] h-[40%]   "
                  />{" "}
                  <div className="px-6 py-10">
                    <div className="font-bold text-xl mb-2">
                      {data.nome}
                    </div>
                    <p className="text-gray-700 text-base">
                      {data.descricao}
                    </p>

                    <div>
                      <p>
                        valor da Rifa:  {data.preco}
                      </p>
                    </div>
                  </div>
          
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="xl:h-[91vh] w-full flex flex-col items-center justify-center gap-6">
          <h1 className="text-3xl">Carregando Dados</h1>

          <div className="animate-spin h-5   flex flex-col justify-center items-center  ">
            <ImSpinner2 />
          </div>
        </div>
      )}
    </div>
  );
}

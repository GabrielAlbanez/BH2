import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CardAllOngs() {
  type dataOng = {
    Logo: string;
    nome: string;
    telefone: string;
    cnpj: string;
  };

  const [dataOng, setDataOng] = useState<dataOng[]>([]);

  useEffect(() => {
    const url = "http://localhost:8080/allOngs";
    axios.get(url).then((response) => {
      const data = response.data;
      setDataOng(data.ongs);
    });
  }, []);

  const url = dataOng.map((valor) => valor.Logo.slice(16));
  const cnpjLimpo = dataOng.map((valor) => valor.cnpj.replace(/[^\d]/g, ''));

  return (
    <div className="flex flex-wrap justify-center items-center h-full">
      {dataOng.length > 0 ? (
        dataOng.map((ong, index) => (
          <Link to={`/Ong/${cnpjLimpo[index]}`} key={index}>
            <div className="max-w-md mx-4 my-8 bg-white rounded-2xl overflow-hidden shadow-lg transition duration-500 transform hover:scale-105">
              <img
                className="w-full h-52 object-cover transform transition-transform duration-1000 hover:scale-110"
                src={require(`../../uploads/${url[index]}`)}
                alt="ong-logo"
              />
              <div className="px-6 py-4 flex flex-col gap-2">
                <div className=" text-2xl mb-2 text-gray-700">{ong.nome}</div>
                <p className="text-gray-700 text-base">{ong.telefone}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex w-full h-full items-center justify-center">
          <h1 className="text-3xl text-center">
            Ainda não há nenhuma ONG logada no sistema...
          </h1>
        </div>
      )}
    </div>
  );
}

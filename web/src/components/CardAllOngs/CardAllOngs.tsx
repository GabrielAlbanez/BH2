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
    const url = "https://bh2-upl7.onrender.com/allOngs";
    axios.get(url).then((response) => {
      const data = response.data;
      setDataOng(data.ongs);
    });
  }, []);

  const url = dataOng.map((valor) => valor.Logo.slice(8));
  const cnpjLimpo = dataOng.map((valor) => valor.cnpj.replace(/[^\d]/g, ''));

  console.log(url)

  return (
    <div className="flex flex-wrap justify-center items-center h-full">
      {dataOng.length > 0 ? (
        dataOng.map((ong, index) => (
          <Link to={`/Ong/${cnpjLimpo[index]}`} key={index}>
            <div className="max-w-xl mx-4 my-8 bg-white rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-[1500ms] hover:scale-110">
              <img
                className="w-full h-52 object-cover transform transition-transform duration-[1500ms] hover:scale-110"
                src={`https://bh2-upl7.onrender.com/uploadImgOng/${url[index]}`}
                alt="ong-logo"
              />
              <div className="px-12 py-5 flex flex-col gap-2">
                <div className=" text-2xl mb-2 text-gray-700 text-center">{ong.nome}</div>
                <p className="text-gray-700 text-base text-center">{ong.telefone}</p>
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

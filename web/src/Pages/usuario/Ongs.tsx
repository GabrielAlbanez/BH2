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
    rifas: [];
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

  return (
    <div>
      {dataOng.length > 0 ? (
        <>
          <img src={require(`../../uploads/${url}`)} alt="" />

          <h1>name ong : {dataOng[0]?.nome}</h1>
        </>
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

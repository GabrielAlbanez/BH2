import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/intex";
import { useNavigate } from "react-router-dom";
import { useTema } from "../../common/context/Tema";

export default function AllRifas() {
  type dataRifa = {
    id: number;
    imgRifa: string;
    nome: string;
    preco: string;
    descricao: string;
    CpfUsuario: string;
    idOng: string;
    sorteado : boolean;
    ganhador : string;
    ong: {
      cnpj: string;
      nome: string;
      email: string;
      senha: string;
      telefone: string;
      endereco: string;
      redesSociais: string;
      aprovado: boolean;
      Logo: string;
    };
    NumeroComprado: [
      {
        id: number;
        numero: number;
        rifaId: number;
        usuarioCpf: string;
      }
    ];
  };

  const [dataRifa, setDataRifa] = useState<dataRifa[]>([]);
  const [buscarData, setBuscarData] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuscarData(event.target.value);
  };

  const filteredRifas = dataRifa.filter((rifa) =>
    rifa.nome.toLowerCase().includes(buscarData.toLowerCase())
  );

  useEffect(() => {
    const url = "http://localhost:8080/getAllRifas";
    axios.get(url).then((response) => {
      const data = response.data;
      setDataRifa(data.rifas);
    });
  }, []);

  console.log(dataRifa);

  const User = useAppSelector((state) => state.AuthToken.dataUser) as Array<{
    cpf: string;
    email: string;
    numerosComprados: [];
    sexo: string;
    tipo: string;
  }>;

  const typeUser = User[0]?.tipo;

  const navigation = useNavigate();

  useEffect(() => {
    if (typeUser !== "admin") {
      navigation("/");
    }
  }, [typeUser]);



  const { pegarTema } = useTema() as {
    pegarTema: string;
  };

  return (
    <div className={`pt-8 p-4 h-screen w-full sm:h-[100vh] rounded-lg transition-all duration-1000  ${
      pegarTema === "dark" ? "bg-black text-white" : "bg-blue-200"
    }`}>
      <h2 className="text-3xl font-bold mb-4">Rifas List</h2>
      <div className="mb-4 flex items-center">
        <label htmlFor="search" className="mr-2">
          Busca:
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            onChange={handleSearch}
            value={buscarData}
            className={`p-2 rounded ${pegarTema === 'dark' ? 'text-black' : 'text-black'} bg-gray-100`}
            placeholder="Buscar Rifas"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-5-5m-1.485-8A9.503 9.503 0 0112 2a9.5 9.5 0 010 19 9.5 9.5 0 010-19 9.5 9.5 0 019.5 9.5c0 2.215-.76 4.26-2.022 5.862"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <table className={`min-w-full border-gray-300 transition-all duration-1000 rounded-lg ${pegarTema === "dark" ? "bg-gray-800 text-white" : "bg-blue-100"}`}>
        <thead className={` transition-all duration-1000  ${
        pegarTema === "dark" ? "bg-[#202020] text-white" : "bg-[#CEF3FF]"
      }`}>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Preço</th>
            <th className="py-2 px-4 border-b">Descrição</th>
            <th className="py-2 px-4 border-b">ID da Ong</th>
            <th className="py-2 px-4 border-b">Numeros Comprados</th>
            <th className="py-2 px-4 border-b">Cpf User</th>
            <th className="py-2 px-4 border-b">Sorteado</th>
            <th className="py-2 px-4 border-b">cpf do ganhador</th>
          </tr>
        </thead>
        <tbody>
          {filteredRifas.map((rifa) => (
            <tr key={rifa.id} className="border-b text-center">
              <td className="py-2 px-4">{rifa.id}</td>
              <td className="py-2 px-4">{rifa.nome}</td>
              <td className="py-2 px-4">{rifa.preco}</td>
              <td className="py-2 px-4">{rifa.descricao}</td>
              <td className="py-2 px-4">{rifa.idOng}</td>
              <td className="py-2 px-4 ">
                {dataRifa.length > 0 ? (
                  <>
                    {dataRifa.map((valor) =>
                      valor.NumeroComprado.map((numero) => (
                        <div key={numero.id} className="">
                          <p>{numero.numero}</p>
                        </div>
                      ))
                    )}
                  </>
                ) : (
                  <></>
                )}
              </td>
              <td className="py-2 px-4 ">
                {dataRifa.length > 0 ? (
                  <>
                    {dataRifa.map((valor) =>
                      valor.NumeroComprado.map((numero) => (
                        <div key={numero.id} className="">
                          <p>{numero.usuarioCpf}</p>
                        </div>
                      ))
                    )}
                  </>
                ) : (
                  <></>
                )}
              </td>
              <td>{rifa.sorteado.toString()}</td>
              <td>{rifa.ganhador}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
